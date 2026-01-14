# FirstNet Migration Analysis

**Date:** January 14, 2026
**Source Site:** https://www.firstnet.com/
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

## Site Structure from Navigation

### Products Section
| Page | URL | Priority |
|------|-----|----------|
| Rate Plans | `/plans.html` | High |
| FirstNet Devices | `/devices.html` | High |
| Phones | `/devices/phones.html` | High |
| Coverage Map | `/coverage.html` | High |
| FirstNet Apps | `/apps.html` | Medium |
| Offers | `/offers/firstnet-and-family.html` | High |
| Mission-Critical Solutions | `/mission-critical.html` | High |

### About Section (The FirstNet Difference)
| Page | URL | Priority |
|------|-----|----------|
| What is FirstNet | `/what-is-firstnet.html` | Medium |
| Why FirstNet | `/why-firstnet.html` | Medium |
| Coverage | `/coverage.html` | High |
| FirstNet Community | `/community.html` | Medium |

### Get Started Section
| Page | URL | Priority |
|------|-----|----------|
| Who's Eligible | `/firstnet-eligibility.html` | High |
| Contact Us | `/contact-us.html` | High |
| Industry Solutions | `/industry-solutions.html` | Medium |
| Sign Up | `/sign-up.html` | High |

### Support & Help
| Page | URL | Priority |
|------|-----|----------|
| FAQ | `/faq.html` | Medium |
| Help Center | `/help.html` | Medium |
| Pay Bill Online | `/help/account-help/pay-bill-online.html` | High |

### Footer Links (Sitemap)
| Page | URL | Priority |
|------|-----|----------|
| Power of FirstNet | `/power-of-firstnet.html` | Medium |
| Application Ecosystem | `/apps.html` | Medium |
| Privacy Notice | `/privacy-notice.html` | Low |
| Terms & Conditions | `/terms-and-conditions.html` | Low |
| Accessibility | `/accessibility.html` | Low |

### Community/News Section
| Page | URL | Priority |
|------|-----|----------|
| Community Hub | `/community.html` | Medium |
| News Articles | `/community/news/*.html` | Low |
| Case Studies | `/content/dam/firstnet/case-studies/*.pdf` | Low |

---

## Estimated Page Count

| Category | Page Count | Complexity |
|----------|-----------|------------|
| Homepage | 1 | High - Done |
| Product Pages | 8-10 | Medium-High |
| About/Info Pages | 5-6 | Low-Medium |
| Get Started/Eligibility | 4-5 | Medium |
| Support/Help | 5-8 | Low-Medium |
| Community/News | 10-15 | Low |
| Legal/Policy | 3-4 | Low |
| Industry Solutions | 5-8 | Medium |

**Total Estimated: 45-60 pages**

---

## Estimated Migration Effort

| Category | Page Count | Effort |
|----------|-----------|--------|
| Homepage | 1 | Done |
| High Priority Pages | 12-15 | ~3-4 days |
| Medium Priority Pages | 15-20 | ~3-4 days |
| Low Priority Pages | 15-25 | ~2-3 days |
| Navigation & Footer | 2 | Done |

**Total Estimated: 2-3 weeks**

---

## Key Pages to Migrate (Priority Order)

### Phase 1: Core Product Pages (Week 1)
1. [ ] Rate Plans (`/plans.html`)
2. [ ] Devices Hub (`/devices.html`)
3. [ ] Phones (`/devices/phones.html`)
4. [ ] Coverage Map (`/coverage.html`)
5. [ ] Offers (`/offers/firstnet-and-family.html`)
6. [ ] Mission-Critical (`/mission-critical.html`)

### Phase 2: Conversion & Support (Week 2)
7. [ ] Sign Up (`/sign-up.html`)
8. [ ] Check Eligibility (`/firstnet-eligibility.html`)
9. [ ] Contact Us (`/contact-us.html`)
10. [ ] Help Center (`/help.html`)
11. [ ] FAQ (`/faq.html`)
12. [ ] Pay Bill (`/help/account-help/pay-bill-online.html`)

### Phase 3: Content & Community (Week 3)
13. [ ] What is FirstNet (`/what-is-firstnet.html`)
14. [ ] Why FirstNet (`/why-firstnet.html`)
15. [ ] Power of FirstNet (`/power-of-firstnet.html`)
16. [ ] Industry Solutions (`/industry-solutions.html`)
17. [ ] Community Hub (`/community.html`)
18. [ ] FirstNet Apps (`/apps.html`)
19. [ ] News Articles (select key articles)

---

## New Blocks Needed

| Block | Purpose | Priority |
|-------|---------|----------|
| **coverage-map** | Interactive coverage map embed | High |
| **device-grid** | Phone/device product listings | High |
| **pricing-table** | Rate plan comparison | High |
| **eligibility-checker** | Interactive eligibility form | Medium |
| **video-hero** | Hero with background video | Medium |
| **testimonial** | Customer quotes/stories | Medium |
| **app-showcase** | App ecosystem display | Low |
| **news-feed** | Dynamic news/blog listing | Low |

