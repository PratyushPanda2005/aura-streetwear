# MethodSection Specification

Source: https://telhaclarke.com.au/ — `<c-process class="grid-w relative justify-between pt-margin pb-150 md:pt-150">`, measured at 1440×900.

## Overview
- **Target file:** `src/components/sites/intarcs-redesign/MethodSection.tsx`
- **Screenshot:** `docs/design-references/intarcs-redesign/telhaclarke-method.png`
- **INTERACTION MODEL: hover-driven.** Verified by test, not assumed:
  - at rest item 0 is active (`.a`), image 0 visible
  - after 2.2s with no input, still item 0 → **not** time-driven / auto-cycling
  - dispatching hover on item 4 → item 4 gains `.a` **and** image 4 gains `.a` → text and image swap together from one hover
  - the page runs Lenis smooth scroll, but nothing in this section is scroll-triggered

## DOM structure
```
c-process                       (12-col grid, gap 10px, padding 150px 20px, height 737)
├── 4× corner bracket           (absolute, 20×20; 12px×1px arm + 1px×12px arm, bg-black)
├── div.col-span-full xl:col-span-8      ← the services list
│   └── span.leading-[120%]  ×7          ← one wrapper per service
│       ├── span.process-item[.a]        ← "[&.a]:text-black"
│       │   └── span > "Schematic Design <sup class='body-20 md:body-32'>(01)</sup>"
│       └── span "/"                     ← separator, always muted
├── div.xl:col-start-10 xl:col-end-13 xl:row-span-2   ← image stack
│   └── div.process-image[.a].absolute-full.opacity-0.[&.a]:opacity-100  ×7
├── div.col-span-full md:col-span-2 max-md:order-first  ← "04 Method" label
│   └── c-subtitle.flex.gap-x-10.uppercase.body-14
│       ├── div.subtitle-number.text-mist  "04"
│       └── h2.subtitle-text.text-black    "Method"
└── h3.col-span-full md:col-start-7 md:col-end-13 xl:col-start-4 xl:col-end-7  ← paragraph
```

## Computed styles (getComputedStyle @1440)
### Section
- display grid, `grid-template-columns: repeat(12, 107.5px)`, gap 10px, padding `150px 20px`, height 737
- font-family Europa-Grotesk, background transparent (body `rgb(0,0,0)`, section renders on white page ground)

### Services list
- fontSize 48px, lineHeight 57.6px (`120%`), box 904×280 at x=39
- inactive color `rgb(202,207,203)` (#CACFCB "mist"); active color `rgb(0,0,0)`
- `<sup>` `body-32` → 32px, vertical-align baseline (native sup shift)
- transitionDuration **0s** on both `.process-item` and `.process-image` — the class swap is instant in CSS

### Image stack
- box 333×446 at x=1068 (ratio 0.747); `object-fit: cover`; all 7 stacked `absolute inset-0`, `opacity: 0`, active `opacity: 1`
- below xl: `max-xl:mt-52`, container `w-full h-0 pt-[72%]`

### Label — `c-subtitle`
- fontSize 14px, lineHeight 16.8px, uppercase, `gap-x-10` (10px)
- number "04" color `rgb(202,207,203)`; "Method" color `rgb(0,0,0)`
- box 219×21 at x=39, y=523

### Paragraph
- fontSize 16px, lineHeight 17.6px, color `rgb(0,0,0)`, box 333×68 at x=382, y=523 (4 lines)

## Text content (verbatim)
Services: `Schematic Design (01)` / `Development & Town Planning Applications (02)` / `Design Development (03)` / `Marketing (04)` / `Interior Design (05)` / `Construction Documentation (06)` / `Contract Administration (07)`

Label: `04` `Method`

Paragraph: "The scope of our Studio covers all stages within Architecture and Interior Design. We offer an end to end level of service from early concepts through to practical completion."

## Assets (downloaded, one per service in order)
`public/sites/intarcs-redesign/images/method/`
`01-schematic-design.png`, `02-town-planning.jpg`, `03-design-development.jpg`, `04-marketing.jpg`, `05-interior-design.jpg`, `06-construction-docs.jpg`, `07-contract-admin.jpg`

## Responsive
- **≥1280 (xl):** list `col-span-8`, image `col-start-10 col-end-13 row-span-2`, paragraph `col-start-4 col-end-7`, label `col-span-2`
- **768–1279:** list full width, image full width below it with `pt-[72%]` box, paragraph `col-start-7 col-end-13`, label `col-span-2`
- **<768:** everything `col-span-full`; label moves to the top (`max-md:order-first mb-52`)

## Theme adaptation (explicitly requested: match the intarcs-redesign theme/font/styling)
Layout, proportions, numbering, separators, corner brackets and the hover model are cloned 1:1. Restyled:
- ground → page `#0a0a0a`; inactive items `#3d3d3d`, active `#f2f2f2` (same figure/ground relationship as mist→black on white)
- corner brackets → `#303030`, matching the projects section's pointer square
- list type → Hanken Grotesk (page sans) instead of Europa Grotesk
- label + paragraph → IBM Plex Mono (page mono), matching the hero's label/intro treatment; paragraph in `#a9a9a9`, the page's muted tone
- image crossfade given a 300ms opacity transition. The source's CSS duration is 0s but it stacks 7 absolutely-positioned layers with `opacity-0`/`[&.a]:opacity-100`, a construction that exists to be tweened (by its GSAP runtime); 300ms is the clone's stated interpretation.
