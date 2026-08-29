# Page Topology — Decathlon Yestalgia (/fr/)

Scroll container: Lenis smooth scroll on `<html>`. Body bg `#f4f4f4`. Font Roboto Flex.
Total desktop height ≈ 16891px. All sections `position: relative` with ascending `z-index` (they overlap slightly, later sections sit above earlier via z-10..z-40).

Order (top → bottom):

1. **Nav** (`c-nav`) — FIXED, `z-100`, pointer-events none on wrapper. Menu pill (left), Decathlon logo center (yellow-green `#d7dd44`), lang `<select>` + "Boutique" pill (right). Mobile: hamburger + centered logo + lang; floating Boutique at 85svh. Static (no scroll shrink observed).

2. **Hero** (`c-hero`, `h-lvh lg:h-[200svh]`) — bg body gray. Centered 16:9 autoplay/muted/loop video (`hero-master-16-9.mp4`) inside a masked frame that scroll-reveals/grows; parallax Memphis decorations scattered (teal gradient triangle top-right, pink arch, orange dotted "satellite" ball, blue arch, yellow lightning). INTERACTION: scroll-driven video reveal + parallax. h1 is sr-only.

3. **Intro banner** (`section.bg-pink-100`) — big display tagline `À vos côtés<br>depuis 1976` (u-title-100, 14vw, split-text reveal). Palm-tree Rive loops + sunset gradient lines SVG bottom-right; floating spinning satellites (star, donut/pink, ball). Then `PLONGEZ AU COEUR DE / LA DÉCENNIE LA PLUS VIBRANTE QUI SOIT` tagline over the pink sunset + palm scene with two lifestyle images. INTERACTION: scroll-driven split-text + parallax.

4. **Product grid** (`section.c-products`, bg-pink-100) — masonry-ish grid of 13 product cards; some cards have 2 color-variant images that cross-fade; each shows name, price (e.g. "20 €"), links to decathlon.fr. Small color swatch dots. Reveal on scroll.

5. **Artist** (`section.c-artist`, bg-pink-100, py-48) — left: `salut, je suis <em>Dalkhafine</em> artiste basée à Montreal et Paris.` (u-title-200 5vw split-text). Right: dalkhafine artist image + boom.riv burst + bio paragraph (u-title-300). Orange sun circle + roller polaroid decorations.

6. **Family carousel** (`c-fancy-carousel`, h-hview) — "La famille Yestalgia" label + Swiper of family member 9:16 videos in retro TV/card frames (grands-parents, fille, fils, mère, père, roller...) with a giant scrolling name (`Les grands-parents` etc.) and Previous/Next chevron buttons. INTERACTION: Swiper drag/nav; giant title cycles per slide.

7. **OG2K** (`c-og2k`, bg-pink-200) — huge `og2k.svg` logo; 2-col grid: shoe images (OG2K-Replacment, Outline-White, shoe) + paragraph + og2kvisual-2 handheld visual; parallax layers; diagonal-line bg pattern. bg is vibrant pink `#eaa0cd`.

8. **Product index** (`c-footer-list`, bg-beige) — big uppercase list of all 13 product names `[01]..[13]`; hovering a name reveals its thumbnail + price. Pink checkerboard decorations.

9. **Footer** (`c-footer`, h-hview, bg-pink-200) — yestalgia wordmark image, checkerboard + Memphis shapes, nav links: Mentions légales, Crédits.

## Component plan (files under src/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/)
Shapes.tsx (Memphis SVG library) · SiteNav.tsx · HeroSection.tsx · IntroSection.tsx · ProductGrid.tsx · ArtistSection.tsx · FamilyCarousel.tsx · OG2KSection.tsx · ProductIndex.tsx · SiteFooter.tsx · SmoothScrollProvider.tsx (Lenis+GSAP) · data.ts (products/family) · anim.ts (SplitText helpers)
