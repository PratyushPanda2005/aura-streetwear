"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

import { EVENTS, EVENTS_SECTION } from "./data";
import {
  Button,
  CarouselArrow,
  FONT,
  Heading,
  Label,
  Text,
} from "./design-system";

/**
 * Events & announcements: a centred row of 4:3 exhibition cards. The card in
 * focus sits in the middle with the next one peeking in from the side; title,
 * dates and venue sit centred beneath each image.
 */
export function EventsSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [edge, setEdge] = useState({ start: true, end: EVENTS.length <= 1 });

  return (
    <section
      id="exhibitions"
      className={cn(
        "bg-(--ek-paper) pb-14 text-(--ek-ink) lg:pb-[69px]",
        FONT.sans,
      )}
    >
      <div className="px-[17px] py-[34px] text-center lg:px-[69px]">
        <Label
          as="h2"
          className="flex items-center justify-center gap-x-3 py-[11px]"
        >
          <span aria-hidden="true" className="size-2 bg-(--ek-red)" />
          {EVENTS_SECTION.label}
        </Label>
        <Heading as="p">{EVENTS_SECTION.heading}</Heading>
      </div>

      <div className="relative">
        <Swiper
          modules={[Pagination]}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={24}
          breakpoints={{ 1024: { spaceBetween: 46 } }}
          speed={300}
          slideToClickedSlide
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) =>
            setEdge({ start: swiper.isBeginning, end: swiper.isEnd })
          }
          className="!pb-[34px] [--swiper-pagination-bottom:0px] [--swiper-pagination-bullet-horizontal-gap:5.72px] [--swiper-pagination-bullet-inactive-color:#a4a4a4] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-bullet-size:5.72px] [--swiper-pagination-color:var(--ek-red)]"
        >
          {EVENTS.map((event) => (
            <SwiperSlide key={event.title} className="!w-[80vw] lg:!w-[48.4vw]">
              <a
                href={event.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="relative mb-[11px] flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#e8e8e8]">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={`${event.title} — exhibition poster`}
                      fill
                      sizes="(max-width: 1023px) 80vw, 48.4vw"
                      className="object-cover"
                    />
                  ) : (
                    <Text size="sm" className="text-[#767676] uppercase">
                      {EVENTS_SECTION.imagePlaceholder}
                    </Text>
                  )}
                </div>
                <div className="grid gap-y-[6px] text-center lg:gap-y-[11px]">
                  <Text
                    size="sm"
                    className="flex items-center justify-center gap-x-2 text-(--ek-maroon) uppercase"
                  >
                    <span
                      aria-hidden="true"
                      className="size-[6px] rounded-full bg-(--ek-red)"
                    />
                    {event.status}
                  </Text>
                  <Heading
                    as="h3"
                    size="sm"
                    className="transition-colors duration-150 ease-in-out group-hover:text-(--ek-maroon)"
                  >
                    {event.title}
                  </Heading>
                  <div>
                    <Text size="sm">{event.dates}</Text>
                    <Text size="sm">{event.curator}</Text>
                    <Text size="sm">{event.venue}</Text>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows — centred on the image, desktop only */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[36.3vw] items-center justify-between px-[23px] lg:flex">
          <CarouselArrow
            direction="prev"
            aria-label="Previous event"
            disabled={edge.start}
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <CarouselArrow
            direction="next"
            aria-label="Next event"
            disabled={edge.end}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button href={EVENTS_SECTION.cta.href} target="_blank" rel="noreferrer">
          {EVENTS_SECTION.cta.label}
        </Button>
      </div>
    </section>
  );
}
