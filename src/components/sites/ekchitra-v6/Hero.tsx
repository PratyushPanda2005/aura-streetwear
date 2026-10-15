import { cn } from "@/lib/utils";

import { LOGO } from "../ekchitra-redesign/data";
import { Chars } from "../ekchitra-v5/Chars";
import { Diamonds } from "../ekchitra-v5/Diamonds";
import { CAPS, SANS, V5_ROUTES } from "../ekchitra-v5/shared";
import { HERO_ART, HERO_COPY } from "../ekchitra-v5/heroes/data";
import { EXHIBITIONS } from "./data";
import { Picture } from "./ui";

/**
 * TEMPORARY PLACEHOLDER — a visitor in front of a large painting (Unsplash,
 * free licence — unsplash.com/photos/vOKvkIf_4QI). Replace with an EkChitra
 * photograph.
 */
const GALLERY = {
  src: "/sites/ekchitra-redesign/placeholders/hero-grid-gallery-unsplash.jpg",
  alt: "A visitor looking at a large painting in a gallery",
};

/**
 * Hero, after aspensearch.com: a Swiss grid of cells filling the screen under
 * the top bar — the wordmark set huge in a white cell; an artwork and a
 * gallery photograph in full colour; and two information cells, one in black
 * with what the gallery is, one in white listing recent exhibitions over a
 * run of the diamond motif. Cells open in sequence on arrival.
 */
export function Hero() {
  const recent = EXHIBITIONS.slice(0, 4);

  return (
    <section
      id="top"
      className={cn(
        "grid h-[calc(100svh-44px)] min-h-[600px] grid-cols-2 grid-rows-[1fr_1fr] bg-white text-(--k-ink) lg:grid-cols-[1fr_1fr_0.62fr_0.62fr]",
        SANS,
      )}
    >
      <div className="ek5-rise relative col-span-2 flex items-end p-4 [--d:150ms] lg:p-5">
        <h1 className="sr-only">EkChitra — {HERO_COPY.statement}</h1>
        <span
          role="img"
          aria-label={LOGO.alt}
          className="block aspect-[526/118] w-[88%] max-w-[720px] bg-(--k-ink) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
        />
      </div>
      <Picture
        src={HERO_ART[0].src}
        alt={`${HERO_ART[0].title} by ${HERO_ART[0].artist}`}
        className="ek5-rise col-span-2 hidden [--d:300ms] lg:block"
      />
      <Picture
        src={GALLERY.src}
        alt={GALLERY.alt}
        position="object-[24%_80%]"
        className="ek5-rise col-span-2 [--d:450ms]"
      />
      <div className="ek5-rise hidden flex-col justify-between bg-(--k-ink) p-5 text-white [--d:600ms] lg:flex">
        <p className="text-[17px] leading-[1.3]">
          <Chars text={HERO_COPY.body} />
        </p>
        <a
          href={V5_ROUTES.about}
          className={cn(
            CAPS,
            "flex items-center justify-between text-[11px] text-white/80 hover:text-white",
          )}
        >
          About the gallery <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="ek5-rise relative hidden flex-col justify-between overflow-hidden bg-white p-5 [--d:750ms] lg:flex">
        <Diamonds
          rows={22}
          shape="steps"
          horizontal
          side="right"
          tint="maroon"
          tintEvery={7}
          tintOpacity={0.45}
          className="absolute right-0 bottom-0 h-[56px] -scale-y-100 text-(--k-ink)/[0.12]"
        />
        <p className="text-[17px] leading-[1.3]">
          Every exhibition begins with an idea. Recent shows:
        </p>
        <ul className="relative mb-16 space-y-1 text-[14px] text-(--k-ink)/70">
          {recent.map((show) => (
            <li key={show.title}>{show.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
