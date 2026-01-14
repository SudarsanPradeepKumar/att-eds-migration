import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * Builds the mega menu structure from nested lists
 * @param {Element} navSection The nav section containing nested content
 */
function buildMegaMenu(navSection) {
  const nestedUl = navSection.querySelector('ul');
  if (!nestedUl) return;

  // Create mega menu container
  const megaMenu = document.createElement('div');
  megaMenu.className = 'mega-menu';
  megaMenu.setAttribute('aria-hidden', 'true');

  // Get all top-level items (categories)
  const categories = nestedUl.querySelectorAll(':scope > li');

  // Check if this is a multi-column mega menu
  if (categories.length > 3) {
    megaMenu.classList.add('mega-menu-multi');
  }

  // Create columns container
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'mega-menu-columns';

  categories.forEach((category) => {
    const column = document.createElement('div');
    column.className = 'mega-menu-column';

    // Get category title (first text or link)
    const categoryLink = category.querySelector(':scope > a');
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'mega-menu-category';

    if (categoryLink) {
      categoryTitle.innerHTML = `<a href="${categoryLink.href}">${categoryLink.textContent}</a>`;
    } else {
      // If no link, use the text content before the nested ul
      const textContent = category.childNodes[0]?.textContent?.trim();
      if (textContent) {
        categoryTitle.innerHTML = `<span>${textContent}</span>`;
      }
    }

    column.appendChild(categoryTitle);

    // Get subcategory links
    const subList = category.querySelector(':scope > ul');
    if (subList) {
      const subLinks = document.createElement('ul');
      subLinks.className = 'mega-menu-links';

      subList.querySelectorAll(':scope > li').forEach((subItem) => {
        const li = document.createElement('li');
        const link = subItem.querySelector('a');
        if (link) {
          li.innerHTML = `<a href="${link.href}">${link.textContent}</a>`;
        } else {
          li.textContent = subItem.textContent;
        }
        subLinks.appendChild(li);
      });

      column.appendChild(subLinks);
    }

    columnsContainer.appendChild(column);
  });

  megaMenu.appendChild(columnsContainer);

  // Replace the original ul with the mega menu
  nestedUl.style.display = 'none';
  navSection.appendChild(megaMenu);
  navSection.classList.add('has-mega-menu');
}

/**
 * Sets up mega menu hover/click behavior
 * @param {Element} navSection The nav section with mega menu
 */
function setupMegaMenuBehavior(navSection) {
  const megaMenu = navSection.querySelector('.mega-menu');
  if (!megaMenu) return;

  let hoverTimeout;

  // Desktop: hover behavior
  navSection.addEventListener('mouseenter', () => {
    if (isDesktop.matches) {
      clearTimeout(hoverTimeout);
      // Close other mega menus
      document.querySelectorAll('.has-mega-menu').forEach((section) => {
        if (section !== navSection) {
          section.setAttribute('aria-expanded', 'false');
          const otherMenu = section.querySelector('.mega-menu');
          if (otherMenu) otherMenu.setAttribute('aria-hidden', 'true');
        }
      });
      navSection.setAttribute('aria-expanded', 'true');
      megaMenu.setAttribute('aria-hidden', 'false');
    }
  });

  navSection.addEventListener('mouseleave', () => {
    if (isDesktop.matches) {
      hoverTimeout = setTimeout(() => {
        navSection.setAttribute('aria-expanded', 'false');
        megaMenu.setAttribute('aria-hidden', 'true');
      }, 150);
    }
  });

  // Click behavior (for mobile and accessibility)
  const trigger = navSection.querySelector(':scope > a, :scope > span');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      if (!isDesktop.matches || navSection.classList.contains('has-mega-menu')) {
        e.preventDefault();
        const isExpanded = navSection.getAttribute('aria-expanded') === 'true';

        // Close other sections
        document.querySelectorAll('.has-mega-menu').forEach((section) => {
          section.setAttribute('aria-expanded', 'false');
          const otherMenu = section.querySelector('.mega-menu');
          if (otherMenu) otherMenu.setAttribute('aria-hidden', 'true');
        });

        if (!isExpanded) {
          navSection.setAttribute('aria-expanded', 'true');
          megaMenu.setAttribute('aria-hidden', 'false');
        }
      }
    });
  }
}

/**
 * Builds quick links bar from nav content
 * @param {Element} nav The nav element
 */