---

## Technical Considerations

### 1. External Integrations
- **Coverage Map**: Likely embedded iframe or custom map integration
- **Eligibility Checker**: Form that connects to backend validation
- **Device Shop**: Links to AT&T shop with `?fnStatus=true` parameter
- **Account Login**: External link to `localcontrol.firstnet.att.com`

### 2. Form Handling
| Form | Location | Integration Needed |
|------|----------|-------------------|
| Newsletter Signup | Homepage | Email service |
| Contact Form | Contact page | CRM integration |
| Eligibility Check | Sign up flow | Backend validation |

### 3. Dynamic Content
- Device listings and pricing
- Current offers/promotions
- News articles and community content
- Coverage data

### 4. External Links to Maintain
```
AT&T Shop: https://www.att.com/buy/phones/?fnStatus=true
Account: https://localcontrol.firstnet.att.com/
FirstNet Authority: https://firstnet.gov/
Social: Facebook, LinkedIn, X, YouTube
```

### 5. Media Assets
- Hero images (~5-10)
- Device product images (~20-30)
- Icons and logos (~15-20)
- News/article images (~30-50)
- Case study PDFs

**Estimated: 80-120 media assets**

---

## URL Structure

### Current Live Site
```
firstnet.com/
├── index.html                    (homepage)
├── plans.html                    (rate plans)
├── coverage.html                 (coverage map)
├── devices.html                  (devices hub)
│   └── phones.html               (phones)
├── apps.html                     (app ecosystem)
├── mission-critical.html         (mission-critical)
├── offers/
│   └── firstnet-and-family.html  (family offer)
├── what-is-firstnet.html         (about)
├── why-firstnet.html             (benefits)
├── power-of-firstnet.html        (features)
├── firstnet-eligibility.html     (eligibility)
├── sign-up.html                  (signup)
├── contact-us.html               (contact)
├── faq.html                      (FAQ)
├── help.html                     (help hub)
│   └── account-help/
│       └── pay-bill-online.html  (billing)
├── industry-solutions.html       (industries)
├── community.html                (community hub)
│   └── news/                     (news articles)
├── privacy-notice.html           (privacy)
├── terms-and-conditions.html     (terms)
└── accessibility.html            (a11y)
```

### Recommended EDS Structure
```
content/firstnet/
├── index.md                      (homepage) ✓
├── nav.md                        (navigation) ✓
├── footer.md                     (footer) ✓
├── plans.md                      (rate plans)
├── coverage.md                   (coverage map)
├── devices/
│   ├── index.md                  (devices hub)
│   └── phones.md                 (phones)
├── apps.md                       (app ecosystem)
├── mission-critical.md           (mission-critical)
├── offers/
│   └── firstnet-and-family.md    (family offer)
├── about/
│   ├── what-is-firstnet.md       (about)
│   ├── why-firstnet.md           (benefits)
│   └── power-of-firstnet.md      (features)
├── get-started/
│   ├── eligibility.md            (eligibility)
│   ├── sign-up.md                (signup)
│   └── contact-us.md             (contact)
├── help/
│   ├── index.md                  (help hub)
│   ├── faq.md                    (FAQ)
│   └── pay-bill.md               (billing)
├── industry-solutions.md         (industries)
├── community/
│   ├── index.md                  (community hub)
│   └── news/                     (news articles)
└── legal/
    ├── privacy.md                (privacy)
    ├── terms.md                  (terms)
    └── accessibility.md          (a11y)
```

---

## Comparison: FirstNet vs AT&T Business

| Aspect | FirstNet | AT&T Business |
|--------|----------|---------------|
| Total Pages | 45-60 | 85-110 |
| Complexity | Medium | High |
| Product Depth | Focused (public safety) | Broad (all business) |
| Forms | 3-4 | 5-6 |
| Integrations | Coverage map, eligibility | Pricing, quotes |
| Timeline | 2-3 weeks | 4-5 weeks |

---

## Design Considerations

### Brand Differences from AT&T Business
- **Primary Color**: FirstNet Blue (#003366)
- **Accent**: Safety Orange highlights
- **Imagery**: First responders, emergency services
- **Tone**: Mission-focused, reliability-centric
- **Target Audience**: Public safety professionals

### Shared Components
- AT&T Globe logo integration
- Similar footer structure
- Common legal/privacy links
- Shared AT&T shop integration

---

## Next Steps

1. **Prioritize by traffic** - Identify highest-traffic pages for early migration
2. **Build coverage-map block** - Key differentiator for FirstNet
3. **Create device-grid block** - Reusable for phone/device listings
4. **Set up eligibility flow** - Critical conversion path
5. **Migrate rate plans** - High-value content page

---

*Generated by AEM Migration Assistant*
