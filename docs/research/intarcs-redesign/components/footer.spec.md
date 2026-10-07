# SiteFooter Specification

Source: https://screen.movie/ — `<footer>` (Framer), measured at 1440×900. Footer box 1440×948.

## Overview
- **Target file:** `src/components/sites/intarcs-redesign/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/intarcs-redesign/screenmovie-footer.png`
- **INTERACTION MODEL: static**, apart from link hovers. Nothing autoplays, nothing is scroll- or click-driven.

## Layout — four columns, content from x=160 to x=1280
Column origins: **160** (brand) / **600** / **840** / **1080** — the three link columns sit on a 240px interval, i.e. ratios `1.67fr 1fr 1fr 1fr` across the 1120px content width.

### Brand column (x=160, width 400)
| element | y | computed |
| --- | --- | --- |
| logo mark | 100 | 30×30 image, wordmark set beside it |
| tagline | 150 | **18px/25.2px**, weight 700, ls −0.72px, `#fff` |
| subline | 195 | **14px/19.6px**, weight 400, ls −0.14px, `#fff` |
| CTA button | 235 | box 165×33, `bg #fff`, radius **8px**, padding `8px 16px`; label **12px/16.8px**, weight 600, `#000` |
| copyright | 288 | **12px/19.2px**, weight 400, `#fff` |
| credit line | 327 | 24px avatar + name |

### Link columns
- headings ("Menu", "Navigation", "More products") all at y=**100**: **16px/16px**, weight **700**, ls **−0.8px**, `#fff`
- Menu links: **14px/16.8px**, weight 500, ls −0.28px, rows at y=136/167/199/231 → ~31.7px rhythm
- Navigation & More products links: **14px/22.4px**, weight 400, rows at y=139/176/213 → 37px rhythm
- all links `#fff`

### Giant wordmark + bleed
- wordmark: **222.811px/222.811px**, weight 600, letter-spacing **−18px** (−0.081em), box 1200×223 at x=120, y=498 — wider than the text content, slightly outdented
- decorative image: 1440×446 at y=548, i.e. it starts 50px below the wordmark's top and **occludes roughly its lower three-quarters**; two stacked layers of the same asset (y=548 and y=588)

Page background `rgb(0,0,0)`; the footer itself is transparent over it.

## Content (source, for reference)
Brand: "Screen Movie" / "Screen Recording & Motion Editor for macOS" / "Create beautiful movies from your screen." / CTA "Download for macOS" / "© 2026 Screen.Movie - All rights reserved" / "Built with 💙 by Solt Wagner".
Menu: Home, Features, FAQ, Pricing. Navigation: Contact, Share feedback, Roadmap, Privacy policy, Terms of service, Customer portal. More products: Macapp.Supply, Supaste.com, Dock.Cool, Runey.app, Revone.app, Icoon.co, Selected.site, Supaframe.io, Frameblox.com.

## Content decision
A footer is site navigation, so unlike the earlier sections the source copy is **not** carried over: Screen Movie's own product list, its macOS download CTA and its personal credit to a named individual would be meaningless — and in the credit's case a misattribution — on this page. The **structure** is cloned and populated with this site's own content:
- brand block → PRØDUX wordmark, the hero's "You feel the brand before it speaks®" as tagline, the hero intro as subline, CTA "Start a project"
- "Menu" → Work, Studio, Journal, Contact (the hero nav, anchored to the real section ids)
- "Navigation" → Selected projects `#work`, Method `#studio`, Customer stories `#voices`, Clients `#clients`
- "More products" → "Elsewhere": Instagram, LinkedIn, Behance, Dribbble, X (placeholder `#` hrefs)
- credit line dropped

## Theme adaptation
Cloned: the four-column split on the 240px interval, heading-above-links structure, the white CTA in the brand block, the copyright line, and the giant wordmark occluded by a full-bleed image at the bottom.

Restyled:
- ground → `#0a0a0a`; links `#a9a9a9` → `#f2f2f2` on hover
- CTA radius **8px → 0**, matching this page's sharp-cornered geometry throughout
- column headings → IBM Plex Mono 11px uppercase `tracking-[0.14em]` in `#a9a9a9`, this page's label convention
- tagline/links → Hanken Grotesk (light weights, not the source's 700)
- subline, copyright and CTA label → IBM Plex Mono, matching the hero's meta treatment
- bleed image → the page's own hero visual rather than the source's dunes artwork, keeping the same wordmark-occlusion composition
