import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  EVENTS,
  EVENTS_SECTION,
  type GalleryEvent,
} from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { ArrowLink, BODY, GUTTER, H1, SANS, SERIF } from "./shared";

/** One exhibition: picture with a status chip, dates, title, credit and a link. */
function EventCard({
  event,
  featured = false,
}: {
  event: GalleryEvent;
  featured?: boolean;
}) {
  return (
    <article>
      <a
        href={event.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "group relative block overflow-hidden bg-(--v-night)",
          featured ? "aspect-[925/694]" : "aspect-[459/344]",
        )}
      >
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes={
              featured
                ? "(max-width: 1023px) 100vw, 66vw"
                : "(max-width: 1023px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span
            className={cn(
              SERIF,
              "absolute inset-0 flex items-center justify-center px-6 text-center text-[28px] leading-[1.1] text-white/80 lg:text-[34px]",
            )}
          >
            {EVENTS_SECTION.imagePlaceholder}
          </span>
        )}
        <span className="absolute top-2 left-2 flex h-8 items-center rounded-[4px] bg-black/45 px-4 text-[12px] tracking-[0.04em] text-white backdrop-blur-[10px]">
          {event.status}
        </span>
      </a>
      <p className="mt-6 text-[12px] leading-4 opacity-60">{event.dates}</p>
      <h3 className="mt-2 text-[24px] leading-7 tracking-[-0.02em]">
        {event.title}
      </h3>
      <p className={cn(BODY, "mt-2 opacity-60")}>
        {event.curator} · {event.venue}
      </p>
      <ArrowLink
        href={event.href}
        target="_blank"
        rel="noreferrer"
        className="mt-8"
      >
        Read more
      </ArrowLink>
    </article>
  );
}

/**
 * Events & announcements: a large heading on the left, a line and a link from
 * the middle of the page, then the current exhibition as a wide card beside the
 * upcoming one.
 */
export function Events() {
  const [featured, ...rest] = EVENTS;

  return (
    <section
      id="exhibitions"
      className={cn("pt-24 lg:pt-[190px]", GUTTER, SANS)}
    >
      <Reveal>
        <h2 className={H1}>
          Events &amp; <span className="block">announcements</span>
        </h2>
      </Reveal>
      <Reveal className="mt-10 lg:mt-12 lg:ml-[calc(50%+5px)]">
        <p className={cn(BODY, "max-w-[480px]")}>
          {EVENTS_SECTION.heading} at EkChitra, Hyderabad.
        </p>
        <ArrowLink
          href={EVENTS_SECTION.cta.href}
          target="_blank"
          rel="noreferrer"
          className="mt-12"
        >
          {EVENTS_SECTION.cta.label}
        </ArrowLink>
      </Reveal>

      <Reveal className="mt-16 lg:mt-[120px]">
        <div className="grid gap-x-2 gap-y-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventCard event={featured} featured />
          </div>
          {rest.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
