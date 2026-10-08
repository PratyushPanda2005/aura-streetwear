"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

import { ARTISTS_SECTION, ARTWORKS } from "./data";
import {
  Button,
  CarouselArrow,
  FONT,
  Heading,
  Label,
  Text,
} from "./design-system";

/**
 * Artists carousel: the active artist's name and work details sit centred above a
 * looping row of artworks. The centre slide is full size; its neighbours sit
 * smaller and lower on either side (Swiper creative effect).
 */
export function ArtistsSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);
  const artwork = ARTWORKS[active];

  return (
    <section
      id="artists"
      className={cn(
        "bg-(--ek-paper) pt-10 pb-14 text-(--ek-ink) lg:pt-12 lg:pb-[69px]",
        FONT.sans,
      )}
    >
      <Label as="h2" className="flex items-center justify-center gap-x-3">
        <span aria-hidden="true" className="size-2 bg-(--ek-navy)" />
        {ARTISTS_SECTION.label}
      </Label>

      {/* Active artist — updates with the carousel */}
      <div
        aria-live="polite"
        className="flex flex-col items-center gap-y-[11px] px-[17px] pt-8 pb-[34px] text-center lg:px-[69px]"
      >
        <Heading as="p" className="select-none">
          {artwork.artist}
        </Heading>
        <div className="pt-[6px]">
          <Text size="sm">{artwork.title}</Text>
          <Text size="sm">
            {artwork.medium} · {artwork.size}
          </Text>
        </div>
        <Button href={artwork.href} target="_blank" rel="noreferrer">
          {ARTISTS_SECTION.slideCta}
        </Button>
      </div>

      <div className="relative">
        <Swiper
          modules={[EffectCreative, Pagination]}
          effect="creative"
          creativeEffect={{
            limitProgress: 2,
            perspective: true,
            prev: { translate: ["-95%", "7.5%", 0], scale: 0.85 },
            next: { translate: ["95%", "7.5%", 0], scale: 0.85 },
          }}
          centeredSlides
          loop
          slidesPerView="auto"
          speed={300}
          slideToClickedSlide
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => setActive(swiper.realIndex)}
          className="!pb-[34px] [--swiper-pagination-bottom:0px] [--swiper-pagination-bullet-horizontal-gap:5.72px] [--swiper-pagination-bullet-inactive-color:#a4a4a4] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-bullet-size:5.72px] [--swiper-pagination-color:var(--ek-navy)]"
        >
          {ARTWORKS.map((item, index) => (
            <SwiperSlide key={item.image} className="!w-[80vw] lg:!w-[54vw]">
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden bg-(--ek-ink)",
                  index !== active && "cursor-pointer",
                )}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} by ${item.artist}`}
                  fill
                  sizes="(max-width: 1023px) 80vw, 54vw"
                  className="object-contain p-[5%]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows — vertically centred on the slide, desktop only */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[34px] z-10 hidden items-center justify-between px-[57px] lg:flex">
          <CarouselArrow
            direction="prev"
            aria-label="Previous artist"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <CarouselArrow
            direction="next"
            aria-label="Next artist"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button href={ARTISTS_SECTION.cta.href}>
          {ARTISTS_SECTION.cta.label}
        </Button>
      </div>
    </section>
  );
}
