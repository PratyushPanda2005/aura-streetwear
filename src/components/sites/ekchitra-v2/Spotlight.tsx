import Image from "next/image";

import { cn } from "@/lib/utils";

import { EVENTS, EVENTS_SECTION } from "../ekchitra-redesign/data";
import { TextLink, DISPLAY, CtaLink, Pin, SANS } from "./shared";

/**
 * Events & announcements: a centred heading over full-width cards. Each card
 * carries its title very large on the image, with dates and venue beneath and
 * an action at the bottom right. An event without a poster becomes a colour block.
 */
export function Spotlight() {
  return (
    <section
      id="exhibitions"
      className={cn("bg-(--ek-paper) py-12 text-(--ek-ink) lg:py-[60px]", SANS)}
    >
      <h2
        className={cn(
          "text-center text-[28px] leading-[1.2] lg:text-[32.4px]",
          DISPLAY,
        )}
      >
        {EVENTS_SECTION.label}
      </h2>

      <div className="mt-10 space-y-5 px-3 lg:mt-[50px] lg:space-y-10 lg:px-10">
        {EVENTS.map((event) => (
          <article
            key={event.title}
            className={cn(
              "relative flex min-h-[520px] flex-col justify-end overflow-hidden text-(--ek-paper) lg:aspect-[1360/900] lg:min-h-0",
              event.image ? "bg-(--ek-ink)" : "bg-(--ek-navy)",
            )}
          >
            {event.image ? (
              <>
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 95vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent from-35% to-black/85 to-75%" />
              </>
            ) : null}

            <div className="relative px-6 pb-10 lg:px-20 lg:pb-[84px]">
              <p className="text-[15px] leading-6 lg:text-[16px]">
                {event.status}
              </p>
              <h3
                className={cn(
                  "mt-3 text-[clamp(44px,5.6vw,80px)] leading-none",
                  DISPLAY,
                )}
              >
                {event.title}
              </h3>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-6 lg:mt-[100px]">
                <div className="text-[15.84px] leading-[33px]">
                  <p>
                    {event.dates} · {event.curator}
                  </p>
                  <p className="flex items-center gap-x-1.5">
                    <Pin className="size-[18px]" />
                    {event.venue}
                  </p>
                </div>
                <CtaLink
                  variant="light"
                  href={event.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read More
                </CtaLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center lg:mt-[50px]">
        <TextLink
          href={EVENTS_SECTION.cta.href}
          target="_blank"
          rel="noreferrer"
        >
          {EVENTS_SECTION.cta.label}
        </TextLink>
      </div>
    </section>
  );
}
