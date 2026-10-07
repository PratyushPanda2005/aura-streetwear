# ProjectsSection Specification

Source: https://www.produx.design/ — `section.project-section` (page y ≈ 6230, height 2895 at 1440×900).

## Overview
- **Target file:** `src/components/sites/intarcs-redesign/ProjectsSection.tsx`
- **Screenshots:** `docs/design-references/intarcs-redesign/produx-projects-{header,row1,row2}.png`
- **Interaction model:** static. The live site adds GSAP scroll entrances (`opacity-0 blur-sm translate-y` → resting state) and draws the heading in a three.js canvas; the clone renders the resting state as real DOM.

## Section shell
- padding: `0 79.92px 105.03px` → `px-[5.55vw] pb-[11.67vh]` (mobile `px-[4.10vw]`)
- color: `rgb(242,242,242)` (#F2F2F2) on near-black (site body `rgb(14,14,14)`; our page uses `#0a0a0a`)

## Header — `flex items-end justify-between pt-[16.6vh]`
- **Heading** "Selected projects", two lines. The live site renders it into a three.js `<canvas>` 301×180 at x=80,y=149, so there is no DOM type to read: measured ≈84px type on a ~90px line box → `text-[5.83vw] leading-[1.07]`.
- **Link** "view all works": DM Mono, 19.872px (`1.38vw`), lh 29.808px, uppercase, #F2F2F2, `mb-[1.17vh]`, `w-fit`; inner row `flex items-center gap-[0.4vw]`; beneath it a `h-px w-full bg-white-smoke translate-y-[0.39vh] origin-left` rule.

## Rows — `flex flex-col gap-[13.67vh] pt-[11.7vh]` (mobile `gap-[4.7vh] pt-[8.56vh]`)

| Row | Grid | Cards |
| --- | --- | --- |
| 1 | `grid-cols-12 gap-[1.39vw]` | Payy `col-span-7`; Gather `col-span-4 col-end-13 mt-auto h-fit` |
| 2 | `grid-cols-12` (no gap) | Jurni `col-span-10 col-start-2` |
| 3 | `grid-cols-12 gap-[1.39vw]` | Parker `col-span-4 h-fit`; Nolana `col-span-7 col-end-13` |

`mt-auto` on Gather is what drops it ~155px so its info row bottom-aligns with Payy's.

## Card — `flex flex-col gap-[1.67vw]` (24.048px)

### Media `relative w-full overflow-hidden`
Height is assigned inline by JS; measured w×h at 1440 gives fixed ratios:
- `col-span-7` → 738.42 × 585.71 → `aspect-[738/586]`
- `col-span-4` → 413.38 × 430.20 → `aspect-[413/430]`
- `col-span-10` → 1066.80 × 583.06 → `aspect-[1067/583]`

Image: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover`, no border radius.

### Tag row `pointer-events-none absolute right-0 bottom-0 m-[1.39vw] flex gap-[0.41vw]` (hidden `max-sm`)
Each tag: DM Mono, `-rotate-2 border border-white/5 bg-black/25 p-[0.69vw] uppercase backdrop-blur-md`, fontSize 9.936px (`0.69vw`), lh 14.904px, color #F2F2F2. Visible at rest.

### Info row `relative flex w-full` (stacks `max-sm`)
- Pointer square: `my-[1.5vh] mr-[0.73vw] size-[0.55vw] border border-[#303030]`
- Text column `flex flex-col gap-[0.73vw]` (10.512px):
  - `h3` — At Aero, 24.048px (`1.67vw`), lh 30.06px, #F2F2F2
  - description — DM Mono, 13.968px (`0.97vw`), lh 1.3, uppercase, `rgb(169,169,169)` (#A9A9A9), `max-w-[24vw]`
- "VIEW PROJECT" sits `absolute top-0 right-0`, hidden at rest (hover only) — omitted from the static clone.

## Content (verbatim)
1. **Payy Network** — "Stablecoin payments that feel familiar, not foreign." — creative direction, visual identity, motion, web design — `Payy.webp`
2. **Gather AI** — "First telco run entirely on AI, powering hundreds of brands from one intelligent core" — creative direction, visual identity, website — `GatherAI.webp`
3. **Jurni AI** — "Jurni is an AI funnel engine that turns a prompt into a live, high-converting landing experience in minutes." — creative direction, visual identity, motion, website — `JurniAI.webp`
4. **Parker AI** — "Parker is an AI creative strategist that thinks, researches, and structures work like a senior partner. Clear briefs, sharp angles, and sourced notes inside Slack" — creative direction, visual identity, motion — `parkerAI.webp`
5. **Nolana AI** — "AI-native agentic OS for financial services operations" — creative direction, visual identity, motion, website — `NolanaAI.webp`

## Assets
`public/sites/intarcs-redesign/images/projects/{Payy,GatherAI,JurniAI,parkerAI,NolanaAI}.webp`

## Responsive
- **≥1024px:** the 12-column staggered grid above.
- **<1024px:** site switches to `grid-cols-8`, row gap `4.7vh`, paired cards `col-span-6`.
- **<640px:** every card full width, tag row hidden, info row stacks.

Clone: mobile-first single-column stack with px type sizes; `lg:` restores the staggered vw layout.

## Fonts
Site uses At Aero (licensed display) + DM Mono. The clone keeps the page's existing Hanken Grotesk + IBM Plex Mono so this section matches the hero already built above it.
