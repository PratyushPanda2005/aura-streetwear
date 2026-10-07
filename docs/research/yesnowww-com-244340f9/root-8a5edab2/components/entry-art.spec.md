# EntryArt Specification (original stand-in artwork)

## Overview
- **Target file:** `src/components/sites/yesnowww-com-244340f9/root-8a5edab2/art/EntryArt.tsx`
- **Interaction model:** static SVG art. All motion is applied from outside by the scroll rig.
- **Originality rule:** these are ORIGINAL illustrations for our own project. Do not open, fetch or
  imitate artwork from yesnowww.com / framerusercontent.com. Only the slot sizes below are fixed.

## Shared art rules
- Named exports, each `({ className }: { className?: string })` returning
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="…" className={className} aria-hidden="true" focusable="false">`.
- No `width`/`height` attributes, no `style` prop, no hooks, no `"use client"`, no external assets, no `any`.
- Flat fills only (no gradients/filters), black outlines `stroke="#000" strokeWidth={1}` on shapes.
- Palette only: hot pink `#FF37B4`, light pink `#FF8BBE`, yellow `#FAC209`, navy `#001482`,
  olive `#868B1D`, cream `#F4FFDE`, red `#FA3228`, purple `#AA73F5`, green `#3C6E32`,
  dark teal `#094F45`, brown `#AA593C`, orange `#FA5909`, blue `#0090C7`, royal `#2D45C7`,
  emerald `#009A6E`, off-white `#F5F4F1`, grey `#95AAB4`, black `#000`.
- 30–150 elements per SVG; generate repeated shapes with arrays + `.map` (stable keys).

## Components

### `CurtainPanelArt` — viewBox `0 0 749 900`, `preserveAspectRatio="xMaxYMin slice"`
The LEFT half of a stage curtain (the right half is produced by mirroring this component).
- Full-bleed drape: rect filling the viewBox, light pink.
- Valance: hot-pink band from y=0 down to a scalloped lower edge. 6–7 scallops across the width;
  scallop peaks (highest points, between scallops) around y≈165–235, bellies around y≈250–280.
  Outline the scalloped edge in a 1px dark-magenta line (`#000` at 0.35 opacity).
- 8-point yellow star at about (48, 80), outer radius ≈38, 1px black outline.
- Fold lines: 6–9 thin curved 1px strokes (`#000` at 0.35 opacity) hanging from the valance and
  long sweeping ones in the lower half (y 560–850).
- Center pole: a wavy yellow strip ≈18px wide running the full height along the RIGHT edge
  (x≈725–743), gently undulating, 1px black outline on both sides. Nothing may extend past x=749.

### `LampArt` — viewBox `0 0 262 403`
A street lantern on a post.
- Olive post ≈22px wide, centered at x=131, from y≈255 to 403.
- Yellow circular glow disc (r≈85, center ≈(131,150)) with 16–20 thin yellow spike rays.
- Lantern housing in front of the disc: cream trapezoid glass panel (wider at top), olive frame,
  olive roof with a small dark-green leaf crown.
- Inside the glass: a short grey candle with a hot-pink + orange flame.

### `FlyerLeftArt` — viewBox `0 0 280 290`
Original character: a **moth sprite** flying toward the right, both arms stretched to the right
edge with palms flat at x≈268–278 (it is pushing a pole that sits just outside the right edge).
- Body royal blue, orange striped scarf, simple friendly face in profile facing right, two antennae.
- Two large cream moth wings behind the shoulders with scalloped trailing edges and a purple
  eye-spot on each wing.
- Legs trailing down-left. Whole figure diagonal (head upper-right, feet lower-left).

### `FlyerRightArt` — viewBox `0 0 235 263`
Original character: a **hare sprite** flying toward the left, both paws stretched to the left
edge with palms flat at x≈2–12 (pushing the same pole from the other side).
- Body off-white with long ears swept back, small yellow crown, face in profile facing left.
- Two green leaf-shaped wings behind the shoulders with olive veins.
- Legs trailing down-right. Whole figure diagonal (head upper-left, feet lower-right).

## States & Behaviors
N/A inside the art. (Rig: curtain halves slide apart on scroll; flyers bob 0↔−20px on a 4s loop;
lamps sink and fade.)

## Text Content
None.

## Responsive Behavior
Art scales with its container; the rig sets container sizes (flyers 346px wide desktop, 250px mobile;
lamps 200×311 desktop, 140×218 mobile; curtain half = 52% of the stage width × 100% height).
