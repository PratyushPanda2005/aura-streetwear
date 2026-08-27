"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered masked text reveal, matching the live site's GSAP SplitText
 * usage: the pretitles are split per character and the headings / abstracts per
 * line, each wrapped in an `overflow: hidden` mask and translated up from 100%.
 *
 * Timing uses the site's own tokens: `--timing-slow` (.75s) with
 * `--easing-out` (cubic-bezier(.16,1,.3,1)).
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function RevealText({
  as: Tag = "p",
  type = "lines",
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  as?: ElementType;
  type?: "lines" | "chars" | "words";
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type,
        // Each unit gets an overflow-hidden mask so the reveal wipes rather than fades.
        mask: type,
        linesClass: "overflow-hidden",
      });

      const targets =
        type === "chars" ? split.chars : type === "words" ? split.words : split.lines;

      gsap.from(targets, {
        yPercent: 100,
        duration: 0.75,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [type, stagger, delay]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
