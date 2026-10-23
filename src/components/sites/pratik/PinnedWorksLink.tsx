"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Distance (px) before the tagline's right edge at which it starts fading. */
const FADE_START = 120;
/** Distance (px) before the tagline's right edge at which it is fully gone. */
const FADE_END = 8;

/**
 * The "works" nav link rides along with the section it sits above: as the
 * horizontal strip scrolls, the link slides left by the same amount. On its
 * way it hands the header a `--brand-fade` progress (0 → 1) so the tagline
 * can fade out ahead of it, then it pins in the tagline's place. Below `md`
 * the header keeps its static layout.
 */
export function PinnedWorksLink({
  href,
  stripId,
  taglineId,
  className,
  children,
}: {
  href: string;
  stripId: string;
  taglineId: string;
  className?: string;
  children: ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const strip = document.getElementById(stripId);
    const tagline = document.getElementById(taglineId);
    const header = link?.closest("header");
    if (!link || !strip || !tagline || !header) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    let shift = 0;

    const update = () => {
      let fade = 0;
      if (desktop.matches) {
        const home = link.getBoundingClientRect().left - shift;
        const { left: pin, right: taglineEnd } = tagline.getBoundingClientRect();
        const x = Math.max(home - strip.scrollLeft, pin);
        shift = x - home;
        fade = Math.min(Math.max((taglineEnd + FADE_START - x) / (FADE_START - FADE_END), 0), 1);
      } else {
        shift = 0;
      }
      link.style.setProperty("--works-shift", `${shift}px`);
      header.style.setProperty("--brand-fade", `${fade}`);
    };

    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    desktop.addEventListener("change", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktop.removeEventListener("change", update);
    };
  }, [stripId, taglineId]);

  return (
    <a ref={linkRef} href={href} aria-current="page" className={cn("translate-x-(--works-shift)", className)}>
      {children}
    </a>
  );
}
