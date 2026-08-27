"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { getLenis, setLenis } from "./lenis";

/**
 * Lenis smooth scroll, matching the live site: <html> gets the `lenis` class,
 * and `lenis-stopped` while the splash gate is open. Library defaults observed
 * on the original (lerp 0.1, smoothWheel true, touchMultiplier 0.6).
 *
 * The instance is exposed as `window.lenis`, exactly as the original does, so
 * chapter navigation can call `lenis.scrollTo(...)`.
 */
export function SmoothScrollProvider({
  children,
  stopped = false,
}: {
  children: ReactNode;
  stopped?: boolean;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 0.6,
    });
    setLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(undefined);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (stopped) lenis.stop();
    else lenis.start();
  }, [stopped]);

  return <>{children}</>;
}
