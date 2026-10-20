"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Source runs `new Lenis({ lerp: .18, autoRaf: true })`; ScrollTrigger and the
// IX2 loop read the native scroll position it drives.
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.18, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
