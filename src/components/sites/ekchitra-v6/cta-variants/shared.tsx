import { cn } from "@/lib/utils";

import { SERVICES } from "../../ekchitra-redesign/data";
import { Chars } from "../../ekchitra-v5/Chars";
import { TITLE } from "../../ekchitra-v5/shared";
import { SERVICE_LIST, SERVICES_INTRO } from "../data";
import { GRID, HEAD } from "../styles";
import { Index } from "../ui";

/**
 * The two services the calls to action lead to, from the gallery's own copy:
 * who each is for, what it is, what it covers and where it leads.
 */
export const CTA_SERVICES = [
  {
    key: "bespoke",
    title: SERVICES[0].title,
    eyebrow: SERVICES[0].eyebrow,
    body: SERVICES[0].body,
    cta: SERVICES[0].cta,
    image: SERVICE_LIST[2].image,
    covers: SERVICE_LIST[2].covers,
  },
  {
    key: "advisory",
    title: SERVICES[1].title,
    eyebrow: SERVICES[1].eyebrow,
    body: SERVICES[1].body,
    cta: SERVICES[1].cta,
    image: SERVICE_LIST[1].image,
    covers: SERVICE_LIST[1].covers,
  },
];

/**
 * TEMPORARY PLACEHOLDERS (Unsplash, free licence) — replace with EkChitra
 * photographs:
 * - Bespoke sourcing: an abstract painting in a living room, by Virender
 *   Singh (unsplash.com/photos/GybmMi0QZV4).
 * - Art advisory: a visitor studying a painting in a museum, by Lucrezia
 *   Carnelos (unsplash.com/photos/aUtrOFDViw0).
 * `position` keeps the painting in view as frames change shape.
 */
export const CTA_PHOTOS: Record<
  string,
  { src: string; alt: string; position: string }
> = {
  bespoke: {
    src: "/sites/ekchitra-redesign/placeholders/cta-bespoke-unsplash-virender-singh.jpg",
    alt: "An abstract painting hung above a chair in a living room",
    position: "object-[30%_32%]",
  },
  advisory: {
    src: "/sites/ekchitra-redesign/placeholders/cta-advisory-unsplash-lucrezia-carnelos.jpg",
    alt: "A visitor standing before a painting in a gallery",
    position: "object-[50%_55%]",
  },
};

export const INTRO = {
  title: SERVICES_INTRO.words.join(" "),
  body: SERVICES_INTRO.body,
};

export const pad = (value: number) => String(value).padStart(2, "0");

/**
 * The section's index and heading, as every v6 section opens: "03 Services"
 * over the line, flush with the left margin.
 */
export function SectionHead({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(GRID, HEAD, className)}>
      <div className="col-span-4 lg:col-span-7">
        <Index n={3} label="Services" light={light} />
        <h2 className={cn(TITLE, "mt-2 lg:mt-3", light && "text-white")}>
          <Chars text={INTRO.title} />
        </h2>
      </div>
    </div>
  );
}

/**
 * v6's arrow: the same "→" every link and button uses, so arrows read alike
 * across the site. Size and motion come from the caller's classes.
 */
export function LineArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-block shrink-0", className)}>
      →
    </span>
  );
}
