/**
 * Tabs Block
 * Creates accessible tabbed interface from block content
 */

function generateId(prefix = 'tab') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function decorate(block) {
  // Create tabs list container
  const tabsList = document.createElement('div');
  tabsList.className = 'tabs-list';
  tabsList.setAttribute('role', 'tablist');

  // Create panels container
  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'tabs-panels';

  // Get all rows - first cell is tab label, second is content
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const tabLabel = cells[0]?.textContent?.trim() || `Tab ${index + 1}`;
    const tabContent = cells[1] || cells[0];

    // Generate unique IDs
    const tabId = generateId('tab');
    const panelId = generateId('panel');

    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.className = 'tabs-tab';
    tabButton.setAttribute('role', 'tab');
    tabButton.setAttribute('id', tabId);
    tabButton.setAttribute('aria-controls', panelId);
    tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tabButton.setAttribute('tabindex', index === 0 ? '0' : '-1');
    tabButton.textContent = tabLabel;

    // Create tab panel
    const tabPanel = document.createElement('div');
    tabPanel.className = 'tabs-panel';
    tabPanel.setAttribute('role', 'tabpanel');
    tabPanel.setAttribute('id', panelId);
    tabPanel.setAttribute('aria-labelledby', tabId);
    tabPanel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    tabPanel.setAttribute('tabindex', '0');

    // Move content to panel
    if (tabContent) {
      tabPanel.appendChild(tabContent.cloneNode(true));
    }

    tabsList.appendChild(tabButton);
    panelsContainer.appendChild(tabPanel);
  });

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(tabsList);
  block.appendChild(panelsContainer);

  // Add event listeners
  const tabs = tabsList.querySelectorAll('[role="tab"]');
  const panels = panelsContainer.querySelectorAll('[role="tabpanel"]');

  function selectTab(selectedTab) {
    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isSelected = panel.id === selectedTab.getAttribute('aria-controls');
      panel.setAttribute('aria-hidden', isSelected ? 'false' : 'true');
    });
  }

  tabsList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('[role="tab"]');
    if (clickedTab) {
      selectTab(clickedTab);
      clickedTab.focus();
    }
  });

  // Keyboard navigation
  tabsList.addEventListener('keydown', (e) => {
    const currentTab = document.activeElement;
    const tabArray = [...tabs];
    const currentIndex = tabArray.indexOf(currentTab);

    let newIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabArray.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex === tabArray.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabArray.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== undefined) {
      selectTab(tabArray[newIndex]);
      tabArray[newIndex].focus();
    }
  });
}
