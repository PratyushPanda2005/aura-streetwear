# ClientsSection Specification

Source: https://bymonolog.com/ — `.problems_home_bottom` inside `section.problems_home_wrap` (`data-theme-section="dark"`), measured at 1440×900.

## Overview
- **Target file:** `src/components/sites/intarcs-redesign/ClientsSection.tsx`
- **Screenshot:** `docs/design-references/intarcs-redesign/monolog-clients.png`
- **INTERACTION MODEL: static.** The block itself has no click, hover or time behaviour. The parent section is a GSAP stacking card that translates and fades the whole panel as the page scrolls (`opacity 1 → 0`, `translateY 0 → 704px` between scrollY 1400–2400) — a page-level effect, not part of this component, and not reproduced.

## Layout — `.problems_home_bottom`, 1388×434 at x=26
`display: flex; justify-content: space-between; gap: 16px`
- **Left** `.problems_home_left` 202×15 — `.g_eyebrow` flex, gap 11.75px:
  - `.g_eyebrow_circle` — **14×14**, `background rgb(147,143,138)`, `border-radius: 1440px` (full round)
  - `.g_eyebrow_text` — **19.75px/25.675px**, letter-spacing −0.1975px, weight 500, Khteka, `rgb(232,232,227)`
- **Right** `.problems_home_collection` 803×434 at x=611
  - `.problems_home_list` — `grid-template-columns: 200.742px 200.75px 200.75px 200.75px`, **gap 0**
  - `.problems_home_item` — **201×218**, `padding-bottom: 15.75px`
    - `img.problems_home_image` — **201×201**, source SVGs 351×351 natural
    - `.problems_home_label` — **10.3px/13.39px**, letter-spacing −0.1775px, weight 400, **Suisse Mono**, `rgb(82,77,71)`, uppercase

## Rules (both dotted, not solid)
- Divider above the block: preceding sibling `.problems_home_header-inner`, height 1, `border-bottom: 1px dotted rgb(57,54,50)`
- Under row 1 only: items 1–4 carry `border-bottom: 1px dotted rgb(57,54,50)`; items 5–8 have none (an embedded `@media (min-width: 768px) { .problems_home_item:nth-child(-n+4) … }` rule)

Section background: `rgb(8,8,7)`.

## Content (verbatim, in source order)
| # | Label | Asset |
| --- | --- | --- |
| 1 | Vinamilk | `vinamilk.svg` |
| 2 | Moc Chau Creamery | `moc-chau.svg` |
| 3 | University of Sydney | `sydney.svg` |
| 4 | OH Architecture | `oh-architecture.svg` |
| 5 | Supersolid Agency | `supersolid.svg` |
| 6 | SLIK Agency | `slik.svg` |
| 7 | Mammoth Murals | `mammoth.svg` |
| 8 | Backhouse | `backhouse.svg` |

Eyebrow: "Brands we've helped"

## Assets
`public/sites/intarcs-redesign/images/clients/*.svg` — 8 monochrome logo SVGs.

## Responsive
- **≥768:** 4-column grid, label column on the left, dotted rule under row 1 only.
- **<768:** label stacks above; grid drops to 2 columns.

## Theme adaptation (explicitly requested)
Cloned: the flex `space-between` split (label left / logo grid right), the 4×2 zero-gap grid, square 201×201 logo cells with captions beneath, dotted top divider and dotted mid-grid rule, and the dot + label eyebrow pairing.

Restyled to this page:
- ground `rgb(8,8,7)` → the page's `#0a0a0a`; dotted rules `rgb(57,54,50)` → `#303030`
- **the eyebrow is promoted to a real section title** (user request: it should read as a Clients section like the others). The left column now carries a numbered mono overline `05 CLIENTS` — continuing the numbering the method section starts at 04 — above "Brands we've helped" set as a full `clamp(2rem,4.17vw,3.75rem)` heading. The source's 14px round dot is dropped, since this page's section labels use the number+label pairing instead
- captions → IBM Plex Mono 10px uppercase in `#a9a9a9` (source's `rgb(82,77,71)` is dimmer than this page's muted tone)
- logos ship as-is; they are already monochrome light-on-dark
