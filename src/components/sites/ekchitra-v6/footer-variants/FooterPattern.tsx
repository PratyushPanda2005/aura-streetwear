import { cn } from "@/lib/utils";

import { FOOTER } from "../../ekchitra-redesign/data";
import { ABOUT_STORY } from "../../ekchitra-v5/about-data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CONTACT, SOCIAL, V6_HOME, V6_NAV } from "../data";

/** The two large ways on, each with a small square of the diamond motif. */
const BARS = [
  {
    label: "See what’s on",
    href: `${V6_HOME}/exhibitions`,
    bar: "bg-(--k-navy)",
    square: "bg-white",
    external: false,
  },
  {
    label: "Get in touch",
    href: CONTACT.href,
    bar: "bg-(--k-maroon)",
    square: "bg-(--k-sand)",
    external: true,
  },
];

/** A small-capitals label for a footer column. */
function Bracket({ children }: { children: React.ReactNode }) {
  return (
    <span className={cn(CAPS, "text-[11px] text-(--k-sand)/60")}>
      {children}
    </span>
  );
}

/** Four diamonds in a square, the motif's smallest unit, for the bar icons. */
function DiamondQuad() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
      {[
        [10, 5],
        [5, 10],
        [15, 10],
        [10, 15],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 4.5}L${x + 4.5} ${y}L${x} ${y + 4.5}L${x - 4.5} ${y}Z`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/** A footer link, lightening to sky blue on hover. */
const LINK = "transition-colors duration-300 hover:text-(--k-sky)";

/**
 * Footer, after the cell grid closing chandebootcamp.com, in EkChitra's own
 * colours, with the diamond motif as its one quiet accent: on brand black,
 * the footer is as tall as its content. At the top — the logo over a line about the
 * gallery at the left, and at the right every artist it represents running
 * on in capitals, slash after slash, each a link to their page. Two large bars then lead on
 * across the full width — what's on, and a conversation. In the bottom row a
 * single faint strip of diamonds rests on the foot at the left; at the right,
 * columns of social links and the site index, and a last line with the
 * copyright (the tagline is already in the description up top).
 */
export function FooterPattern() {
  return (
    <footer className={cn("flex flex-col bg-(--k-ink) text-(--k-sand)", SANS)}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* The logo and the gallery in a line. */}
        <div className="flex flex-col gap-y-6 px-4 pt-10 pb-12 lg:col-span-6 lg:px-5 lg:pt-12">
          <a
            href={V6_HOME}
            aria-label="EkChitra, home"
            className="block w-[220px] lg:w-[300px]"
          >
            <span className="block aspect-[526/118] bg-(--k-sand) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]" />
          </a>
          <p className="max-w-[440px] text-[16px] leading-[1.45] tracking-[-0.01em] text-(--k-sand)/75">
            {ABOUT_STORY.lead} {FOOTER.tagline}
          </p>
        </div>

        {/* The artists, slash after slash. */}
        <div className="px-4 pb-12 lg:col-span-6 lg:px-5 lg:pt-12">
          <Bracket>Artists at EkChitra</Bracket>
          <p className="mt-5 max-w-[620px] text-[17px] leading-[1.35] tracking-[-0.01em] uppercase lg:text-[19px]">
            {ARTISTS.map((artist, index) => (
              <span key={artist.id}>
                <a
                  href={artist.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {artist.name}
                </a>
                {index < ARTISTS.length - 1 && (
                  <span className="text-(--k-sand)/40"> / </span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* The two ways on, full width. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-12">
          {BARS.map((bar) => (
            <a
              key={bar.label}
              href={bar.href}
              {...(bar.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "group flex h-16 items-stretch text-white lg:h-[72px]",
                bar.bar,
              )}
            >
              <span
                className={cn(
                  "grid aspect-square place-items-center text-(--k-ink)",
                  bar.square,
                )}
              >
                <DiamondQuad />
              </span>
              <span className="flex flex-1 items-center justify-between px-5 text-[15px] tracking-[0.04em] uppercase">
                {bar.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* One faint strip of the diamond motif, resting on the foot at the left. */}
        <div className="relative hidden overflow-hidden lg:col-span-6 lg:block">
          <Diamonds
            rows={40}
            shape="steps"
            horizontal
            tint="maroon"
            tintEvery={7}
            tintOpacity={0.5}
            className="pointer-events-none absolute bottom-0 left-0 h-[72px] -scale-y-100 text-(--k-sand)/[0.12]"
          />
        </div>

        {/* Links, then the last line. */}
        <div className="flex flex-col lg:col-span-6">
          {/* Social links and the site index. */}
          <div className="grid grid-cols-1 flex-1 sm:grid-cols-2">
            <div className="flex flex-col gap-y-4 px-4 py-6 lg:px-5">
              <Bracket>Social</Bracket>
              <ul className="space-y-1.5 text-[14px]">
                {SOCIAL.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={LINK}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-4 px-4 py-6 lg:px-5">
              <div className="flex items-baseline justify-between gap-x-4">
                <Bracket>Site index</Bracket>
                <a
                  href="#top"
                  className={cn(
                    CAPS,
                    "text-[11px] text-(--k-sand)/60 transition-colors duration-300 hover:text-(--k-sand)",
                  )}
                >
                  Back to top ↑
                </a>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[14px]">
                <li>
                  <a href={V6_HOME} className={LINK}>
                    Home
                  </a>
                </li>
                {V6_NAV.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-5 sm:flex-row sm:items-end sm:justify-between lg:px-5">
            <Bracket>{FOOTER.copyright}. All rights reserved</Bracket>
          </div>
        </div>
      </div>
    </footer>
  );
}
