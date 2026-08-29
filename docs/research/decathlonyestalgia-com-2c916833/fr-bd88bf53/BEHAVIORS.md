# Behaviors — Decathlon Yestalgia (/fr/)

## Libraries (from bundle)
GSAP + ScrollTrigger + SplitText + Observer, Lenis (smooth scroll), Swiper (family carousel), Rive (`palm_tree.riv`, `boom.riv` — substituted with static/CSS in clone).

## Global
- **Lenis** smooth scroll active (`html.lenis`). GSAP ScrollTrigger synced to Lenis.
- Body bg `#f4f4f4`; sections layered with rising z-index and slight negative margins so a lower section overlaps the one above at the seam.

## Signature: split-text display headings (`c-tagline`)
- Element opacity 0 → animates in when `top 95%`/`top 70%` enters viewport.
- Text split into words/chars. Each `.char` is 3D-transformed in (rotateX/translateY stagger reveal).
- **Each `.char` has a duplicated `<span>` positioned absolutely behind it in `--color-pink-200` (#eaa0cd)** → the offset colored "extrude/shadow" behind black letters. Signature look.
- Font: Roboto Flex, weight 535, `font-stretch: 33%` (wdth axis), line-height .85, uppercase (except artist lower-case tagline).

## Hero (scroll-driven)
- Video sits in a centered masked frame; as you scroll through the 200svh section the frame/mask grows and the visual translates y 0%→50% (parallax). Decorative shapes parallax at different rates. Reproduce: pin/scrub with ScrollTrigger scale+translate.

## Parallax decorations (`c-timeline`, `c-satellite`)
- `c-timeline` elements: `data-timeline-from`/`to` y translate driven by scroll progress (e.g. y 200%→-200%). Reproduce with ScrollTrigger scrub y-translate.
- `c-satellite` with `rot-speed` + `rounded`: continuously rotating shape (CSS spin animation).

## Reveals (`u-anim-simple`)
- opacity 0 → 1 over 1s ease when `top 95%` enters viewport (+ per-item `--delay`). Used on images/paragraphs.

## Product grid
- Cards reveal on scroll. Cards with 2 color variants cross-fade image on hover; color-swatch dots. Some "cards" are autoplay videos (jacket, short, og2k-green) instead of images.

## Family carousel (Swiper)
- Horizontal Swiper of family member 9:16 videos in retro card frames. Prev/Next chevrons. Big member name (split chars) changes per active slide. Drag enabled.

## Product index (`c-footer-list`)
- List of product names; hovering a row reveals a floating thumbnail + price near cursor/row. Rows are links to decathlon.fr.

## Responsive
- Desktop ≥1024px (`lg:`) multi-column; mobile stacks. Hero `h-lvh` mobile vs `200svh` desktop. Nav collapses to hamburger + floating Boutique at 85svh. Big type uses vw units so scales fluidly.
