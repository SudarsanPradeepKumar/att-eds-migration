/*
 * Multi-Site Configuration
 * Handles site detection and configuration for AT&T Business and FirstNet
 */

/**
 * Site configuration definitions
 */
export const SITES = {
  'att-business': {
    name: 'AT&T Business',
    hostnames: ['business.att.com', 'www.business.att.com'],
    contentRoot: '/att-business',
    theme: 'att-business',
    logo: '/icons/att-logo.svg',
    defaultLocale: 'en-US',
  },
  firstnet: {
    name: 'FirstNet',
    hostnames: ['firstnet.com', 'www.firstnet.com'],
    contentRoot: '/firstnet',
    theme: 'firstnet',
    logo: '/icons/firstnet-logo.svg',
    defaultLocale: 'en-US',
  },
};

/**
 * Default site for local development
 */
const DEFAULT_SITE = 'att-business';

/**
 * Detect the current site based on hostname or path
 * @returns {string} Site key (e.g., 'att-business' or 'firstnet')
 */
export function detectSite() {
  const { hostname, pathname } = window.location;

  // Check hostname mapping
  for (const [siteKey, config] of Object.entries(SITES)) {
    if (config.hostnames.includes(hostname)) {
      return siteKey;
    }
  }

  // Check path-based detection for local development/preview
  for (const [siteKey, config] of Object.entries(SITES)) {
    if (pathname.startsWith(config.contentRoot)) {
      return siteKey;
    }
  }

  // Check for site parameter in URL (useful for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const siteParam = urlParams.get('site');
  if (siteParam && SITES[siteParam]) {
    return siteParam;
  }

  return DEFAULT_SITE;
}

/**
 * Get configuration for the current site
 * @returns {Object} Site configuration object
 */
export function getSiteConfig() {
  const siteKey = detectSite();
  return {
    key: siteKey,
    ...SITES[siteKey],
  };
}

/**
 * Apply site theme class to document
 */
export function applySiteTheme() {
  const config = getSiteConfig();
  document.documentElement.classList.add(`site-${config.key}`);
  document.documentElement.dataset.site = config.key;
  document.documentElement.dataset.theme = config.theme;
}

/**
 * Load site-specific CSS
 */
export async function loadSiteStyles() {
  const config = getSiteConfig();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${window.hlx.codeBasePath}/styles/${config.theme}.css`;
  document.head.appendChild(link);
}

/**
 * Get content path adjusted for site
 * @param {string} path - Original content path
 * @returns {string} Adjusted path with site prefix if needed
 */
export function getSiteContentPath(path) {
  const config = getSiteConfig();

  // If path already starts with site root, return as-is
  if (path.startsWith(config.contentRoot)) {
    return path;
  }

  // For absolute paths, prepend site root
  if (path.startsWith('/')) {
    return `${config.contentRoot}${path}`;
  }

  return path;
}

/**
 * Initialize site configuration
 * Called early in page load
 */
export function initSite() {
  applySiteTheme();
}
