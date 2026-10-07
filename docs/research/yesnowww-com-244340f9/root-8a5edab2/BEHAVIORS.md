# yesnowww.com — Entry + Hero behaviors

Source: https://yesnowww.com/ (Framer, Lenis smooth scroll — `<html class="lenis">`).
Scope requested: entry (curtain) section + hero section only. Measured at 1440×900.
All scroll values are page scrollY in px; at 1440×900 one viewport (vh) = 900px.

## Structure
- `Curtain` section: 4500px tall (5vh). Contains a `position: sticky; top: 0` stage (100vh)
  followed by three empty trigger blocks: `CurtainOpen_Trigger` (900), `Trigger-fade` (900),
  `Spacer_start` (1800). Stage stays pinned 0 → 3600, then scrolls away.
- Stage layers (z-index): hero "Animated" layer (1, bg rgb(0,20,130)) < meteor strip (7)
  < curtain halves Left/Right (9) < lamps (10).
- Fixed particles canvas (z 2, opacity .8) sits *behind* the curtain section (z 4); it is only
  visible after the hero layer fades.

## Scroll-driven (all linear, no easing, scrubbed 1:1 with scroll)
| Scroll px | vh | Element | From → To |
|---|---|---|---|
| 0 → 900 | 0–1 | Curtain Left / Right | x +6 → −850 / −6 → +850 |
| 0 → 900 | 0–1 | Lamps (both) | y 0 → 210, opacity 1 → 0 |
| 900 → 1800 | 1–2 | Curtain Left / Right | x ∓850 → ∓1200, opacity 1 → 0 |
| 900 → 1800 | 1–2 | Hands | scale 1 → 1.4, x ±170 outward, y 0 → −115 (origin center) |
| 900 → 1800 | 1–2 | Standing figures | x ±110 outward |
| 900 → 1800 | 1–2 | Seated figures | x ±50 outward |
| 1350 → 2250 | 1.5–2.5 | Flags | scale 1 → 0.7 (origin top center), x ±80 outward |
| 1800 → 2700 | 2–3 | Tree canopy | scale 1 → 1.4 (origin bottom center) |
| 1800 → 2700 | 2–3 | Clouds | x ±110 outward |
| 1800 → 2700 | 2–3 | Side heads (+flowers) | x ±110 outward |
| 2700 → 4500 | 3–5 | Side heads | x ±110 → ±150, opacity 1 → 0 |
| 2250 → 4050 | 2.5–4.5 | Meteor strip | x 0 → 4200, y −300 → 0, scale 1 → 0.5, rotate 6° constant (origin center) |

Static in the hero (no scroll transform): frame, backdrop, bush, emblem, stars, moons, sun, fronds.

## Scroll-triggered, time-based
- **Meteor ball spin** — fires once when scroll passes ≈2520px: rotate 13° → 373° linear over ≈7s
  (≈52°/s). Resets to 13° when finished / scrolled back.
- **Hero fade** — at 3600px (stage unpins, `Hero Fade` trigger) the whole hero layer opacity
  1 → 0 over ≈0.3s; reverses when scrolling back above 3600.

## Time-driven loops (independent of scroll)
- Curtain flyers (devil / angel slots): y 0 ↔ −20px, linear yoyo, 2s each way (4s period), in sync.
- Frame tickers: pattern translates one 17px tile per ≈1.2s, linear, infinite; adjacent strips
  run in opposite directions.
- Corner medallion rings: rotate 360° per ≈10s, linear, infinite.
- 5 Lottie players (4 corner glyphs + sun), loop + autoplay.
- No SMIL / CSS animation inside the illustration SVGs themselves.

## Click / hover
None inside the entry or hero. (Fixed menu button only appears at 4500px — out of scope.)

## Responsive
| | 1440 | 768 | 390 |
|---|---|---|---|
| Section height | 5vh | 4.4vh (triggers 0.7vh, 0.7vh, 2vh) | 4.4vh |
| Curtain half width | 52% | 52% | 52% |
| Flyer size | 346 wide | 400 wide | 250 wide |
| Lamps | 200×311, 80px from edge | 140×218, 0 from edge | 140×218, 0 from edge |
| Hands, side heads | visible | hidden | hidden |
| Emblem | 600×850 | 468×663 | 468×663 (overflows) |
| Tree | viewport−32 wide | ≥1126 wide, centered | 1126 wide, centered |
| Flags | 110×377 | 71×244 | 61×210 |
| Clouds | 544×115 | 305×66 | 305×66 |
Curtain travel distances and meteor size/travel are the same absolute px at every width.

## Clone decisions
- Route `/yesnowww` (root `/` is occupied by an existing clone).
- Illustrations are **original stand-ins** drawn for this project in the same slots; the source
  artwork, logo, Lottie files and curtain PNG were not downloaded.
- Motion is rebuilt with GSAP ScrollTrigger + Lenis using the table above.
