# HeroSection Specification — bleibtgleich.dev

## Overview
- **Source URL:** https://bleibtgleich.dev/ (hero only)
- **Destination route:** `/bleibtgleich` (root `/` is occupied by a prior clone)
- **Target files:**
  - `src/components/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/HeroSection.tsx`
  - `src/components/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/RippleReveal.tsx`
  - `src/app/bleibtgleich/page.tsx`
- **Interaction model:** scroll-static, pointer-driven WebGL effect + CSS hover.
- **Scope (per user):** single 100vh section, the water-splash ripple reveal, nothing more.

## Signature effect — water-splash ripple reveal
The original uses a full-viewport `<canvas class="fluid-canvas">` (z-index 3) inside
`.reveal-block`, layered over orbiting project-cover tiles (`.orbit-tiles__list`,
continuously rotating). Libraries on the live site: GSAP 3.15 (SplitText, MorphSVG,
Draggable, Inertia, CustomEase), Lenis, **Three.js 0.128** (the fluid sim), Barba,
socket.io (live cursors).

Recreated with a self-contained Three.js (0.170) **ping-pong damped-wave simulation**:
- Two HalfFloat render targets store `(height, prevHeight)`; each frame applies the
  discrete wave equation `new = (L+R+U+D)/2 - prev`, damped by `0.945`.
- Pointer movement injects an aspect-corrected splat along the `prevMouse→mouse`
  segment (force scales with cursor speed → faster swipe = bigger splash).
- Display pass: height gradient forms a surface normal that displaces the
  cover-fit UVs (`0.07`), reveals imagery via `smoothstep(0.06, 0.32, energy)`, and
  adds a specular water sheen. At rest → energy 0 → pure white.
- Revealed imagery: the four downloaded project covers cross-fade on a timer
  (`uTime * 0.16`) to read like a looping background video.
- Honors `prefers-reduced-motion` (stronger damping).

## Layout (settled, desktop 1440)
- Background: `#ffffff`, text `#000000`.
- Font: Akzidenz Grotesk Pro on the original (licensed) → `"Helvetica Neue", Arial`
  fallback here, weight 500, tight tracking (`-0.045em` on the display heading).
- Top-left: blob logo (extracted SVG path, viewBox `0 0 95 160`) + divider +
  `Based in Kyiv` / `Working w/ TFTL`.
- Top-right: `Menu` pill (black bg, white text).
- Centre: `Maksym` / `Bleibtgleich` display heading, `clamp(48px, 8.5vw, 118px)`,
  line-height 0.88; subline `Designer & Developer — UX/UI & Web-flow dev.`
- Bottom: faint `bleibt` / `gleich` words + `(move your cursor)` hint.

## Hover behaviors
- **Water reveal:** any pointer motion over the section (window listener) drives the sim.
- **Letter-roll (SplitText replica):** `Menu` and `TFTL` — each char is a two-copy
  stacked column inside an `overflow:clip` box; on hover the column translates
  `-50%` (duration 500ms, `cubic-bezier(0.65,0,0.35,1)`, 22ms per-char stagger).

## Assets
- `public/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/{velor-app,bleibtgleich-25,grabl-app,do-lorem-ipsum}.avif`

## Responsive
- Single 100vh at every width; heading uses `clamp()`; logo/label shrink on mobile.
- Verified at 1440 and 390.

## Known gaps / deviations
- Not the original's Navier–Stokes fluid dye sim; a wave-equation reveal that
  matches the perceived "water splash reveals the background" behavior.
- Original orbiting/draggable tiles, Lenis smooth scroll, Barba transitions, live
  socket cursors, and MorphSVG logo animation are out of scope (hero-only request).
- Akzidenz Grotesk Pro is licensed and not embedded; Helvetica/Arial fallback used.
