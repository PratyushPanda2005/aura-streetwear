"use client";

import { useState } from "react";
import { scrollToId } from "../shared/lenis";
import type { IndigoChapter, IndigoHero } from "@/types/indigo";

/**
 * Full-viewport hero: a looping free-license fashion clip (the original clip was
 * copyrighted; this one is a royalty-free runway video), a bottom-left scroll
 * indicator, and the centred drop index.
 *
 * Measured: height 100vh (900px at 1440x900), min-height 700px,
 * background #030303. The index and the scroll indicator both use
 * `mix-blend-mode: difference`.
 */

export function HeroSection({
  hero,
  chapters,
}: {
  hero: IndigoHero;
  chapters: IndigoChapter[];
}) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: hoveredImage ? 0 : 1 }}
          poster={hero.backgroundVideo.desktop.poster}
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            media="(max-width: 1023px)"
            src={hero.backgroundVideo.mobile.src}
            type="video/mp4"
          />
          <source src={hero.backgroundVideo.desktop.src} type="video/mp4" />
        </video>
        {chapters.map((chapter) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={chapter.slug}
            src={chapter.cover.desktop.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: hoveredImage === chapter.cover.desktop.src ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Bottom-left scroll indicator: 1x60 track with a looping 1.4s fill. */}
      <div className="absolute bottom-5 left-5 h-[60px] w-px overflow-hidden bg-white/30 mix-blend-difference">
        <div className="indigo-scroll-indicator absolute h-[60px] w-px bg-white" />
      </div>

      {/* Centred chapter index. */}
      <ul className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col text-center mix-blend-difference">
        <li className="mb-6 font-mono text-[16px] leading-[18px] uppercase">
          <p>{hero.pretitle}</p>
        </li>
        {chapters.map((chapter) => (
          <li key={chapter.slug} className="h-11">
            <a
              href={`#${chapter.slug}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(chapter.slug);
              }}
              onMouseEnter={() => setHoveredImage(chapter.cover.desktop.src)}
              onMouseLeave={() => setHoveredImage(null)}
              // Hover (measured on `.btn--contained.btn--white`): the link fills
              // white and the text flips to black. Only `background-color` is in
              // the transition list, so the colour snaps while the fill eases in.
              className="relative inline-flex shrink-0 items-center gap-1 bg-transparent px-0.5 whitespace-nowrap transition-[background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-[#030303]"
            >
              <span className="block text-[50px] leading-[44px] font-normal tracking-[-3px] uppercase">
                {chapter.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
