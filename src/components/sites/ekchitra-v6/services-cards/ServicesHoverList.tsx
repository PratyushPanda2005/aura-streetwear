"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { GRID } from "../styles";
import {
  CTA_PHOTOS,
  CTA_SERVICES,
  Covers,
  LineArrow,
  MUTED,
  pad,
} from "./shared";

/** The floating picture's size (px) and how quickly it catches the pointer. */
const CARD = { w: 260, h: 330 };
const FOLLOW = 0.14;

/**
 * 03 — Hover list: the two services as huge rows ruled across the grid —
 * number and audience in columns 1–3, the name in 4–11, an arrow in 12.
 * On desktop a picture of the service floats behind the names in the
 * right-hand part of the row, easing after the pointer and crossfading
 * between rows, while the row under it opens to show its line and what it
 * covers. On a phone (or for reduced motion) the rows are
 * open and the picture sits in the row.
 */
export function ServicesHoverList() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Ease the floating card towards the pointer, one frame at a time.
  useEffect(() => {
    const el = root.current;
    const floating = card.current;
    if (!el || !floating) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      floating.style.transform = `translate3d(${pos.x - CARD.w / 2}px, ${pos.y - CARD.h / 2}px, 0)`;
      frame =
        Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };
    // Keep the card right of the details column; hide it where there's no room.
    const aim = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const details = el.querySelector<HTMLElement>("[data-details]");
      const detailsRight = details
        ? details.getBoundingClientRect().right - rect.left
        : rect.width * 0.72;
      const minX = detailsRight + 24 + CARD.w / 2;
      const maxX = rect.width - CARD.w / 2 - 20;
      floating.style.visibility = minX > maxX ? "hidden" : "";
      target.x = Math.min(Math.max(event.clientX - rect.left, minX), maxX);
      target.y = event.clientY - rect.top;
    };
    const onMove = (event: PointerEvent) => {
      aim(event);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onEnter = (event: PointerEvent) => {
      aim(event);
      pos.x = target.x;
      pos.y = target.y;
      tick();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <div ref={root} onMouseLeave={() => setActive(null)} className="relative">
        {/* The floating picture (desktop only), behind the rows so the names read over it. */}
        <div
          ref={card}
          aria-hidden="true"
          className={cn(
            // Size matches CARD.
            "pointer-events-none absolute top-0 left-0 z-0 hidden h-[330px] w-[260px] overflow-hidden transition-opacity duration-500 lg:block motion-reduce:lg:hidden",
            active === null ? "opacity-0" : "opacity-100",
          )}
        >
          {CTA_SERVICES.map((service, index) => {
            const photo = CTA_PHOTOS[service.key];
            return (
              <Image
                key={service.key}
                src={photo.src}
                alt=""
                fill
                sizes={`${CARD.w}px`}
                className={cn(
                  "object-cover transition-[opacity,scale] duration-700",
                  EASE,
                  photo.position,
                  active === index
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-0",
                )}
              />
            );
          })}
        </div>

        {CTA_SERVICES.map((service, index) => {
          const open = active === index;
          const photo = CTA_PHOTOS[service.key];
          return (
            <InView
              key={service.key}
              delay={index * 140}
              className="relative z-[1]"
            >
              <div className="px-4 lg:px-5">
                <div className="ek6-line h-px bg-(--k-ink)" />
              </div>
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className={cn(
                  GRID,
                  "group items-start gap-y-4 py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--k-ink) lg:py-8",
                )}
              >
                <div className="ek6-rise col-span-4 flex items-baseline gap-x-3 lg:col-span-3 lg:pt-4">
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className={cn(CAPS, "text-[11px]", MUTED)}>
                    {service.eyebrow}
                  </span>
                </div>
                <div className="ek6-rise col-span-4 lg:col-span-8">
                  <h3
                    className={cn(
                      "text-[48px] leading-[0.95] tracking-[-0.045em] transition-transform duration-700 lg:text-[7vw] lg:group-hover:translate-x-4",
                      EASE,
                    )}
                  >
                    {service.title}
                  </h3>
                  {/* Details: open on a phone, opening with the row on desktop. */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 lg:grid-rows-[0fr] lg:opacity-0",
                      EASE,
                      open && "lg:grid-rows-[1fr] lg:opacity-100",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="relative mt-5 aspect-[4/3] overflow-hidden lg:hidden">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="100vw"
                          className={cn("object-cover", photo.position)}
                        />
                      </div>
                      <div
                        data-details=""
                        className="grid max-w-[640px] gap-5 pt-6 sm:grid-cols-2 lg:max-w-[560px] 2xl:max-w-[640px]"
                      >
                        <p className="text-[16px] leading-[1.45]">
                          {service.body}
                        </p>
                        <div>
                          <Covers items={service.covers} />
                          <p className="mt-5 text-[15px]">
                            {service.cta.label} →
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 hidden justify-end pt-6 lg:flex">
                  <LineArrow
                    className={cn(
                      "transition-transform duration-500 group-hover:translate-x-1.5",
                      EASE,
                    )}
                  />
                </div>
              </a>
            </InView>
          );
        })}
        <div className="px-4 lg:px-5">
          <div className="h-px bg-(--k-ink)" />
        </div>
      </div>
    </section>
  );
}
