<div align="center">

# AURA — Streetwear, Built on Sound

**An immersive, scroll-driven experience for a streetwear label. Five drops, one movement.**

Not a store — a story. A full-screen runway film, five collections that unfold like chapters, WebGL imagery that warps as you scroll, and buttery smooth-scroll from top to bottom.

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `curtains.js` · `Lenis`

</div>

---

## ✦ Overview

AURA is a fictional modern streetwear label. The site is a single, cinematic long-scroll:

1. **Hero** — a looping runway film on black, with the season's five *drops* surfaced as an interactive index. Hover a drop and the background shifts to that collection.
2. **Intro — "Sound You Can Wear"** — the brand thesis: before the fit, there's a sound.
3. **The drops** — `Rhythm → Pulse → Whisper → Resonance → Sub-noise`. Each unfolds as its own chapter: editorial cover, lookbook, hero piece, the craft story behind it, and the full collection gallery, closing on a note from the founder.

The layout, motion system, and typography began as a reverse-engineered build and were fully rebranded into AURA — new voice, new drops, new photography, copyright-clean throughout.

## ✦ Features

- 🎬 **Cinematic hero** — autoplaying, muted, looping runway video with hover-to-preview collection covers
- 🌀 **WebGL image planes** — `curtains.js` shaders (plane-deformation, mouse-ripple, transition-ripple) that distort imagery on scroll and pointer movement, with a graceful plain-image fallback when WebGL is unavailable
- 🪶 **Smooth scroll** — `Lenis`-powered inertia scrolling
- 🎛️ **Adaptive header** — `mix-blend-mode: difference` so the nav inverts against whatever scrolls beneath it
- 📱 **Responsive** — mobile-first, with dedicated mobile video/poster crops
- ♿ **Resilient** — no runtime errors when WebGL or autoplay is blocked

## ✦ Tech Stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 (oklch tokens), `cn()` utility |
| WebGL | curtains.js 8 |
| Smooth scroll | Lenis |
| Fonts | Hanken Grotesk, IBM Plex Mono, Palette Mosaic (next/font) |
| Deploy | Vercel |

## ✦ Getting Started

```bash
npm install
npm run dev        # start the dev server → http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

## ✦ Project Structure

```
src/
  app/                     # routes, layout, global styles
  components/sites/…/
    root-8a5edab2/         # Hero, Intro, and the Tale* chapter sections
    shared/                # WebGLImage, CurtainsProvider, Lenis, icons, shaders
  lib/sites/…/content.ts   # all site copy + asset references (single source of truth)
  types/                   # IndigoSiteContent + curtains.js typings
public/sites/…/            # images, videos, posters, favicons
```

Editing copy or swapping products? It all lives in **`src/lib/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/content.ts`**.

## ✦ Assets & Licensing

AURA is a **fictional brand** created for demonstration. All media is free-license and cleared for commercial use:

- **Photography** — [Unsplash](https://unsplash.com/license)
- **Hero video** — [Pexels](https://www.pexels.com/license/) (cottonbro studio)

No trademarks, real people, or third-party product listings are referenced.

## ✦ License

MIT — see [`LICENSE`](./LICENSE).
