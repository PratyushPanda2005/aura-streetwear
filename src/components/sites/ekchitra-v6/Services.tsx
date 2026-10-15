"use client";

import Image from "next/image";
import { type ComponentProps, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { Chars } from "../ekchitra-v5/Chars";
import { Diamonds } from "../ekchitra-v5/Diamonds";
import { CAPS, SANS, TITLE } from "../ekchitra-v5/shared";
import { SERVICE_LIST, SERVICES_INTRO } from "./data";
import { DistortedDots } from "./DistortedDots";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

/** Scroll each card holds still before the next one slides in, px. */
const HOLD_PX = 250;

/** A light diamond motif for each card, its own shape and tones. */
const MOTIFS: ComponentProps<typeof Diamonds>[] = [
  { shape: "steps", tint: "sky", className: "text-white/[0.14]" },
  { shape: "clusters", tint: "sky", className: "text-white/[0.14]" },
  { shape: "zigzag", tint: "maroon", className: "text-(--k-ink)/[0.12]" },
];

/**
 * Where each card settles: a little further right than the one before, so the
 * earlier cards keep a strip showing their number.
 */
const INSETS = ["left-0", "left-12 lg:left-[88px]", "left-24 lg:left-[176px]"];

/** Stacking order: each card arrives over the one before. */
const LAYERS = ["z-10", "z-20", "z-30"];

/**
 * 02 — What we do, after the chapter cards of stateofaidesign.com, stacking
 * sideways.
 *
 * After a short heading, the services are full-screen cards in the brand
 * colours — maroon, navy and sky — each with its picture printed
 * large behind it as a still field of dots, the grid bent into waves. The stack pins to the screen; each card holds for a
 * moment, then the next slides in from the right and settles over it, one by
 * one — each a strip further right. Every card keeps its number in a column
 * exactly that wide, so the stacked cards show just their numbers down the
 * left. Each card carries its number and name set large, a headline and a few
 * lines on the right, a picture in the lower left, and what it covers with a
 * white button in the lower right, with a light run of the diamond motif
 * against its right edge.
 */
export function Services() {
  const pin = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = 44 - el.getBoundingClientRect().top;
      const height = window.innerHeight - 44;
      cards.current.forEach((card, index) => {
        if (!card || index === 0) return;
        const start = HOLD_PX + (index - 1) * (HOLD_PX + height);
        const arrived = Math.min(1, Math.max(0, (scrolled - start) / height));
        card.style.transform = `translate3d(${((1 - arrived) * 100).toFixed(2)}%, 0, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="services"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index n={2} label="What we do" />
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text={SERVICES_INTRO.words.join(" ")} />
          </h2>
        </div>
      </div>

      {/* Scroll room: each card's hold and lift, then the last card's hold. */}
      <div ref={pin} className="relative h-[calc(3*(100svh-44px)+750px)]">
        <div className="sticky top-11 h-[calc(100svh-44px)] overflow-hidden">
          {SERVICE_LIST.map((service, index) => (
            <article
              key={service.title}
              ref={(node) => {
                cards.current[index] = node;
              }}
              className={cn(
                "absolute inset-y-0 right-0 flex will-change-transform",
                index > 0 && "[transform:translateX(100%)]",
                service.tone,
                INSETS[index],
                LAYERS[index],
              )}
            >
              <DistortedDots
                src={service.image.src}
                ink={service.dark ? "#ffffff" : "#191919"}
                invert={!service.dark}
                seed={index * 2.3}
                opacity={service.dark ? 0.16 : 0.13}
              />
              <Diamonds
                rows={22}
                side="right"
                tintEvery={7}
                tintOpacity={0.5}
                {...MOTIFS[index % MOTIFS.length]}
                className={cn(
                  "pointer-events-none absolute top-1/2 right-0 w-[56px] -translate-y-1/2 lg:w-[88px]",
                  MOTIFS[index % MOTIFS.length].className,
                )}
              />
              {/* The number, in a column exactly as wide as the strip each
                  later card leaves uncovered, so only the number shows. */}
              <p className="relative w-12 shrink-0 pt-[25px] pl-4 text-[22px] leading-none tracking-[-0.03em] tabular-nums lg:w-[88px] lg:pt-[34px] lg:pl-5 lg:text-[40px]">
                0{index + 1}
              </p>
              <div className="relative flex min-w-0 flex-1 flex-col justify-between gap-6 py-6 pr-4 lg:py-8 lg:pr-5">
                <div className="relative grid grid-cols-4 gap-x-4 gap-y-4 lg:grid-cols-12 lg:gap-x-5">
                  <h3 className="col-span-4 text-[44px] leading-[0.95] tracking-[-0.04em] lg:col-span-5 lg:text-[76px]">
                    {service.title}
                  </h3>
                  <div className="col-span-4 lg:col-span-4 lg:col-start-7">
                    <p className="text-[20px] leading-[1.15] tracking-[-0.02em] lg:text-[28px]">
                      {service.headline}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.5] opacity-80 lg:mt-5 lg:text-[15px]">
                      {service.body}
                    </p>
                  </div>
                </div>

                <div className="relative grid grid-cols-4 items-end gap-x-4 gap-y-5 lg:grid-cols-12 lg:gap-x-5">
                  <div className="relative col-span-4 h-[22svh] overflow-hidden lg:col-span-5 lg:h-[38svh]">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6 lg:col-start-7">
                    <p className={cn(CAPS, "text-[10px] opacity-70")}>
                      This covers:
                    </p>
                    <ul className="mt-3 space-y-1.5 text-[14px] lg:mt-4 lg:space-y-2 lg:text-[15px]">
                      {service.covers.map((item) => (
                        <li key={item} className="flex items-center gap-x-3">
                          <span
                            aria-hidden="true"
                            className="size-1.5 rotate-45 bg-current"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={service.cta.href}
                      {...(service.cta.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className={cn(
                        "mt-5 flex items-center justify-between px-4 py-3 text-[14px] transition-opacity hover:opacity-85 lg:mt-6",
                        service.dark
                          ? "bg-white text-(--k-ink)"
                          : "bg-(--k-ink) text-white",
                      )}
                    >
                      {service.cta.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
