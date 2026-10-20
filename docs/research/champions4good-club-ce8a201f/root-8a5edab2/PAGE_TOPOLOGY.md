# Page topology — champions4good.club `/` (section 2 clone only)

Destination route: `/champions4good` → `src/app/champions4good/page.tsx`

| # | Source section | Clone | Interaction |
|---|----------------|-------|-------------|
| 1 | Hero "Your network of game changers" (100vh, `#23002b`) | 100vh stand-in, same bg, aria-hidden | — |
| 2 | **"Finally / No boring networking"** (400vh pinned) | `NoBoringSection` | scroll-driven (IX2 + GSAP), click stickers, hover cursor |
| 3 | Video section (`#fbfbfb`) | 100vh stand-in | — |

Layering inside section 2 (sticky 100vh stage):
- layer-1 (relative): volleyball Lottie, full-bleed, `xMidYMid slice`
- layer-2 (abs, z2): "Finally" + "No boring networking" + sticker wrap, bottom-left
- layer-3 (abs, z3): horse Lottie + "Sondern" grid + copy
- fixed z1000: sticker cursor

Assets: `public/sites/champions4good-club-ce8a201f/root-8a5edab2/{lottie,stickers}/`. Downloader: `scripts/download-assets-champions4good-club-ce8a201f-root-8a5edab2.mjs`.
Font: Druk Condensed Super Desktop is commercial, so it isn't redistributed. League Gothic (Google Fonts) stands in, with Druk first in the stack.
