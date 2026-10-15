import Image from "next/image";

import { cn } from "@/lib/utils";

import { EVENTS, EVENTS_SECTION } from "../ekchitra-redesign/data";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { InView } from "./InView";
import {
  BODY,
  CAPS,
  DISPLAY,
  EYEBROW,
  GUTTER,
  SANS,
  TITLE,
  V5_ROUTES,
} from "./shared";

const number = (index: number) => `(${String(index + 1).padStart(2, "0")})`;

/**
 * Events & announcements: a heading row with a "view all" link, then a clean
 * two-column grid, one exhibition per column. Each column is a picture with the
 * exhibition's status in the corner, and its number, title, dates and curator
 * underneath. An exhibition without a picture yet gets a dark red panel carrying
 * its title instead.
 */
export function Exhibitions() {
  return (
    <section
      id="exhibitions"
      className={cn(
        "scroll-mt-[60px] lg:scroll-mt-[68px] pb-24 lg:pb-[100px]",
        GUTTER,
        SANS,
      )}
    >
      <div className="flex items-end justify-between gap-x-6">
        <div>
          <p className={EYEBROW}>
            <Chars text={EVENTS_SECTION.label} />
          </p>
          <h2 className={cn(TITLE, "mt-2")}>
            <Chars text={EVENTS_SECTION.heading} />
          </h2>
        </div>
        <CapsLink arrow href={V5_ROUTES.exhibitions} className="mb-1 shrink-0">
          {EVENTS_SECTION.cta.label}
        </CapsLink>
      </div>

      <ul className="mt-6 grid gap-x-5 gap-y-12 lg:grid-cols-2">
        {EVENTS.map((event, index) => (
          <li key={event.title}>
            <InView delay={index * 140}>
              <a
                href={event.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <span className="ek5-wipe relative block aspect-[4/3] overflow-hidden bg-(--k-maroon)">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span
                      className={cn(
                        DISPLAY,
                        "absolute inset-x-5 bottom-5 text-[13vw] leading-[0.95] tracking-[-0.05em] text-white lg:inset-x-8 lg:bottom-7 lg:text-[6.4vw]",
                      )}
                    >
                      {event.title}
                    </span>
                  )}
                  <span
                    className={cn(
                      CAPS,
                      "absolute top-4 left-4 bg-white px-3 py-2 text-(--k-ink)",
                    )}
                  >
                    {event.status}
                  </span>
                </span>

                <span className="mt-4 grid grid-cols-[auto_1fr] gap-x-4">
                  <span className="pt-[7px] text-[12px] leading-4">
                    {number(index)}
                  </span>
                  <span>
                    <span
                      className={cn(
                        DISPLAY,
                        "block text-[24px] leading-[1.2] transition-colors duration-300 group-hover:text-(--k-maroon) lg:text-[28px]",
                      )}
                    >
                      <Chars text={event.title} />
                    </span>
                    <span className={cn(BODY, "mt-2 block")}>
                      {event.dates}
                    </span>
                    <span className={cn(BODY, "block opacity-60")}>
                      {event.curator} · {event.venue}
                    </span>
                  </span>
                </span>
              </a>
            </InView>
          </li>
        ))}
      </ul>
    </section>
  );
}
