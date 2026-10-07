# SceneArt + HeroFrame Specification (original stand-in artwork)

## Overview
- **Target files:**
  - `src/components/sites/yesnowww-com-244340f9/root-8a5edab2/art/SceneArt.tsx`
  - `src/components/sites/yesnowww-com-244340f9/root-8a5edab2/HeroFrame.tsx`
- **Interaction model:** SceneArt is static SVG. HeroFrame has time-driven CSS loops only.
- **Originality rule:** ORIGINAL illustrations for our own project. Do not open, fetch or imitate
  artwork from yesnowww.com / framerusercontent.com. Only slot sizes and frame geometry are fixed.

## Shared art rules
- Named exports, each `({ className }: { className?: string })` returning
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="…" className={className} aria-hidden="true" focusable="false">`.
- No `width`/`height` attributes, no `style` prop, no hooks, no `"use client"`, no external assets, no `any`.
- Flat fills only, black outlines `stroke="#000" strokeWidth={1}`.
- Palette only: hot pink `#FF37B4`, light pink `#FF8BBE`, yellow `#FAC209`, navy `#001482`,
  olive `#868B1D`, cream `#F4FFDE`, red `#FA3228`, purple `#AA73F5`, green `#3C6E32`,
  dark teal `#094F45`, brown `#AA593C`, orange `#FA5909`, blue `#0090C7`, royal `#2D45C7`,
  emerald `#009A6E`, off-white `#F5F4F1`, grey `#95AAB4`, black `#000`.
- Generate repeated shapes with arrays + `.map` (stable keys). Compositions are left/right symmetric.

## SceneArt components
| Export | viewBox | Content |
|---|---|---|
| `BackdropArt` | `0 0 1440 800`, `preserveAspectRatio="xMidYMid slice"` | Navy night field. Faint grid of 1px royal-blue lines every 60px (opacity .5). 14–20 black organic blob shapes scattered symmetrically. |
| `TreeArt` | `0 0 1410 451` | Foliage canopy hanging from the top edge on both sides: dark-teal cloud-like leaf clusters on brown branches growing in from the upper corners. Keep the top-center gap x 560–850 empty. Dense near the top, sparse below y≈300. |
| `BushArt` | `0 0 1325 200`, `preserveAspectRatio="none"` | Low shrubs and grass mounds along the bottom edge, green + olive + dark teal, taller toward the outer sides, low in the center. |
| `CloudArt` | `0 0 470 97` | One stylised hot-pink cloud band made of 5–7 curled lobes with an inner spiral line in each. |
| `FrondArt` | `0 0 171 171` | Fan of 6–8 sharp blue blades radiating from the top-left corner toward the bottom-right. |
| `SunArt` | `0 0 76 76` | 8-point yellow star-sun, alternating long/short points, small orange core. |
| `MoonArt` | `0 0 36 36` | Off-white crescent opening to the right. |
| `StarArt` | `0 0 20 28` | Off-white 4-point sparkle, taller than wide. |

## HeroFrame component
`export function HeroFrame({ className }: { className?: string })` — a `div` (`pointer-events-none absolute inset-0`)
drawn with Tailwind + small inline SVGs. It sits on top of the hero scene and masks everything outside the frame in black.
May be a server component (no hooks needed).

Geometry (px offsets from the stage edges; must work at any stage size):
- **Black mask:** top strip 0–39px, bottom strip 0–39px, left strip 0–14px, right strip 0–14px (`bg-black`).
- **Bands (21px thick):** top band at top 39px, bottom band at bottom 39px, both from left 80px to right 80px;
  left band at left 14px, right band at right 14px, both from top 133px to bottom 133px.
  Each band = 2px yellow line on both long edges + a 17px ticker row between them.
- **Corner fill:** between the horizontal and vertical bands the frame steps (band at 39px inset vs 14px inset).
  Fill the L-shaped corner regions outside the window with black so no scene shows outside the bands,
  and join the bands with 2px yellow step lines.
- **Ticker row:** repeating 17×17 tiles alternating hot pink / emerald / royal blue squares with 1px black
  gaps. The row is ≥ 2 tiles longer than its band and animates with the Tailwind class
  `animate-[yn-ticker_1.2s_linear_infinite]` (keyframes `yn-ticker`: translateX 0 → −17px, provided by the route CSS).
  Top and right bands add `[animation-direction:reverse]`. Vertical bands are a horizontal row rotated 90°.
- **Corner medallions (4):** 124px circles centered 79px from each corner (`size-[124px]`; below `md`: 72px, centered 46px).
  Navy fill, 2px yellow outer outline, an inner ring of the same ticker tiles laid on a circle that rotates with
  `animate-[yn-spin_10s_linear_infinite]` (keyframes `yn-spin`: rotate 0 → 360deg, provided by the route CSS).
  Each holds one ORIGINAL 44px glyph (inline SVG, palette colours): top-left key, top-right leaf sprig,
  bottom-left wave, bottom-right comet. Glyphs get `animate-pulse`.

## States & Behaviors
- Ticker: 17px per 1.2s linear infinite. Rings: 360° per 10s linear infinite. No hover/click.

## Text Content
None.

## Responsive Behavior
- **Desktop (1440):** geometry above.
- **Tablet / mobile:** identical offsets; only the medallions shrink below 768px (`md`).
