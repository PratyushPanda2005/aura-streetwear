"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { cn } from "@/lib/utils";

import {
  ARTISTS_SECTION,
  ARTWORKS,
  type Artwork,
} from "../ekchitra-redesign/data";
import { EXTENDED, GUTTER, LABEL, LabelLink, SANS } from "./shared";

/** Columns of the carousel: one tall card, then two short ones, and so on. */
const COLUMNS = ARTWORKS.reduce<Artwork[][]>((columns, item) => {
  const last = columns[columns.length - 1];
  const size = columns.length % 2 === 1 ? 1 : 2;
  if (last && last.length < size) last.push(item);
  else columns.push([item]);
  return columns;
}, []);

function Card({
  item,
  tall,
  eager,
}: {
  item: Artwork;
  tall: boolean;
  eager: boolean;
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-(--ek-ink)",
          tall ? "aspect-[417/596]" : "aspect-[417/232]",
        )}
      >
        <Image
          src={item.image}
          alt={`${item.title} by ${item.artist}`}
          fill
          sizes="(max-width: 1023px) 80vw, 30vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-x-4">
        <h3
          className={cn(
            "text-[20px] leading-[0.9] font-medium uppercase transition-colors duration-200 group-hover:text-(--ek-maroon) lg:text-[26px]",
            EXTENDED,
          )}
        >
          {item.artist}
        </h3>
        <p className="max-w-[45%] min-w-0 text-right [overflow-wrap:anywhere] uppercase">
          <span className="block text-[14px] leading-[18px] font-medium lg:text-[16px] lg:leading-[22px]">
            {item.title}
          </span>
          <span className="mt-1 block text-[13px] leading-[14px] text-[#777]">
            {item.medium}
          </span>
        </p>
      </div>
    </a>
  );
}

function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 12"
      aria-hidden="true"
      className={cn("h-3 w-5", flip && "-scale-x-100")}
    >
      <path
        d="M0 6h18M13 1l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/**
 * Artists: a heading row with a link in the centre and arrows on the right, over
 * a carousel that runs off the right edge. Columns alternate between one tall
 * card and two short ones; each card names the artist in the extended sans.
 */
export function Artists() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  return (
    <section
      id="artists"
      className={cn(
        "overflow-hidden bg-(--ek-paper) pt-[100px] text-(--ek-ink)",
        SANS,
        GUTTER,
      )}
    >
      <div className="relative flex items-center justify-between">
        <h2 className={LABEL}>{ARTISTS_SECTION.label}</h2>
        <LabelLink
          href={ARTISTS_SECTION.cta.href}
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {ARTISTS_SECTION.cta.label}
        </LabelLink>
        <div className="hidden gap-x-5 lg:flex">
          <button
            type="button"
            aria-label="Previous artists"
            disabled={edge.start}
            onClick={() => swiperRef.current?.slidePrev()}
            className="transition-opacity duration-200 disabled:opacity-30"
          >
            <ArrowIcon flip />
          </button>
          <button
            type="button"
            aria-label="Next artists"
            disabled={edge.end}
            onClick={() => swiperRef.current?.slideNext()}
            className="transition-opacity duration-200 disabled:opacity-30"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={1.15}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.25 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) =>
          setEdge({ start: swiper.isBeginning, end: swiper.isEnd })
        }
        onReachEnd={() => setEdge((value) => ({ ...value, end: true }))}
        className="mt-10 !overflow-visible"
      >
        {COLUMNS.map((column, index) => (
          <SwiperSlide key={column[0].artist}>
            <div className="space-y-6">
              {column.map((item) => (
                <Card
                  key={item.artist}
                  item={item}
                  tall={column.length === 1}
                  eager={index < 4}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
