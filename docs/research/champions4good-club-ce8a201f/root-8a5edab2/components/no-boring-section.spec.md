# NoBoringSection Specification

## Overview
- **Target files:** `src/components/sites/champions4good-club-ce8a201f/root-8a5edab2/NoBoringSection.tsx` (+ `StickerCursor.tsx`, `useLottie` helpers in the same folder). Styles go in `src/app/champions4good/c4g.css`, scoped under `.c4g`.
- **Screenshots:** `docs/design-references/champions4good-club-ce8a201f/root-8a5edab2/s2-scroll-{450,900,1300,1700,2000,2300,2600,3000,3500}.png`, `s2-mobile-390.png`
- **Interaction model:** scroll-driven pinned scene (desktop) + click-to-drop stickers + hover cursor. Static + stickers on mobile. Full timing is in `BEHAVIORS.md` A–D.

## DOM structure (desktop)
```
section[data-volleyball-sound]
  .vw-desktop (flex col center, ≥992 only)
    .anim-wrap[data-volleyball]           height 400vh
      .anim-div                            position sticky; top 0; height 100vh
        .layer-div                         relative; 100%×100%; overflow hidden
          .layer-1 (relative, 100%)        → .lottie (100%×100%) volleyball
          .layer-2 (abs inset 0, z2, flex center)
            .wrapper                       100%×100%, padding 12rem 2rem 2rem, flex col center
              .content                     flex col; justify-end; align-start; height 100%; width 100%
                .sticker-wrap[data-sticker] relative; flex col; align-start; cursor pointer
                  .align-to-headline (ml .2rem) > .headline-s "Finally" (text-align center)
                  .subline (mt .5rem) > .max-w (45rem) > h2.headline-xl left "No boring<br>networking"
                  img.sticker ×7 (abs top/left 0, pointer-events none, height auto)
          .layer-3 (abs inset 0, z3, opacity 0, pointer-events none)
            .align (flex col; justify-end; align-start; 100%)
              .lottie horse (width 100%, height 100%)
              .padding (padding 0 2rem 2rem; relative; flex col center; width 100%)
                .subline (mt 3rem; width 100%)
                  .grid (12 × 1fr, gap 1rem, place-items end center, width 100%)
                    div col 1/7 (flex col, align-start, width 100%) > h2.headline-xl left green "Sondern"
                    div col 9/13 (≥1920: 10/13) .headline-s left green (copy)
```

## Computed styles (1440×900)
- headline-xl: Druk Condensed Super Desktop, `font-size: clamp(7rem, 10.5vw, 11.25rem)` (151.2px), weight 500, `line-height: .78em` (117.936px), uppercase, color `#121212`. "Sondern" uses `#94ffe4`.
- headline-s: same family, `clamp(2rem, 3vw, 3rem)` (43.2px), `line-height: .85em`, `letter-spacing: .2px`, uppercase, weight 500, `#121212` (`#94ffe4` in layer-3).
- Title block rect: x 32, bottom at 868 (32px from the stage bottom). "Finally" 74×37, title 435×236.
- Sticker widths: purple-1 11.625rem, purple-2 10rem, purple-3 8.125rem, green-1 7.1875rem, green-2 8.125rem, yellow-1 10.8125rem, yellow-2 8.125rem.
- layer-3 grid row: top 1650 (abs), "Sondern" 307×118; copy column x 960, width 448.
- Grid: `grid-template-columns: repeat(12, 1fr); gap: 1rem`.

## States & behaviors
See `BEHAVIORS.md` sections A (IX2 keyframes + 0.14 smoothing), B (SplitText scrub), C (stickers), D (cursor). All values are verbatim from source.

## Assets
- `/sites/champions4good-club-ce8a201f/root-8a5edab2/lottie/volleyball-desktop.json` (1728×1117, 29.97fps, op 242.66)
- `/sites/.../lottie/horse.json` (1728×935, op 61.23) and `horse-mobile.json` (loop)
- `/sites/.../stickers/{purple-1,purple-2,purple-3,green-1,green-2,yellow-1,yellow-2}.svg`
- Cursor "CLICK!" SVG (viewBox 0 0 39 23): inline.

## Text content (verbatim)
- "Finally"
- "No boring" / "networking"
- "Sondern"
- "Sportliche Events, echte Begegnungen und neue Chancen fuer alle Mitglieder. In einer familiaeren Atmosphaere."
- Mobile title: "No Boring" / "Networking"

## Responsive behavior
- **≥992px:** pinned 400vh scene above.
- **≤991px:** `.vw-desktop` hidden and `.vw-mobile` shown (100vh, `#fbfbfb`). Wrapper padding `3rem 2rem 2rem`. Content is top-aligned: "Finally" / title (mt .5rem) / copy `<p>` (mt 1rem). Horse mobile Lottie loops at the bottom. Type is xl 120px, s 48px.
- **≤479px:** padding `3rem 1.5rem 2rem`, xl 72px/.8em, s 32px/.9em, title mt .1rem, horse width 150% + margin-right 50%. Sticker widths at ≤991: green-1 5rem, green-2 5.25rem.
