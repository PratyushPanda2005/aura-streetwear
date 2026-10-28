"use client";

import Image from "next/image";
import { useEffect, type RefObject } from "react";

import { cn } from "@/lib/utils";

import { Dotted } from "./Dotted";

/** The house easing for v6 motion: a long, soft settle. */
export const EASE = "ease-[cubic-bezier(0.25,1,0.5,1)]";

/**
 * Drifts every `[data-drift]` picture a little within its frame as the page
 * scrolls — it sits about 11% taller than the frame and moves from -5% to 5%
 * as its frame crosses the screen — so the pictures feel set slightly behind
 * the page. Held still for visitors who prefer reduced motion.
 */
export function useDrift(root: RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const items = [...el.querySelectorAll<HTMLElement>("[data-drift]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      for (const item of items) {
        const rect = item.parentElement!.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > view + 200) continue;
        // -1 entering at the bottom, 1 leaving at the top.
        const t = ((view - rect.top) / (view + rect.height)) * 2 - 1;
        item.style.transform = `translate3d(0, ${(
          -Math.max(-1, Math.min(1, t)) * 5
        ).toFixed(2)}%, 0)`;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** A picture in a 16:9 frame that drifts as the page scrolls and settles closer on hover. */
export function DriftPicture({
  src,
  sizes,
  priority = false,
  dotted = false,
  className,
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  /** Show the picture as a grey halftone that clears on hover (see Dotted). */
  dotted?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-(--k-ink)/5",
        dotted && "group",
        className,
      )}
    >
      <span
        data-drift=""
        className="absolute inset-x-0 -inset-y-[6%] block will-change-transform"
      >
        <Dotted on={dotted}>
          <Image
            src={src}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              "object-cover transition-[scale] duration-[750ms] group-hover:scale-[1.04] motion-reduce:transition-none",
              EASE,
            )}
          />
        </Dotted>
      </span>
    </span>
  );
}
