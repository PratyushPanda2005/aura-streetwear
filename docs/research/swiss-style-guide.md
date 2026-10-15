# Swiss Style — principles for EkChitra v6

Source: [Swiss Web Design: Guide to Clean, Minimal Sites 2026](https://www.pixeldarts.com/post/swiss-style-web-design-a-comprehensive-guide) (PixelDarts, Sep 2025).
Applies to the homepage at `/ekchitra-v6`. The hero stays as it is; everything below it is reworked section by section.

---

## 1. The idea

- **Communication, not decoration.** Swiss Style (the International Typographic Style — Müller-Brockmann, Hofmann, 1940s–50s) asks for design that is timeless, functional and universal rather than "pretty".
- **Less is better.** It is a philosophy, not a trend: every element has a job, and anything that doesn't serve the main message goes.
- **The grid is the unsung hero.** An interlocking system of columns organises pictures, text and buttons so the page feels effortless to read — even when the layout is asymmetrical, the grid keeps it from becoming chaos.

## 2. Why it works

- **Organisation** — grids and clean type make navigation and content easy to digest, and project a precise, reliable brand.
- **Concise message** — minimal clutter makes the message memorable, which suits short online attention spans.
- **Recognition** — consistency (same grid, same type, same few components everywhere) builds a trusted, recognisable identity.

## 3. Characteristics

| Principle | What it means on the page |
|---|---|
| Geometric minimalism | Pure lines and simple forms. No ornament that isn't doing work. |
| Modular grid | A fixed column grid (here 12 columns) that every block snaps to. |
| Sans-serif type | One clean sans (DM Sans) — legibility first. |
| Asymmetrical balance | Weight sits off-centre on purpose to lead the eye from strong elements to quieter ones. |
| Photography | Bold, impactful images as the visual element, shown as they are. |

## 4. Typography

- Type should let the **text speak** — clean, readable, never fighting the content.
- Keep to **one family**, and build hierarchy with a **few sizes**, weight and spacing — not with many styles.
- Flush left, ragged right. Large, confident headings; small, calm captions.

**v6 scale (and nothing else):**

| Role | Size | Use |
|---|---|---|
| Display | 72–148px, uppercase, tight | One word or line per section |
| Title | 30 / 44px | Lead statements, section headings |
| Body | 16px | Paragraphs |
| Caption | 10–11px spaced capitals | Labels, indexes, metadata |

## 5. Asymmetrical composition

- Asymmetry is a **guide for the eye**, not disorder: strong → subdued.
- **No visual noise** — every element has a function.
- **Whitespace is active**, not empty: it gives the page its professional calm and points at the key content.

## 6. Common mistakes to avoid

1. **Ignoring responsive design** — the grid must scale and rearrange from phone to desktop.
2. **Overusing typography** — at most two or three styles; hierarchy from size, weight, spacing.
3. **Sterile, boring minimalism** — Swiss can be expressive: strong contrast, simple geometric shapes (our diamond motif), bold photographs.
4. **Too little whitespace** — crowded layouts read as cluttered.

## 7. Working method — ask of every section

1. **What is the primary message?** Remove everything that isn't serving it.
2. **Could it be simpler?** Let it breathe; use whitespace.
3. **Is it balanced?** Align every element to the grid.

## 8. Implementation notes

- Build layouts with **CSS Grid** on a modular column system.
- Make the grid **responsive** with breakpoints (4 columns on phones, 12 on desktop).
- References in the guide: Apple (whitespace + product focus), Medium (type + strict modular grid), IKEA (clear type, big images, grid catalogue).

---

## The v6 system

- **Grid:** 12 columns, 20px gutters, 20px page margins (4 columns / 16px on phones). Every block starts and ends on a column line.
- **Index column:** columns 1–3 of every section carry the section number (`01`, `02`…) and its label — the same place, every time, so the page reads like a well-set document.
- **Content:** columns 4–12, flush left.
- **Colour:** white ground, black type and black blocks; pictures in full colour; the diamond motif is the only accent, and it stays light.
- **Rhythm:** the same top/bottom spacing for every section; whitespace is part of the layout.

## Audit — sections below the hero

| # | Section | What's wrong (by the principles) | Plan |
|---|---|---|---|
| 01 | About | Label stranded far left of the text; black block + photo and the text below don't share a grid; two competing focal points. | Index column + display line + lead/body set on the 12-column grid; one strong photograph across the content columns. |
| 02 | In numbers | Staggered empty cells read as random, not modular; figures sit at different sizes with no shared baseline. | Three figures on one row of equal modules, same size, aligned baselines, captions underneath. |
| 03 | What we do | A tall black column dominates; long empty services; too heavy. | White ground, numbered services as a clean three-column module with the display line in the content columns. |
| 04 | Artists | Close, but the giant word, intro and list don't align to shared columns. | Keep the hover index; align word, intro, list and picture to the 12-column grid. |
| 05 | Exhibitions | Four unequal cells; the quote mark has no job. | Index column + large title + poster + details in a clear modular row; remove the decorative quote. |
| 06 | Curator | Works, but its grid differs from the rest. | Re-set on the same index/content columns. |
| 07 | Conversation + Footer | Footer columns don't follow the content grid. | Align to the 12-column grid. |

Sections are rebuilt one at a time, starting with **01 About**.
