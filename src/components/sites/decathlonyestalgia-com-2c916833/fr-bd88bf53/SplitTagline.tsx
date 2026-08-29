"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export type Segment = { text: string; em?: boolean };
export type TaglineLine = Segment[];

type Props = {
  lines: TaglineLine[];
  className?: string;
  /** ScrollTrigger start position. */
  start?: string;
  delay?: number;
  as?: "h2" | "p" | "div";
};

/**
 * Animated split-text display heading. Each character carries a pink offset
 * "shadow" duplicate (the site's c-tagline .char > span look) and reveals with
 * a staggered 3D flip when scrolled into view.
 */
export function SplitTagline({ lines, className, start = "top 85%", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const chars = el.querySelectorAll<HTMLElement>(".y-char");
    // Match the live site's c-tagline reveal exactly: each char slides up
    // (yPercent 100 -> 0) over 1s power2.out with a fast opacity pop, staggered
    // 0.05s per character across the whole tagline.
    gsap.set(chars, { yPercent: 100, opacity: 0 });
    gsap.set(el, { opacity: 1 });
    const tl = gsap.timeline({
      delay,
      scrollTrigger: { trigger: el, start },
    });
    tl.to(chars, { yPercent: 0, duration: 1, ease: "power2.out", stagger: 0.05 }, 0);
    tl.to(chars, { opacity: 1, duration: 0.1, ease: "power2.out", stagger: 0.05 }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start, delay]);

  const Tag = as;

  let key = 0;
  const renderSeg = (seg: Segment) => {
    const chars = [...seg.text].map((ch) => {
      if (ch === " ") return <span key={key++}>&nbsp;</span>;
      return (
        <span key={key++} className="y-char">
          {ch}
          <span className="y-char-shadow" aria-hidden>
            {ch}
          </span>
        </span>
      );
    });
    return seg.em ? (
      <em key={key++} className="italic">
        {chars}
      </em>
    ) : (
      <span key={key++}>{chars}</span>
    );
  };

  return (
    <Tag ref={ref as never} className={cn("y-title y-tagline opacity-0 [perspective:1500px]", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.map(renderSeg)}
        </span>
      ))}
    </Tag>
  );
}
