"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IndigoChapter } from "@/types/indigo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chapter cover. `position: sticky; top: 0` keeps it pinned for the whole
 * ~8,100px chapter; `TaleOutro`'s 900px transparent top padding re-reveals it
 * at the end. The parent `.homepage__tale` must not clip overflow.
 */
export function TaleCover({ chapter }: { chapter: IndigoChapter }) {
  const label = ` [${chapter.title}] `;
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      // Start scaled up, scale down to 1 as section scrolls into viewport.
      // The trigger is the section itself. It starts scaling as soon as the section
      // enters from the bottom of the screen, and reaches scale 1 when it's fully
      // scrolled up and pins at the top of the viewport.
      gsap.fromTo(
        img,
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // trigger top enters viewport bottom
            end: "top top",      // trigger top hits viewport top (pins)
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-screen w-full overflow-hidden"
    >
      <p className="absolute left-[140px] top-[calc(50%-18px)] z-1 hidden font-mono text-[16px] leading-[18px] uppercase text-[#030303] lg:block">
        {label}
      </p>
      <p className="absolute right-[140px] top-[calc(50%-18px)] z-1 hidden font-mono text-[16px] leading-[18px] uppercase text-[#030303] lg:block">
        {label}
      </p>

      <picture className="relative block h-full w-full overflow-hidden">
        <source media="(max-width: 1023px)" srcSet={chapter.cover.mobile.src} />
        <source srcSet={chapter.cover.desktop.src} />
        <img
          ref={imageRef}
          src={chapter.cover.desktop.src}
          alt={chapter.cover.alt ?? ""}
          className="h-full w-full object-cover will-change-transform"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </section>
  );
}
