import Image from "next/image";

import { HERO, NAV_LINKS } from "./data";

/** Entrance stagger, expressed as the `--d` custom property the reveal keyframes read. */
const NAV_DELAYS = ["[--d:0.06s]", "[--d:0.12s]", "[--d:0.18s]", "[--d:0.24s]"];
const HEADLINE_DELAYS = ["[--d:0s]", "[--d:0.09s]"];

/**
 * Desktop hero: a black band carrying the nav and the statement headline, sitting
 * directly on a full-bleed image band that stays clear of any type.
 *
 * Proportions follow the reference — the black band is ~40% of the viewport, the
 * visual takes the remaining ~60%. Below `lg` the two bands stack and every
 * absolutely placed label falls back into normal flow.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="intarcs-hero relative flex min-h-svh w-full flex-col bg-[#0a0a0a] text-white"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Black band — nav + statement                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col bg-[#0a0a0a] lg:h-[40svh] lg:min-h-[340px]">
        <header className="flex items-center justify-between px-6 pt-7 pb-4 md:px-10 lg:px-14 lg:pt-8">
          <a
            href="#top"
            className="intarcs-reveal text-[12px] font-medium tracking-[0.28em] text-white uppercase md:text-[15px] md:tracking-[0.42em]"
          >
            {HERO.wordmark}
          </a>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-2.5 md:gap-8 lg:gap-10">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`intarcs-reveal ${NAV_DELAYS[i]} font-mono text-[9px] tracking-[0.08em] text-white/70 uppercase transition-colors duration-300 hover:text-white md:text-[11px] md:tracking-[0.16em]`}
                  >
                    <span aria-hidden="true">[</span>
                    {link.label}
                    <span aria-hidden="true">]</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="flex flex-1 items-center px-6 pt-14 pb-16 md:px-10 lg:px-14 lg:pt-0 lg:pb-10">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h1 className="text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.06] font-light tracking-[-0.035em] text-white">
              {HERO.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span className={`intarcs-rise ${HEADLINE_DELAYS[i]} block`}>
                    {line}
                    {i === HERO.headline.length - 1 && (
                      <span className="align-super text-[0.34em] tracking-normal">
                        {HERO.headlineMark}
                      </span>
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="intarcs-reveal [--d:0.3s] max-w-[34ch] font-mono text-[11px] leading-[1.95] tracking-[0.02em] text-white/55 lg:max-w-[32ch] lg:shrink-0 lg:pb-2">
              {HERO.intro}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Visual band — the full-bleed image, kept clear of any type. It is  */}
      {/* taller than the space left below the fold so the picture carries   */}
      {/* on into the section that follows.                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="intarcs-visual relative min-h-[82svh] flex-1 lg:h-[95svh] lg:min-h-0 lg:flex-none">
        <Image
          src={HERO.image}
          alt="INTARCS Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
