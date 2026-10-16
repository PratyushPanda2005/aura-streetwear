"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** expo.out: a quick start that settles slowly. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Smooth scrolling for the whole v6 homepage, firm enough to be felt: each
 * turn of the wheel glides over about 1.4 seconds on an exponential ease-out
 * instead of jumping, and anchor links glide to their sections. Touch keeps
 * its native feel. Skipped when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -44 },
      duration: 1.4,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
