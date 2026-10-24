"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import {
  CTA_PHOTOS,
  CTA_SERVICES,
  MUTED,
  pad,
  SCREEN,
  TEXT_LINK,
  type Service,
} from "./shared";

/** The peeking photograph's size (px), and how quickly it catches the pointer. */
const PEEK = { w: 240, h: 160 };
const FOLLOW = 0.12;

/**
 * A table row that, on desktop, shows a small photograph of its service
 * under the pointer while it is hovered. The photograph eases smoothly after
 * the pointer with no hard edge — it may drift past the row's hairlines — and
 * fades out once the pointer leaves the row. For reduced motion it simply
 * appears where the pointer entered.
 */
function PeekRow({
  service,
  className,
  children,
}: {
  service: Service;
  className?: string;
  children: ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = row.current;
    const card = peek.current;
    if (!el || !card) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;

    const place = () => {
      card.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      place();
      frame =
        Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };
    // Centre the photo on the pointer; nothing clips it.
    const aim = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = event.clientX - rect.left - PEEK.w / 2;
      target.y = event.clientY - rect.top - PEEK.h / 2;
    };
    const onEnter = (event: PointerEvent) => {
      aim(event);
      pos.x = target.x;
      pos.y = target.y;
      place();
    };
    const onMove = (event: PointerEvent) => {
      if (reduce) return;
      aim(event);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  const photo = CTA_PHOTOS[service.key];
  return (
    <div
      ref={row}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      className={cn("relative", className)}
    >
      {children}
      <div
        ref={peek}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 hidden h-[160px] w-[240px] lg:block",
        )}
      >
        {/* Size matches PEEK; it fades and scales in on hover. */}
        <div
          className={cn(
            "relative h-full w-full overflow-hidden transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
            on ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="240px"
            className={cn("object-cover", photo.position)}
          />
        </div>
      </div>
    </div>
  );
}

/** Shared column layout for the header and every row. */
const COLS = "grid grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-5";

/**
 * 02 — Table: no pictures, the two services as rows of a ruled spec sheet on
 * the grid — number, name, who it's for, what it is, what it covers and the
 * way in, under a header row of small capitals. Hovering a row brings a
 * small photograph of the service under the pointer, kept inside the row.
 */
export function ServicesTable() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white px-4 py-20 text-(--k-ink) lg:px-5", SCREEN, SANS)}
    >
      <div
        className={cn(
          COLS,
          CAPS,
          "hidden border-b border-(--k-ink) pb-3 text-[11px] lg:grid",
          MUTED,
        )}
      >
        <span className="col-span-1">No.</span>
        <span className="col-span-3">Service</span>
        <span className="col-span-2">For</span>
        <span className="col-span-3">What it is</span>
        <span className="col-span-3">Covers</span>
      </div>
      {CTA_SERVICES.map((service, index) => (
        <PeekRow
          key={service.key}
          service={service}
          className={cn(
            COLS,
            "items-baseline gap-y-3 border-b border-(--k-ink)/20 py-8 first:border-t first:border-(--k-ink) lg:first:border-t-0 lg:py-10",
          )}
        >
          <span className="col-span-1 text-[13px] tabular-nums">
            {pad(index + 1)}
          </span>
          <h3 className="col-span-3 text-[28px] leading-[1.05] tracking-[-0.035em] lg:text-[34px]">
            {service.title}
          </h3>
          <p className={cn("col-span-4 text-[14px] lg:col-span-2", MUTED)}>
            {service.eyebrow}
          </p>
          <div className="col-span-4 lg:col-span-3">
            <p className="text-[16px] leading-[1.45]">{service.body}</p>
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(TEXT_LINK, "mt-4 inline-block text-[14px]")}
            >
              {service.cta.label} →
            </a>
          </div>
          <ul className="col-span-4 space-y-1 text-[14px] leading-[1.45] text-(--k-ink)/75 lg:col-span-3">
            {service.covers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PeekRow>
      ))}
    </section>
  );
}
