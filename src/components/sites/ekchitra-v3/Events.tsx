import Image from "next/image";

import { cn } from "@/lib/utils";

import { EVENTS, EVENTS_SECTION } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { Btn, GUTTER, HEADING, SANS, SERIF } from "./shared";

/**
 * Events & announcements as a list: each entry's text sits in the left half and
 * stays pinned under the header while its large image scrolls past in the right
 * half. An event without a poster gets a navy block carrying its title.
 */
export function Events() {
  return (
    <section
      id="exhibitions"
      className={cn("bg-(--ek-paper) pt-[100px] text-(--ek-ink)", SANS, GUTTER)}
    >
      <div className="flex items-end justify-between gap-x-6">
        <h2 className={HEADING}>{EVENTS_SECTION.label}</h2>
        <Btn
          variant="outline"
          href={EVENTS_SECTION.cta.href}
          target="_blank"
          rel="noreferrer"
          className="h-5 shrink-0 px-[6px]"
        >
          {EVENTS_SECTION.cta.label}
        </Btn>
      </div>

      <div className="mt-10 space-y-5">
        {EVENTS.map((event) => (
          <a
            key={event.title}
            href={event.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-y-4 lg:grid-cols-2 lg:gap-x-3"
          >
            <div className="grid grid-cols-2 gap-x-5 self-start lg:sticky lg:top-[100px]">
              <div>
                <p className="text-[16px] leading-4 font-medium transition-colors duration-200 group-hover:text-(--ek-maroon)">
                  {event.title}
                </p>
                <p
                  className={cn(
                    "mt-[2px] text-[16px] leading-[18px] tracking-[-0.3px]",
                    SERIF,
                  )}
                >
                  {event.curator}
                </p>
              </div>
              <div className="text-[12px] leading-[14px]">
                <p>
                  {event.status} · {event.venue}
                </p>
                <p className="mt-[2px]">{event.dates}</p>
              </div>
            </div>

            <Reveal>
              <div
                className={cn(
                  "relative flex aspect-[694/575] items-center justify-center overflow-hidden",
                  event.image ? "bg-(--ek-ink)/10" : "bg-(--ek-navy)",
                )}
              >
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={`${event.title} — exhibition poster`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <p
                    className={cn(
                      "px-6 text-center text-[40px] leading-none tracking-[-0.6px] text-(--ek-paper) lg:text-[64px]",
                      SERIF,
                    )}
                  >
                    {event.title}
                  </p>
                )}
              </div>
            </Reveal>
          </a>
        ))}
      </div>
    </section>
  );
}
