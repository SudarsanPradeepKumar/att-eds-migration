import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Decorates the footer top section (logo and social links)
 * @param {Element} section The section element
 */
function decorateFooterTop(section) {
  section.classList.add('footer-top');

  // Find logo
  const logo = section.querySelector('picture, img');
  if (logo) {
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'footer-logo';
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.appendChild(logo.cloneNode(true));
    logoWrapper.appendChild(logoLink);
    logo.closest('p')?.replaceWith(logoWrapper);
  }

  // Find social links list
  const socialList = section.querySelector('ul');
  if (socialList) {
    socialList.classList.add('footer-social');
    socialList.querySelectorAll('a').forEach((link) => {
      // Add icon class based on link text
      const iconName = link.textContent.trim().toLowerCase();
      link.innerHTML = `<span class="icon icon-${iconName}"></span>`;
      link.setAttribute('aria-label', iconName);
    });
  }
}

/**
 * Decorates the footer navigation section
 * @param {Element} section The section element
 */
function decorateFooterNav(section) {
  section.classList.add('footer-nav');

  // Find all navigation columns (h3 headings with following lists)
  const headings = section.querySelectorAll('h3');
  headings.forEach((heading) => {
    const column = document.createElement('div');
    column.className = 'footer-nav-column';

    // Create toggle button for mobile accordion
    const toggle = document.createElement('button');
    toggle.className = 'footer-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = heading.textContent;

    // Find the list that follows this heading
    let nextEl = heading.nextElementSibling;
    const content = document.createElement('div');
    content.className = 'footer-nav-content';
    content.setAttribute('aria-hidden', 'true');

    while (nextEl && nextEl.tagName !== 'H3') {
      const next = nextEl.nextElementSibling;
      content.appendChild(nextEl);
      nextEl = next;
    }

    // Add click handler for accordion
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
    });

    column.appendChild(toggle);
    column.appendChild(content);
    heading.replaceWith(column);
  });
}

/**
 * Decorates the footer legal section
 * @param {Element} section The section element
 */
function decorateFooterLegal(section) {
  section.classList.add('footer-legal');

  // Find links list
  const linksList = section.querySelector('ul');
  if (linksList) {
    linksList.classList.add('footer-legal-links');
  }

  // Find copyright paragraph
  const paragraphs = section.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (p.textContent.includes('©') || p.textContent.includes('AT&T')) {
      p.classList.add('footer-copyright');
    }
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  let footerPath;
  if (footerMeta) {
    footerPath = new URL(footerMeta, window.location).pathname;
  } else {
    // Try to find footer in content directory based on current path
    const currentPath = window.location.pathname;
    const pathMatch = currentPath.match(/^(\/content\/[^/]+)\//);
    footerPath = pathMatch ? `${pathMatch[1]}/footer` : '/footer';
  }
  const fragment = await loadFragment(footerPath);

  if (!fragment) {
    // eslint-disable-next-line no-console
    console.warn('Footer: footer fragment not found at', footerPath);
    return;
  }

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer';

  // Get all sections from fragment - try .section first, then direct children divs
  let sections = fragment.querySelectorAll('.section');
  if (sections.length === 0) {
    // Fragment might have direct div children or default-content-wrapper
    const wrapper = fragment.querySelector('.default-content-wrapper');
    if (wrapper) {
      sections = wrapper.children;
    } else {
      sections = fragment.children;
    }
  }

  Array.from(sections).forEach((section, index) => {
    const sectionDiv = document.createElement('div');

    // Clone content from section
    if (section.children) {
      Array.from(section.children).forEach((child) => {
        sectionDiv.appendChild(child.cloneNode(true));
      });
    }

    // Decorate based on section content
    const hasLogo = sectionDiv.querySelector('picture, img');
    const hasSocialLinks = sectionDiv.querySelector('ul a[href*="facebook"], ul a[href*="linkedin"], ul a[href*="youtube"], ul a[href*="twitter"], ul a[href*="instagram"]');
    const hasNavHeadings = sectionDiv.querySelectorAll('h3').length > 0;
    const hasCopyright = sectionDiv.textContent.includes('©');

    if ((hasLogo || hasSocialLinks) && !hasNavHeadings) {
      decorateFooterTop(sectionDiv);
    } else if (hasNavHeadings) {
      decorateFooterNav(sectionDiv);
    } else if (hasCopyright || sectionDiv.querySelector('ul a[href*="privacy"], ul a[href*="terms"], ul a[href*="accessibility"]')) {
      decorateFooterLegal(sectionDiv);
    }

    footer.appendChild(sectionDiv);
  });

  block.append(footer);
}
