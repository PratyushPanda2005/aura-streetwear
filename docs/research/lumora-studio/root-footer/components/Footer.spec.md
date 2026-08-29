# Lumora Footer Specification

Layout/interaction *structure* was studied from a public Webflow footer (a fluid,
`em`-based layout with an interactive ASCII wordmark). All brand-identifying
material has been replaced to avoid copyright/trademark issues:
- Studio name/wordmark → **Lumora / "LUMORA"** (rendered from live text, not vendored logotype art)
- Location, nav labels, social links, copyright → original Lumora content
- Licensed typeface (Neue Haas Grotesk) → **Space Grotesk (SIL OFL)** via next/font
- The wordmark is generated from the page font at runtime — no external logotype SVG is bundled.

## Overview
- **Target file:** `src/components/sites/lumora-studio/footer/Footer.tsx`
- **Interaction model:** static layout + one JS-driven interactive canvas (the big wordmark)

## Design tokens (from `:root`)
- `--color--neutral--light: white`
- `--color--neutral--dark: black`
- `--color--neutral--800: #ffffff29` (footer top border)
- `--color--neutral--1000: #ffffffa3` (secondary white text ~64%)
- Font: `"Neue Haas Grotesk Text Pro 55 Roman", Arial, sans-serif` (self-hosted TTF)
- Fluid base: `body { font-size: 0.833vw }`; overrides: `≤991px → 1.615vw`, `≤767px → 2.086vw`, `≤479px → 3.738vw`. All footer sizes are `em`, so they scale off this.

## DOM structure (verbatim classes)
```
footer.footer
  .padding-global            (padding: 0 2.5em; ≤767px → 0 1em)
    .container-large         (max-width: 114.979em; centered)
      .footer_component      (flex col; gap 2em; border-top 1px solid #ffffff29)
        .footer_logo         (w 100%; h 30em; ≤767px h 22.75em)  ← ASCII canvas
        .footer_content      (flex col; gap 4em)
          .footer_grid       (flex row; gap 36.063em; pad 1em 0)
            .footer_column.is--location  (w 22.417em; gap .688em)
              "Location" (text-size-regular, color: white)
              "Recife, Pernambuco <br> Brazil" (text-size-regular, color: #ffffffa3)
            .footer-col-list  (flex row; gap 6.875em)
              .footer_column  → Home / Work / Approach / About / Careers / Contact
              .footer_column  → Instagram / Behance / Linkedin
          .footer_grid.is-down (pad 1em 0)
            .footer_column.is--location → "© Revelatio 2026" (#ffffffa3)
            .footer-col-list.is-politica → "Privacy Notice" (#ffffffa3)
```

## Computed styles
- `.footer` — background: black
- `.footer_component` — display flex; flex-flow column; gap 2em; border-top 1px solid #ffffff29
- `.padding-global` — padding-left/right 2.5em (mobile ≤767px: 1em)
- `.container-large` — width 100%; max-width 114.979em; margin auto
- `.footer_logo` — width 100%; height 30em (≤767px: 22.75em); position relative; overflow hidden; cursor pointer
- `.footer_content` — flex column; gap 4em
- `.footer_grid` — flex row; gap 36.063em; align-items flex-start; padding 1em 0. (≤991px: flex-flow column, gap 2em). (≤767px override earlier: gap 5em)
- `.footer_grid.is-down` — (≤991px: flex-flow row; justify space-between). (≤767px: gap 2.5em)
- `.footer_column` — flex column; width 22.417em
- `.footer_column.is--location` — flex column; gap .688em; width 22.417em
- `.footer-col-list` — flex row; gap 6.875em (≤991px: justify space-between; width 100%). is-politica ≤991px width 22.417em; ≤767px justify flex-end/center
- `.text-size-regular` — font-size 1em; letter-spacing -.019em; line-height 1.5 (body)
- `.footer_link` — opacity .6; color white; letter-spacing -.04em; padding .6565em 0; font-size 1em; line-height 1.4; text-decoration none. `.is-top` padding-top 0; `.is-bot` padding-bottom 0.

## Behaviors
- **Footer links hover:** original has cursor interactions; base links sit at opacity .6. Clone: raise to opacity 1 on hover (transition .3s) — matches the site's link-brightening feel.
- **`.footer_logo` interactive wordmark (the marquee feature):** an HTML canvas renders the "REVELATIO" wordmark (desktop SVG) / symbol (mobile SVG) as ASCII characters (`01#@&A-Z`). Ported verbatim from `ascii-logo-footer.js`:
  - **Idle:** particles sit *near* their target grid cells, drifting subtly, occasionally scrambling their character.
  - **Hover (magnetic):** particles within `magneticRadius`(120)·dpr of the cursor are pushed away with force `t²·magneticStrength`(28); they spring back via `magneticReturn`(0.08). This is the hover effect the user specifically asked to preserve.
  - **Scroll reveal:** when the footer scrolls ≥80% into view, particles "fall" (gravity 0.70) then "form" the logo (cubic ease, formDuration 1100ms).
  - **Click:** idle→fall→form; formed→spread (scatter then reform).
  - Params (DEFAULT_PARAMS): idleMode 'near', jitterPx 140, sampleStep 14, fallDurationMs 1200, formDurationMs 1100, gravity 0.70, magneticStrength 28, magneticRadius 120, magneticReturn 0.08.
  - Canvas: dpr capped at 2; fontSize derived from sample step × display scale; font `Menlo, Monaco, "Courier New", monospace`; fill #fff; align left on desktop, center on mobile.

## Assets
- Font: Space Grotesk (SIL OFL) via `next/font/google`, exposed as `--font-brand`. No self-hosted licensed font.
- Wordmark: rendered from the string "LUMORA" onto an offscreen canvas at runtime, then sampled. No external logotype artwork.

## Text content (Lumora — original)
- Location / "Lisbon, Portugal" / "Europe"
- Nav: Home, Projects, Studio, Process, Careers, Contact
- Social: Instagram (instagram.com/lumora.studio), Dribbble (dribbble.com/lumorastudio), LinkedIn (linkedin.com/company/lumora-studio/)
- "© Lumora 2026"
- "Privacy Notice" (/privacy)

## Responsive
- **Desktop (>991px):** two footer_grid rows are horizontal; huge 36.063em gap between location block and link lists; logo 30em tall.
- **Tablet (≤991px):** footer_grid stacks to column (gap 2em); link list spreads full width space-between; is-down stays row.
- **Mobile (≤767px):** padding-global 1em; logo 22.75em; base font 2.086vw; is-politica aligns right.
