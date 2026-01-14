/**
 * Accordion Block
 * Creates accessible accordion from block content
 */

function generateId(prefix = 'accordion') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function decorate(block) {
  // Check if multiple items can be open simultaneously
  const allowMultiple = block.classList.contains('multiple');

  // Get all rows - each row becomes an accordion item
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cells = [...row.children];
    // First cell is the header/question, second is the content/answer
    const headerContent = cells[0]?.innerHTML || `Item ${index + 1}`;
    const panelContent = cells[1] || cells[0];

    // Generate unique IDs
    const triggerId = generateId('trigger');
    const panelId = generateId('panel');

    // Create accordion item container
    const item = document.createElement('div');
    item.className = 'accordion-item';

    // Create trigger button
    const trigger = document.createElement('button');
    trigger.className = 'accordion-trigger';
    trigger.setAttribute('id', triggerId);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', panelId);

    // Create trigger content wrapper
    const triggerContent = document.createElement('span');
    triggerContent.className = 'accordion-trigger-content';
    triggerContent.innerHTML = headerContent;

    // Create expand/collapse icon
    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');

    trigger.appendChild(triggerContent);
    trigger.appendChild(icon);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.setAttribute('id', panelId);
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', triggerId);
    panel.setAttribute('aria-hidden', 'true');

    // Create content wrapper
    const content = document.createElement('div');
    content.className = 'accordion-content';
    if (panelContent) {
      content.innerHTML = panelContent.innerHTML;
    }
    panel.appendChild(content);

    // Assemble item
    item.appendChild(trigger);
    item.appendChild(panel);

    // Replace original row with accordion item
    row.replaceWith(item);
  });

  // Add event listeners
  const triggers = block.querySelectorAll('.accordion-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));

      // If not allowing multiple, close all other items
      if (!allowMultiple && !isExpanded) {
        triggers.forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
            if (otherPanel) {
              otherPanel.setAttribute('aria-hidden', 'true');
            }
          }
        });
      }

      // Toggle current item
      trigger.setAttribute('aria-expanded', !isExpanded);
      panel.setAttribute('aria-hidden', isExpanded);
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      const triggerArray = [...triggers];
      const currentIndex = triggerArray.indexOf(trigger);
      let newIndex;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newIndex = currentIndex === 0 ? triggerArray.length - 1 : currentIndex - 1;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = currentIndex === triggerArray.length - 1 ? 0 : currentIndex + 1;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = triggerArray.length - 1;
          break;
        default:
          return;
      }

      if (newIndex !== undefined) {
        triggerArray[newIndex].focus();
      }
    });
  });

  // Open first item by default if has 'open-first' class
  if (block.classList.contains('open-first') && triggers.length > 0) {
    triggers[0].click();
  }
}
