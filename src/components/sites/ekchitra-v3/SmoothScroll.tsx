"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Eased wheel scrolling for the whole page. Skipped when reduced motion is on. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    return () => lenis.destroy();
  }, []);

  return null;
}
