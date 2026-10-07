# VoicesSection (testimonial carousel) Specification

Source: https://calendly.com/ — `section#[Home]-CustomerStories`, measured at 1440×900 (section 1440×1089).

## Overview
- **Target file:** `src/components/sites/intarcs-redesign/VoicesSection.tsx`
- **Screenshot:** `docs/design-references/intarcs-redesign/calendly-customer-stories.png`
- **INTERACTION MODEL: time-driven autoplay + click-driven tabs.** Verified, not assumed:
  - sampled the section every 1.2s for 11s with zero input: slide advanced 1 → 2 → 3 on its own → **time-driven**, interval ≈ **6s**
  - the five controls are `<button role="tab" aria-selected aria-controls="use-case-carousel-panel">`; clicking each one switched the slide → **also click-driven**
  - the active tab holds a progress fill `<div style="background: rgb(72,144,227); transform-origin: 0% 50%; transform: scaleX(0.144)">` — captured mid-animation, so the fill scales 0 → 1 across the slide's 6s
  - not scroll-driven, not hover-driven

## Layout — coverflow, 5 cards, absolutely positioned about centre x=720
| Slot | box (x, y, w, h) | radius |
| --- | --- | --- |
| −2 far left | 124, 538, **74 × 205** | 64px |
| −1 left | 214, 469, **105 × 344** | 64px |
| **0 centre** | 339, 384, **762 × 513** | 64px |
| +1 right | 1121, 469, 105 × 344 | 64px |
| +2 far right | 1242, 538, 74 × 205 | 64px |

Neighbours render only their inner photo panel — their text layer sits at `opacity: 0` and translated, which is why they read as tall slivers. Cards are `bg-white` with a `squircle` clip; inner panel `rounded-ui-fixed` 40–48px, `bg rgb(245,243,238)`.

## Computed styles
### Header
- overline: 12px/12px, weight 600, letter-spacing **1px**, uppercase, `#fff`, Geist — "Customer stories"
- h2: **60px/66px**, weight 500, letter-spacing **−2px**, `#fff`, Calendly Sans, max-width 640 — "Real customers. Real results."
- section background: full-bleed `<img>` `homepage-socialproof.DtoRC98v.svg` (blue→purple→pink gradient); section carries class `dark`

### Centre card 762×513 — `flex gap-md p-md` (16px / 16px)
- **Left column** `flex-1 flex flex-col items-start justify-between p-md gap-md`, 353×481
  - stat `h3`: **36px/39.6px**, weight 500, letter-spacing **−1px**, `rgb(7,26,49)`
  - quote `p`: **28px/33.6px**, weight 500, **Wulkan Text (serif)**, `rgb(7,26,49)`
  - opening `“` is a separate span at `absolute right-full` — **hanging punctuation** outside the text column
  - name: 12px/16.8px (1.4), weight 500, `rgb(61,70,78)`, `whitespace-nowrap`
  - role: 12px/1.4, weight 500, `rgb(61,70,78)`, `truncate`
- **Right column** photo: 361×481, `shrink-0 self-stretch`, radius 48px, `bg rgb(245,243,238)`, `img absolute inset-0 size-full object-cover`

### Tabs — `flex items-center gap-1.5` (6px), row 136×8
- each: `h-[8px] rounded-[3px] overflow-hidden`, track `rgba(7,26,49,0.1)`, `transition-[width] duration-300`
- inactive width **8px**, active width **80px**
- active fill: `h-full rounded-[3px]`, `transform-origin: 0% 50%`, `scaleX(0→1)` over the 6s dwell, colour `rgb(72,144,227)`

## Content (verbatim, all five slides — extracted by clicking each tab)
1. **75 hours saved monthly** — "Calendly helps us protect our team's time and make every support interaction count." — Marques Stewart, Managing Director of Technology at Achievement First — `achievement-selected.jpg`
2. **80% reduction in booking-related emails** — "We care deeply about the experience they have with us — and Calendly helps us start it off right." — Akira Bradley, Co-Founder at Barking with the Bradley's — `BarkingwithBradleys-selected.jpg`
3. **3 to 5 hours saved per week** — "Notetaker organizes the chaos of dialogue into clarity." — Lizzie Lewis, Founder at Kitty of Angels — `Kitty-of-angels-selected.jpg`
4. **$1,200 annual savings** — "I use Calendly every single day. Without it, I honestly couldn't run my business." — Pua Pakele, Founder at RBL Media — `RBL-selected.jpg`
5. **100% attendance rate** — "Adding a booking fee didn't just reduce no-shows — it changed the tone of my consultations." — Elizabeth Saunders, Founder at Real Life E — `reallifee-selected.jpg`

## Assets
`public/sites/intarcs-redesign/images/voices/{01-achievement,02-barking,03-kitty,04-rbl,05-reallifee}.jpg` — 722×962 each.

## Responsive
- **≥1024:** full 5-card coverflow as measured.
- **<1024:** neighbours drop away; the centre card goes full width and its inner layout stacks (text above photo). Tabs stay.

## Theme adaptation (explicitly requested)
Cloned exactly: the 5-slot coverflow geometry and proportions, the two-column card (stat / quote / attribution beside a portrait), hanging opening quote, the 8px→80px expanding tabs with a 0→1 progress fill, 6s autoplay, and click-to-jump.

Restyled to this page:
- Calendly's gradient background dropped for the page's `#0a0a0a`; cards become `#111111` with a `#303030` hairline, photo panel `#1a1a1a`
- **all radii squared to 0** — the hero, projects and method sections on this page are strictly sharp-cornered, so 64px squircles would read as foreign
- type → Hanken Grotesk for stat and quote (no serif exists on this page), IBM Plex Mono for overline, name and role, matching the `04 METHOD` label treatment
- colours → stat/quote `#f2f2f2`, name `#f2f2f2`, role `#a9a9a9`, tab track `#303030`, tab fill `#f2f2f2` in place of Calendly blue
