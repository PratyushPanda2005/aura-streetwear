"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { cn } from "@/lib/utils";

import { ARTISTS_SECTION, ARTWORKS } from "../ekchitra-redesign/data";
import { TextLink, DISPLAY, SANS } from "./shared";

function LongArrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 24"
      aria-hidden="true"
      className={cn("h-6 w-10", flip && "-scale-x-100")}
    >
      <path
        d="M0 12h36M27 3l10 9-10 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
    </svg>
  );
}

/**
 * Artists: a coloured band with a centred heading, arrows at the top right and
 * a row of cards that runs off the right edge. Each card shows a work, its
 * medium in a filled tag, the artist's name and the work's title.
 */
export function ArtistsBand() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  return (
    <section
      id="artists"
      className={cn("bg-(--ek-sky) py-12 text-(--ek-ink) lg:py-[60px]", SANS)}
    >
      <div className="relative px-3 lg:px-10">
        <h2
          className={cn(
            "text-center text-[28px] leading-[1.2] lg:text-[32.4px]",
            DISPLAY,
          )}
        >
          {ARTISTS_SECTION.label}
        </h2>
        <div className="absolute top-1/2 right-10 hidden -translate-y-1/2 gap-x-4 lg:flex">
          <button
            type="button"
            aria-label="Previous artists"
            disabled={edge.start}
            onClick={() => swiperRef.current?.slidePrev()}
            className="transition-opacity duration-200 disabled:opacity-30"
          >
            <LongArrow flip />
          </button>
          <button
            type="button"
            aria-label="Next artists"
            disabled={edge.end}
            onClick={() => swiperRef.current?.slideNext()}
            className="transition-opacity duration-200 disabled:opacity-30"
          >
            <LongArrow />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        breakpoints={{ 1024: { spaceBetween: 40 } }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) =>
          setEdge({ start: swiper.isBeginning, end: swiper.isEnd })
        }
        onReachEnd={() => setEdge((value) => ({ ...value, end: true }))}
        className="mt-10 !px-3 lg:mt-[50px] lg:!px-10"
      >
        {ARTWORKS.map((item, index) => (
          <SwiperSlide
            key={item.artist}
            className="!w-[78vw] max-w-[420px] lg:!w-[420px]"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-(--ek-ink)">
                <Image
                  src={item.image}
                  alt={`${item.title} by ${item.artist}`}
                  fill
                  sizes="(max-width: 1023px) 78vw, 420px"
                  loading={index < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <span className="mt-[30px] inline-block bg-(--ek-ink) px-3 py-2 text-(--ek-paper) text-[16px] leading-[21px]">
                {item.medium}
              </span>
              <p className="mt-[10px] text-[16px] leading-[21px]">
                {item.size}
              </p>
              <h3 className={cn("mt-8 text-[28px] leading-none", DISPLAY)}>
                {item.artist}
              </h3>
              <p className="mt-[30px] text-[16px] leading-[21px]">
                {item.title}
              </p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 text-center lg:mt-[50px]">
        <TextLink href={ARTISTS_SECTION.cta.href}>
          {ARTISTS_SECTION.cta.label}
        </TextLink>
      </div>
    </section>
  );
}
