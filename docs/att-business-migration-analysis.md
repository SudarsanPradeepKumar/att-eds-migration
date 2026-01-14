# AT&T Business Migration Analysis

**Date:** January 14, 2026
**Source Site:** https://business.att.com/
**Target Platform:** AEM Edge Delivery Services

---

## Current State

### Migrated Content
| Page | Status |
|------|--------|
| Homepage (`index.md`) | Complete |
| Navigation (`nav.md`) | Complete |
| Footer (`footer.md`) | Complete |

### Available Blocks (17 total)
- hero, tabs, cards, cards-feature, cards-promo, cards-icon, cards-story
- columns, columns-media, accordion, form-contact, feature-list
- header, footer, fragment

---

## Site Scope from Sitemap

### Products (7 Portfolios + ~25 Product Pages)

| Portfolio | Sub-Products | Est. Pages |
|-----------|-------------|------------|
| **Cloud Connectivity** | Colocation, CDN, NetBond, Managed Cloud Connect, Cloud On-Demand | 6 |
| **5G for Business** | Mobile 5G, On-Premise Edge, Private Cellular Networks | 4 |
| **Business Internet** | Fiber, Internet Air, DSL options | 4 |
| **Cybersecurity** | Dynamic Defense, ActiveArmor, Threat Management | 4 |
| **IoT Solutions** | Platforms, Vehicle, Asset Mgmt, Smart Cities | 6 |
| **Voice & Collaboration** | Office@Hand, SIP Trunking, Cloud Voice Teams, NG 9-1-1 | 6 |
| **Wireless/Mobility** | Plans, International, Field Mgmt, BYOD, Push-to-Talk | 8 |

### Industries (12 Sector Pages + Sub-Pages)

| Industry | Sub-Solutions |
|----------|--------------|
| Financial Services | Security, Customer Experience, Operations |
| Healthcare | IoT Healthcare, Telehealth |
| Manufacturing | Factory Connect, Digital Transform, Supply Chain |
| Public Sector | Government, Defense |
| Retail | Customer Experience, Operations |
| Transportation | Fleet, Logistics |
| Hospitality | Guest WiFi, Operations |
| Small Business | Hub page |
| Wholesale | Carrier services |
| Global Business | International operations |
| Partner Solutions | Channel/reseller |

### Content & Resources (~20+ Pages)

| Section | Pages |
|---------|-------|
| **Insights/Learn** | Customer Stories, Research Reports, Tech Advice, Top Voices |
| **Support** | Contact, Premier Support, Business Center |
| **About** | Business Guarantee, Continuity Planning |
| **Offers** | Current deals and promotions |
| **Bundles** | Combined solutions |

---

## Estimated Migration Effort

| Category | Page Count | Complexity | Effort |
|----------|-----------|------------|--------|
| Homepage | 1 | High | Done |
| Portfolio Pages | 7 | Medium | ~2-3 days |
| Product Pages | 25-30 | Medium | ~5-7 days |
| Industry Pages | 12 | Medium | ~3-4 days |
| Industry Solutions | 10-15 | Low-Medium | ~2-3 days |
| Content/Blog | 20+ | Low | ~3-4 days |
| Support Pages | 3-5 | Low | ~1 day |
| Utility Pages | 5-10 | Low | ~1 day |

**Total Estimated: 85-110 pages**

---

## New Blocks Needed

Based on live site patterns not yet covered:

| Block | Purpose | Priority |
|-------|---------|----------|
| **pricing-table** | Product pricing comparison | High |
| **testimonial** | Customer quotes/stories | Medium |
| **stats-counter** | Animated statistics display | Medium |
| **video-embed** | YouTube/video content | Medium |
| **cta-banner** | Full-width call-to-action | Medium |
| **product-comparison** | Side-by-side features | Medium |
| **breadcrumb** | Navigation breadcrumbs | Low |
| **carousel** | Image/content slider | Low |

---

## Recommended Migration Phases

### Phase 1: Core Structure (Week 1)
- [ ] Navigation refinement with mega-menu
- [ ] Footer with full link structure
- [ ] Global header/search patterns
- [ ] 7 Portfolio landing pages

### Phase 2: Products (Weeks 2-3)
- [ ] Top 15 product pages (highest traffic)
- [ ] Pricing/plans pages
- [ ] New blocks: pricing-table, product-comparison

### Phase 3: Industries (Week 4)
- [ ] 12 industry landing pages
- [ ] Industry solution sub-pages
- [ ] Customer story templates

### Phase 4: Content & Polish (Week 5)
- [ ] Blog/insights section
- [ ] Support pages
- [ ] Forms integration
- [ ] Performance optimization

---

## Key Considerations

### 1. Dynamic Content
Product pricing and offers change frequently. Need content management strategy for:
- Promotional banners
- Pricing tables
- Limited-time offers

### 2. Forms Integration
Contact forms require backend integration:
- Lead capture forms
- Request a quote
- Newsletter signup

### 3. Search Functionality
Site search needs implementation for:
- Product search
- Support articles
- Blog content

### 4. External Links
Many CTAs link to att.com shop - maintain references to:
- Phone purchase flows
- Plan selection
- Account management

### 5. Media Assets
Estimated 200+ images to download/optimize:
- Product images
- Hero banners
- Icons and logos
- Customer photos

---

## URL Structure

### Current Live Site
```
business.att.com/
├── portfolios/          (7 portfolio pages)
│   ├── mobility.html
│   ├── business-internet.html
│   ├── cybersecurity.html
│   └── ...
├── products/            (25+ product pages)
│   ├── wireless-plans.html
│   ├── att-dynamic-defense.html
│   └── ...
├── industries/          (12 industry pages)
│   ├── healthcare.html
│   ├── finance.html
│   └── ...
├── learn/               (blog/insights)
│   ├── customer-stories.html
│   └── ...
├── support/             (help pages)
│   ├── contact.html
│   └── ...
└── offers.html          (promotions)
```

### Recommended EDS Structure
```
content/att-business/
├── index.md             (homepage)
├── nav.md               (navigation)
├── footer.md            (footer)
├── portfolios/
│   ├── mobility.md
│   └── ...
├── products/
│   ├── wireless-plans.md
│   └── ...
├── industries/
│   ├── healthcare.md
│   └── ...
├── learn/
│   ├── customer-stories.md
│   └── ...
└── support/
    ├── contact.md
    └── ...
```

---

## Next Steps

1. **Prioritize pages** based on traffic/business importance
2. **Create missing blocks** for complex UI patterns
3. **Set up image pipeline** for media optimization
4. **Define form handling** strategy
5. **Establish content update** workflow

---

*Generated by AEM Migration Assistant*
