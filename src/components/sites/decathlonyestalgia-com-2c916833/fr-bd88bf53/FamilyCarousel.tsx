"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { Shape } from "./Shapes";
import { family } from "./data";
import { cn } from "@/lib/utils";

export function FamilyCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section
      id="famille"
      className="relative z-10 flex h-svh min-h-[720px] flex-col items-center justify-center overflow-hidden bg-[var(--y-pink-100)]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      {/* label */}
      <span className="y-button absolute top-[16%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap lg:text-[15px]">
        The Yestalgia family
      </span>

      {/* decorations */}
      <Shape name="arch-blue" className="absolute top-[-6%] left-[8%] w-[22vw] max-w-[360px]" />
      <Shape name="lightning-yellow" className="absolute top-[46%] left-[6%] w-[7vw] max-w-[90px]" />
      <Shape name="tri-grad-sm" className="absolute top-[36%] right-[8%] w-[6vw] max-w-[90px]" />

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        slidesPerView="auto"
        centeredSlides
        loop
        grabCursor
        spaceBetween={40}
        className="!overflow-visible w-full"
      >
        {family.map((m, i) => (
          <SwiperSlide key={m.name} className="!w-[300px] lg:!w-[320px]">
            {({ isActive }) => (
              <div
                className={cn(
                  "relative aspect-[9/16] overflow-hidden rounded-md border-2 border-black bg-black shadow-[6px_6px_0_rgba(0,0,0,0.35)] transition-transform duration-500",
                  isActive ? "rotate-[-2deg] scale-100" : "rotate-[3deg] scale-90 opacity-90",
                )}
              >
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src={m.video}
                  autoPlay={i === active}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* giant member name + nav */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-20 flex items-center justify-center gap-4 px-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto shrink-0"
        >
          <Shape name="chevron-left" alt="Précédent" className="w-6 lg:w-8" />
        </button>
        <h2
          className="y-title text-center text-[13vw] leading-[0.8] text-black lg:text-[9vw]"
          style={{ WebkitTextStroke: "2px #fff", paintOrder: "stroke fill" }}
        >
          {family[active]?.name}
        </h2>
        <button
          type="button"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto shrink-0"
        >
          <Shape name="chevron-right" alt="Suivant" className="w-6 lg:w-8" />
        </button>
      </div>
    </section>
  );
}