function buildQuickLinks(nav) {
  const quickLinksSection = nav.querySelector('.nav-quick-links');
  if (!quickLinksSection) return;

  const quickLinksWrapper = document.createElement('div');
  quickLinksWrapper.className = 'quick-links-wrapper';

  const ul = quickLinksSection.querySelector('ul');
  if (ul) {
    ul.className = 'quick-links';
    quickLinksWrapper.appendChild(ul.cloneNode(true));
  }

  // Insert after nav-wrapper
  const navWrapper = nav.closest('.nav-wrapper');
  if (navWrapper) {
    navWrapper.parentElement.insertBefore(quickLinksWrapper, navWrapper.nextSibling);
  }
}

/**
 * Parses navigation items from a single list into sections, tools, and quick links
 * @param {Element} ul The main navigation list
 * @returns {Object} Object containing categorized nav items
 */
function parseNavItems(ul) {
  const sections = [];
  const tools = [];
  const quickLinks = [];

  ul.querySelectorAll(':scope > li').forEach((li) => {
    const hasNestedList = li.querySelector('ul');
    const linkText = li.textContent.trim();
    const isIcon = linkText.startsWith(':') && linkText.includes(':');

    if (hasNestedList) {
      // Items with nested lists are main nav sections (mega menu items)
      sections.push(li.cloneNode(true));
    } else if (isIcon) {
      // Items with :icon: syntax are tools
      tools.push(li.cloneNode(true));
    } else {
      // Simple items are quick links
      quickLinks.push(li.cloneNode(true));
    }
  });

  return { sections, tools, quickLinks };
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  let navPath;
  if (navMeta) {
    navPath = new URL(navMeta, window.location).pathname;
  } else {
    // Try to find nav in content directory based on current path
    const currentPath = window.location.pathname;
    const pathMatch = currentPath.match(/^(\/content\/[^/]+)\//);
    navPath = pathMatch ? `${pathMatch[1]}/nav` : '/nav';
  }
  const fragment = await loadFragment(navPath);

  if (!fragment) {
    // eslint-disable-next-line no-console
    console.warn('Header: nav fragment not found at', navPath);
    return;
  }

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // Get content from fragment
  const fragmentContent = fragment.querySelector('.section');
  if (!fragmentContent) {
    // eslint-disable-next-line no-console
    console.warn('Header: no section found in fragment');
    return;
  }

  // Find brand (first picture/image paragraph)
  const brandParagraph = fragmentContent.querySelector('p:has(picture), p:has(img)');
  if (brandParagraph) {
    const navBrand = document.createElement('div');
    navBrand.className = 'nav-brand';
    const brandLink = document.createElement('a');
    brandLink.href = '/';
    brandLink.appendChild(brandParagraph.querySelector('picture, img').cloneNode(true));
    navBrand.appendChild(brandLink);
    nav.appendChild(navBrand);
  }

  // Find the main navigation list
  const mainList = fragmentContent.querySelector('ul');
  if (mainList) {
    const { sections, tools, quickLinks } = parseNavItems(mainList);

    // Create nav sections container
    if (sections.length > 0) {
      const navSections = document.createElement('div');
      navSections.className = 'nav-sections';
      const wrapper = document.createElement('div');
      wrapper.className = 'default-content-wrapper';
      const sectionsList = document.createElement('ul');
      sections.forEach((section) => sectionsList.appendChild(section));
      wrapper.appendChild(sectionsList);
      navSections.appendChild(wrapper);
      nav.appendChild(navSections);
    }

    // Create tools container
    if (tools.length > 0) {
      const navTools = document.createElement('div');
      navTools.className = 'nav-tools';
      tools.forEach((tool) => {
        const link = tool.querySelector('a');
        if (link) {
          // Convert :icon: syntax to actual icon
          const iconMatch = link.textContent.match(/:([^:]+):/);
          if (iconMatch) {
            const iconName = iconMatch[1];
            link.innerHTML = `<span class="icon icon-${iconName}"></span>`;
            link.setAttribute('aria-label', iconName);
          }
          navTools.appendChild(link);
        }
      });
      nav.appendChild(navTools);
    }

    // Create quick links container
    if (quickLinks.length > 0) {
      const navQuickLinks = document.createElement('div');
      navQuickLinks.className = 'nav-quick-links';
      const quickLinksList = document.createElement('ul');
      quickLinks.forEach((link) => quickLinksList.appendChild(link));
      navQuickLinks.appendChild(quickLinksList);
      nav.appendChild(navQuickLinks);
    }
  }

  // Handle brand section
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const brandLink = navBrand.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container')?.classList.remove('button-container');
    }
  }

  // Handle nav sections with mega menus
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      // Check if this section has nested content (mega menu)
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
        buildMegaMenu(navSection);
        setupMegaMenuBehavior(navSection);
      }

      // Click handler for non-mega menu items
      navSection.addEventListener('click', () => {
        if (isDesktop.matches && !navSection.classList.contains('has-mega-menu')) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // Build quick links if present
  buildQuickLinks(nav);

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
