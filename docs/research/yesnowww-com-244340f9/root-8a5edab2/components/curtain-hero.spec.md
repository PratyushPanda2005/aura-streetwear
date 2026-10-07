# CurtainHero Specification (scroll rig)

## Overview
- **Target file:** `src/components/sites/yesnowww-com-244340f9/root-8a5edab2/CurtainHero.tsx`
- **Screenshots:** `docs/design-references/yesnowww-com-244340f9/root-8a5edab2/desktop-1440-y*.png`, `entry-*.png`, `hero-*.png`
- **Interaction model:** scroll-driven (scrubbed, linear) + two scroll-triggered timed tweens + time loops.
  No click or hover behavior.
- **Built by:** orchestrator (touches route foundation), not a dispatched builder.

## DOM Structure
```
section.relative.z-[4].h-[500vh]            (source: Curtain, 4500px = 5vh, z 4)
└─ div.sticky.top-0.h-screen.overflow-hidden (source: sticky stage)
   ├─ [hero]      absolute inset-0, z 1, bg rgb(0,20,130)
   │   ├─ backdrop, bush, sun, moons, stars
   │   ├─ [tree]  (wrapper centers, inner scales)
   │   ├─ [flag-l] [flag-r], emblem
   │   ├─ [standing-l/r] [seated-l/r] [cloud-l/r], fronds
   │   ├─ [hand-l/r]  (lg+ only)   [side-l/r] bloom + pillar (lg+ only)
   │   └─ HeroFrame (z 10: black mask, ticker bands, medallions)
   ├─ [meteor]    z 7, 3000×600 at left −3400 / top 198  └─ [ball] 414 wide at 2396,95
   ├─ [curtain-l] z 9, w 52%, right edge = center+6  └─ flyer (bob)
   ├─ [curtain-r] z 9, w 52%, left edge = center−6   └─ flyer (bob)
   └─ [lamp] ×2   z 10, bottom 0
```
Slot boxes: see `PAGE_TOPOLOGY.md` → "Stage slot map".

## States & Behaviors
One `gsap.timeline` scrubbed by a ScrollTrigger on the section (`start: "top top"`, `end: "bottom top"`).
Timeline time = scroll distance in viewport heights (0–5). Every tween `ease: "none"`.

| At (vh) | Dur | Target | To |
|---|---|---|---|
| 0 | 1 | curtain-l / curtain-r | x −856 / +856 |
| 0 | 1 | lamp ×2 | y 210, opacity 0 |
| 1 | 1 | curtain-l / curtain-r | x −1206 / +1206, opacity 0 |
| 1 | 1 | hand-l / hand-r | scale 1.4, x −170 / +170, y −115 (origin center) |
| 1 | 1 | standing-l / -r | x −110 / +110 |
| 1 | 1 | seated-l / -r | x −50 / +50 |
| 1.5 | 1 | flag-l / flag-r | scale 0.7 (origin 50% 0%), x −80 / +80 |
| 2 | 1 | tree | scale 1.4 (origin 50% 100%) |
| 2 | 1 | cloud-l / -r, side-l / -r | x −110 / +110 |
| 3 | 2 | side-l / -r | x −150 / +150, opacity 0 |
| 2.5 | 2 | meteor | from x 0, y −300, scale 1 → x 4200, y 0, scale 0.5; rotation 6° constant |

- **Ball spin:** ScrollTrigger at section top + 2.8vh. `onEnter` rotation 13° → 373°, 7s, linear.
  `onLeaveBack` resets to 13°.
- **Hero fade:** ScrollTrigger at section top + 4vh (where the stage unpins). `onEnter` hero opacity → 0
  in 0.3s; `onLeaveBack` → 1 in 0.3s.
- **Flyer bob:** y 0 ↔ −20, 2s each way, linear, yoyo, infinite, both in sync.
- **Smooth scroll:** Lenis (`lerp 0.1`, `smoothWheel`), ticked from `gsap.ticker`, forwarding
  `scroll` → `ScrollTrigger.update`.
- **Reduced motion:** Lenis and the bob loop are skipped; scroll-scrubbed tweens still run.

## Assets
Original stand-in SVG components only: `art/EntryArt.tsx`, `art/SceneArt.tsx`, `art/FigureArt.tsx`,
`HeroFrame.tsx`. No files downloaded from the source site.

## Text Content
`EmblemArt` placeholder props (`STUDIO NAME`, `CREATIVE STUDIO`, `MMXXVI`, `MAKE · BELIEVE · MAKE`).

## Responsive Behavior
- **Desktop (≥1024, `lg`):** slot map as measured at 1440×900.
- **Tablet / mobile:** hands and side groups hidden; lamps 140px at the edges; flyers 400 / 250px;
  emblem 468px; clouds 305px and pushed mostly off-screen; standing/seated figures pushed outward;
  tree keeps a 1126px minimum width.
- **Known deviation:** the source shortens the section to 4.4vh below desktop (0.7vh triggers);
  this rig keeps 5vh and the same vh-based timings at every width.
