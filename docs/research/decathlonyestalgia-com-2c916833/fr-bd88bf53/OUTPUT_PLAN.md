# Output Plan — Decathlon Yestalgia (/fr/)

- **Source URL:** https://decathlonyestalgia.com/fr/
- **app-root:** `.` (existing combined multi-site Next.js app)
- **site-key:** `decathlonyestalgia-com-2c916833`
- **page-key:** `fr-bd88bf53`
- **Destination route:** `src/app/fr/page.tsx` → resolves at `/fr` (new, no collision)
- **Artifact root:** `docs/research/decathlonyestalgia-com-2c916833/fr-bd88bf53/`
- **Screenshot root:** `docs/design-references/decathlonyestalgia-com-2c916833/fr-bd88bf53/`
- **Component root:** `src/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/`
- **Asset root:** `public/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/`
- **Download script:** `scripts/download-assets-decathlonyestalgia-com-2c916833-fr-bd88bf53.mjs`

## Preserved existing work (untouched)
- `src/app/page.tsx` (AURA), `src/app/lumora-footer/page.tsx`
- `src/components/sites/indigo-laboratory-it-f84b5a72/`, `src/components/sites/lumora-studio/`
- `.indigo-site` tokens in globals.css

## Shared-foundation changes (additive, route-scoped)
- `src/app/layout.tsx`: add Roboto Flex `next/font` variable to `<html>` className (additive; does not change default font for other routes).
- `src/app/globals.css`: add a `.yestalgia-site` scoped token block + Swiper base CSS + Memphis keyframes. Existing `.indigo-site` block and scaffold tokens untouched. Lenis CSS already present.
- Metadata exported from `/fr/page.tsx` (route-scoped), not the root layout.

## Tech stack (matches target)
Next.js 16 + React 19 + Tailwind v4. Animation: **GSAP (ScrollTrigger + SplitText) + Lenis** (installed) + **Swiper** (to install). Font: **Roboto Flex** (variable).

## Palette (verbatim from compiled CSS)
- `--color-pink-100: #e9dae6` (light lavender — primary section bg)
- `--color-pink-200: #eaa0cd` (vibrant pink)
- `--color-beige: #f1f3ed`
- `--color-blue: #7ca8d2`
- `--color-green-200: #00966e`
- `--color-orange: #f09341`
- `--color-yellow-200: #d7dd44`
- `--color-grey-300: #222827`
- `--color-black: #000`, `--color-white: #fff`
- body background: `#f4f4f4`
