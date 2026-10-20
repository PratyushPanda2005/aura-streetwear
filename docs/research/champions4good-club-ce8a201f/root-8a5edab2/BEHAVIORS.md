# Behaviors — champions4good.club, section 2 ("Finally / No boring networking")

Source: https://www.champions4good.club/ (Webflow + custom bundle `champions4good.vercel.app/scripts/app.js`)
Scope: section 2 only (`.main-content > .breakpoint-section:nth-child(2)`), extracted 2026-10-18.

## Global
- **Smooth scroll:** Lenis `new Lenis({ lerp: 0.18, autoRaf: true })`. Not synced to ScrollTrigger; both read native scroll.
- **Body bg:** `#fbfbfb`. Preceding hero bg: `#23002b`. Next section bg: `#fbfbfb` (video section).
- **Sound:** off by default (sound toggle in nav). The volleyball/horse loops crossfade by scroll progress when sound is on. Not cloned.
- **Nav:** `.nav-purple-to-black` (IX2 `a-31`) recolors the site nav at the section boundary. Not cloned (nav is out of scope).

## Desktop (min-width: 992px). INTERACTION MODEL: scroll-driven (pinned) + click (stickers) + hover (cursor)
Wrapper `[data-volleyball]` = `.animation-section-wrap._400` (400vh) with a sticky 100vh child.

### A. Webflow IX2 `a-59` ("volleyball"), event `e-225` SCROLLING_IN_VIEW, smoothing 86
- Progress `p = clamp((vh - rect.top) / (vh + rect.height), 0, 1)` of the 400vh wrapper (startsEntering, not startsExiting).
- Smoothing: every rAF tick `pos += (p - pos) * max(1 - 0.86, 0.01)` → factor **0.14**.
- Keyframes (linear interpolation, hold first/last outside the range):

| % | target | value |
|---|--------|-------|
| 15 | volleyball Lottie | 0 |
| 44 | layer-2 (headline) opacity | 1 |
| 46 | layer-2 opacity | 0 |
| 50 | layer-3 (horse + "Sondern") opacity | 0 |
| 55 | horse Lottie | 0 |
| 60 | volleyball Lottie | 90 |
| 60 | layer-3 opacity | 1 |
| 85 | horse Lottie | 100 |

- Lottie value → `anim.setCurrentRawFrameValue(totalFrames * value / 100)`, `setSubframe(true)`, renderer svg, `preserveAspectRatio: "xMidYMid slice"`, `progressiveLoad: true`, `hideOnTransparent: true`.
- The volleyball Lottie paints the white→dark-green (`#002629`) wipe itself (ball grows into the background). The horse Lottie is transparent.
- At 1440×900: scroll 0 is p=0.2 when the section starts at y=900. So p% × 45 = scrollY.

### B. GSAP headline split (app.js, verbatim)
- `SplitText(el, { type: "chars, lines", tag: "span", charsClass: "split-char", linesClass: "split-line" })` on title + subline.
- Per line: `set(line,{display:"block"})`, `set(chars,{display:"inline-block",x:80,scaleY:.95,skewX:14,opacity:0})`
- `to(chars,{ keyframes:{"40%":{opacity:1},"90%":{x:0,scaleY:1},"100%":{skewX:0}}, duration:.3, ease:"expo.out", stagger:{each:.016,from:"start"}, scrollTrigger:{trigger:wrap, start, end, scrub:0} })`
  - Title "No boring / networking": start `"15% bottom"`, end `"40% top"`; onUpdate `progress >= .46` → set `data-sticker-active` on the sticker wrap, else remove it.
  - Subline "Finally": start `"12% bottom"`, end `"36% top"`.
- Layer-3 pointer-events: `none` until 48% of `top bottom → bottom top`, then `auto`.

### C. Stickers (click, while `data-sticker-active`)
- Init each `[data-sticker-item]`: `autoAlpha:0, transformPerspective:1000, rotationY: random([40,-40]), scale:1.35, x:0, y:0`.
- Click on the wrap: pick a random hidden sticker. Place its centre at the click point relative to the wrap, plus jitter of `random(-10,10)` on x and y and `rotation: random(-40,40)`. Then `zIndex = ++counter`.
- In: `to(s,{ keyframes:{"40%":{autoAlpha:1},"90%":{rotationY:0},"100%":{scale:1}}, transformPerspective:1000, duration:.4, ease:"expo.out", overwrite:true })`. Auto-hide after `delayedCall(3)`.
- Hide: `to(s,{ autoAlpha:0, rotationY: random(±40), scale:1.35, duration:.3, ease:"expo.out", overwrite:true })`.
- When the wrap loses `data-sticker-active`, all visible stickers hide.
- The wrap has `cursor:pointer; user-select:none`, and `[data-sticker]::before { inset:-1em }` widens the hit area.

### D. Sticker cursor ("CLICK!" badge), desktop only
- `position:fixed; top:0; left:0; z-index:1000; pointer-events:none`. The SVG is 48px wide.
- `set(cursor,{xPercent:15,yPercent:15})`, `set(item,{opacity:0,scale:.5})`. Follows the mouse with `quickTo x/y, ease "power4"`.
- mouseenter wrap: `item → opacity 1, scale 1, .35s expo.out, delay .1`. mouseleave: `opacity 0, scale .5, .35s expo.out`.
- mousedown: `scale .9, .15s power2.out`. mouseup: `scale 1, .95s elastic.out`.

## Mobile / tablet (max-width: 991px). INTERACTION MODEL: static + click (stickers)
- A separate `.vw-mobile` block. The 100vh section is `#fbfbfb`, with the text block top-aligned (padding `3rem 2rem 2rem`, or `3rem 1.5rem 2rem` at ≤479px).
- Horse mobile Lottie: autoplay + loop at the bottom. Width 100% (≤479px: `width:150%; margin-right:50%`).
- Sticker wrap is permanently `data-sticker-active` (green-1, green-2 only).
- Type: headline-xl 120px / lh .78em (≤479px: 72px / .8em). headline-s 48px / .85em (≤479px: 32px / .9em).
