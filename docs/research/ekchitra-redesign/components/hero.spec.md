# EkChitra Redesign — Header + Hero Specification

## Overview
- **Route:** `/ekchitra-redesign` (`src/app/ekchitra-redesign/page.tsx`)
- **Target files:** `src/components/sites/ekchitra-redesign/SiteHeader.tsx`, `HeroSection.tsx`, `data.ts`
- **Layout reference:** hero of https://www.artic.edu/ (layout, spacing, type scale, behaviour only)
- **Content/structure reference:** EkChitra Lovable preview (logo, nav items, eyebrow, headline, body, CTA)
- **Screenshots:** `docs/design-references/ekchitra-redesign/` (`artic-*` = layout reference, `lovable-*` = structure, `clone-*` = result)
- **Interaction model:** header is scroll-direction-driven + hover-driven; hero media is time-driven with a click-to-pause control

## What comes from where
| Aspect | Source |
|---|---|
| Header geometry, two-tier nav, type sizes, colours, hide/show behaviour | Layout reference |
| Hero height, scrim, centred title, button, pause control | Layout reference |
| Logo, nav labels, eyebrow, headline, body copy, CTA label, photographs | EkChitra |
| Typeface | Hanken Grotesk (already loaded in the app) — the reference uses licensed faces that are not reproduced |

## Computed values used (from getComputedStyle on the layout reference)

### Header (`position: fixed`, `z-index: 11`)
| | ≥1200px | 600–1199px | <600px |
|---|---|---|---|
| Height | 140px | 128px | 112px |
| Side gutter | 67.5px (max-width 1440px) | 36px | 18px |
| Logo block top | 24px (92px block) | 20px (88px block) | 16px (80px block) |
| Secondary nav | top 20px, 17px/28px, 300, 0.17px, item gap 32px | top 20px, 16px/24px, gap 16px | top 80px, 16px/24px |
| Primary nav | top 92px, 19px/28px, 300, 0.285px, item gap 32px | top 88px, 18px/24px, 0.27px, gap 16px | hidden → "Menu" button |

- Background: `rgba(255,255,255,0)` → `rgb(255,255,255)`, `transition: background-color 0.3s ease-out`
- Primary link colour: `#fff` → `#1a1a1a` (solid) → `#b50938` (hover), `transition: color 0.6s linear`
- Secondary link colour: `rgba(255,255,255,0.7)` → `#767676` (solid), `transition: color 0.25s 0.25s`

### Header states
- **Top of page:** transparent, white type.
- **Scroll down past ~140px:** `transform: translateY(-140px)` (measured: visible at 80px, hidden at 200px).
- **Scroll up (not at top):** visible, white background, dark type, dark logo.
- **Hover primary nav at top:** white background, dark type, hovered link `#b50938`.

### Hero
- Media band: full width, `height: 675px` at every breakpoint, `overflow: hidden`, placeholder `#f3f3f3`, media `object-fit: cover`
- Scrim: `rgba(0,0,0,0.2)` over the whole band
- Content: flex column, centred both ways, `padding: 0 16px`, shifted down 32px
- Title: uppercase, weight 300 — 36px/44px, 2.88px (≥1200) · 32px/40px, 2.56px (600–1199) · 26px/32px, 2.08px (<600)
- Button: `margin-top: 32px`, white, text `#b50938`, 17px/24px, 0.17px, `padding: 11px 27px`, `border: 1px solid #ccc` → `#949494` on hover, `border-radius: 2px`, `transition: 0.15s ease-in-out`
- Pause control: 32px circle, `right: 20px; bottom: 20px`, `rgba(0,0,0,0.2)` → `rgba(0,0,0,0.5)` on hover, hidden below 600px

## Deliberate departures from the layout reference
- **Eyebrow and body copy** are added above/below the title because the EkChitra structure has them; they reuse the reference's small-caps label style (12px/24px, 500, 1px) and secondary text style (17px/28px, 300).
- **No dropdown chevrons, mega-menu or search icon** — the EkChitra structure has five flat links.
- **Secondary row holds only "Contact"** (from the Lovable footer); the reference has three links there.
- **Media is a 6s cross-fading photo slideshow**, not a film; the pause control pauses the slideshow.
- **Logo is a wordmark** (24px tall, vertically centred in the reference's logo block) rather than a square mark.
- **Breakpoints 600px / 1200px** are inferred from measurements at 390, 768 and 1440px, not read from the stylesheet.

## Assets
- `public/sites/ekchitra-redesign/images/ekchitra-logo.png` (trimmed of transparent padding; inverted via CSS over the hero)
- `public/sites/ekchitra-redesign/images/hero-dsc01932.jpg` (downscaled to 2560px wide)
- `public/sites/ekchitra-redesign/images/hero-newindianexpress-2025-12-05.avif`
- `public/sites/ekchitra-redesign/images/gallery-space-hyderabad.webp`

## Text content (verbatim from the Lovable structure)
- Eyebrow: EkChitra · Hyderabad
- Title: Art is everywhere. We help you notice.
- Body: A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.
- CTA: Our Exhibitions
- Nav: About, Artists, Artworks, Exhibitions, Services · Contact
