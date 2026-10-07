# FigureArt Specification (original stand-in artwork)

## Overview
- **Target file:** `src/components/sites/yesnowww-com-244340f9/root-8a5edab2/art/FigureArt.tsx`
- **Interaction model:** static SVG art. All motion is applied from outside by the scroll rig.
- **Originality rule:** ORIGINAL illustrations for our own project. Do not open, fetch or imitate
  artwork, logos or wording from yesnowww.com / framerusercontent.com. Only slot sizes are fixed.

## Shared art rules
- Named exports returning
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="…" className={className} aria-hidden="true" focusable="false">`.
- Props are `{ className?: string }` unless stated. No `width`/`height` attributes, no `style` prop,
  no hooks, no `"use client"`, no external assets, no `any`.
- Flat fills only, black outlines `stroke="#000" strokeWidth={1}`.
- Palette only: hot pink `#FF37B4`, light pink `#FF8BBE`, yellow `#FAC209`, navy `#001482`,
  olive `#868B1D`, cream `#F4FFDE`, red `#FA3228`, purple `#AA73F5`, green `#3C6E32`,
  dark teal `#094F45`, brown `#AA593C`, orange `#FA5909`, blue `#0090C7`, royal `#2D45C7`,
  emerald `#009A6E`, off-white `#F5F4F1`, grey `#95AAB4`, black `#000`.
- Generate repeated shapes with arrays + `.map` (stable keys).
- "Right-side instance" = drawn for the right half of a symmetric scene; the rig mirrors it for the left.

## Components

### `EmblemArt` — viewBox `0 0 574 810`
Props: `{ className?: string; title?: string; subtitle?: string; year?: string; tagline?: string }`
with defaults `"STUDIO NAME"`, `"CREATIVE STUDIO"`, `"MMXXVI"`, `"MAKE · BELIEVE · MAKE"`.
The central crest, symmetric about x=287.
- Aura: 4 concentric scalloped/wavy blobs centered ≈(287, 330): hot pink (outermost, ≈520 wide),
  blue, yellow, orange (innermost).
- Top motif (y≈150–260): an original hourglass with a small crescent above it, purple + yellow.
- Plate (y≈270–400): off-white cartouche ≈360 wide with rounded notched ends. `title` centered at
  y≈345, black, `fontSize={56}` `fontWeight={700}` with class `[font-family:var(--font-yn-display)]`;
  `subtitle` at y≈385, `fontSize={18}` `letterSpacing={3}`.
- Year tab (y≈420–460): yellow pill with `year`, flanked by two orange discs each holding a 4-point sparkle.
- Lower motif (y≈520–660): two emerald koi fish circling each other, orange fins.
- Tagline ribbon (y≈690–740): yellow ribbon with folded ends, `tagline` centered, `fontSize={24}`,
  same font class.
- Base (y≈750–810): three purple cloud puffs.
All `<text>` uses `textAnchor="middle"`.

### `HandArt` — viewBox `0 0 550 463` (right-side instance)
A large open, cupped hand in light pink: wrist entering from the bottom-right, palm facing up-left,
four long fingers curving up toward the upper-left, thumb toward the top-right. Hot-pink long nails,
2–3 thin palm crease lines.

### `FlagArt` — viewBox `0 0 110 374`
Props: `{ className?: string; variant: "left" | "right" }`.
A vertical orange hanging banner with a slightly torn top edge and a swallowtail bottom, divided into
5 cells by thin cream lines, one cream line-glyph per cell (strokeWidth 1.5, no fill).
`left`: circle, triangle, zigzag, diamond, arrow-up. `right`: spiral, square, three dots, cross, arrow-down.

### `PillarArt` — viewBox `0 0 160 566` (right-side instance)
A tall lilac (purple) standing stone / monolith with a rounded top, sitting flush to the right edge:
carved cream spiral near the top, three small navy window slots, a hot-pink band, olive moss at the base.

### `BloomArt` — viewBox `0 0 270 435` (right-side instance)
A tall plant leaning left: big orange poppy bloom (6 round petals, navy center with yellow dots) at
upper-left (center ≈(95,95), r≈85), green curling stem down to the bottom-right, 4 long olive leaves,
one small hot-pink bud.

### `StandingFigureArt` — viewBox `0 0 302 427` (right-side instance)
Original character: a lantern-bearer facing left — long emerald hooded cloak, royal-blue tunic,
brown face in profile, holding a yellow lantern out to the left at about (40,170). Feet at y≈420.

### `SeatedFigureArt` — viewBox `0 0 304 238` (right-side instance)
Original character: a large orange tabby cat sitting, facing left, tail curled to the right,
blue ribbon collar, brown stripes, cream chest.

### `MeteorTrailArt` — viewBox `0 0 3000 600`
A comet flying to the right. Rounded head: hot-pink disc, center (2600,300), r≈285, with a 14px yellow rim.
Tail: 7–9 long tapered streaks from the head back to sharp tips between x=0 and x=1400, alternating
hot pink and cream, yellow outer streaks. A purple spiky impact burst (10–12 points) just right of the head (x 2880–3000).

### `MeteorBallArt` — viewBox `0 0 414 411`
A faceted gem ball: roughly circular (r≈195) polygon outline, purple base with 12–18 royal-blue and
blue triangular facets and a few cream highlight facets. Must read clearly as rotating when spun.

## States & Behaviors
N/A inside the art. (Rig: hands scale/spread, flags shrink, figures slide outward, comet sweeps
across at 6° while the ball spins once.)

## Text Content
Only the `EmblemArt` props defaults listed above (placeholders, intentionally not the source brand).

## Responsive Behavior
Art scales with its container; the rig sets container sizes.
