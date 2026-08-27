"use client";

import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoProductOverview } from "@/types/indigo";

const MAIL_URL = "mailto:contact@atelier-aura.com";

/**
 * Product hero: a full-bleed product photo carrying the cursor-ripple WebGL
 * program, with a sticky black title bar riding over it and the spec tags plus
 * "Request info" pill centred near its foot.
 *
 * Measured: title-wr is `sticky; top:0; height:0; margin:-300px 0 300px`, so the
 * 44px black bar pins 300px before the section's own top edge.
 *
 * The `ring-full.jpg` is set as a CSS background-image on the inner wrapper so
 * it is always visible regardless of CurtainsJS readiness. The WebGLImage
 * overlays it for the mouse-ripple shader effect.
 */
export function TaleProductOverview({
  overview,
}: {
  overview: IndigoProductOverview;
}) {
  return (
    <section className="relative w-full px-5 bg-white text-[#030303]">
      <div
        className="relative z-2 mx-auto max-w-[1640px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${overview.mainImage.src})` }}
      >
        <div className="sticky top-0 z-2 -mt-[300px] mb-[300px] h-0">
          <h2 className="absolute top-0 left-0 flex h-11 w-full items-center justify-center bg-[#030303] text-center text-[50px] leading-[44px] tracking-[-3px] text-white">
            {overview.title}
          </h2>
        </div>

        <div className="relative">
          <WebGLImage
            image={overview.mainImage}
            program="mouse-ripple"
            className="w-full"
            sizes="(min-width: 1024px) 1400px, 100vw"
          />
        </div>

        <ul className="absolute bottom-20 left-1/2 z-2 flex -translate-x-1/2 flex-col items-center gap-5">
          {overview.tags.map((tag) => (
            <li
              key={tag}
              className="bg-white font-mono text-[14px] leading-[18px] uppercase text-[#030303]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={MAIL_URL}
          className="absolute bottom-0 left-1/2 z-2 flex h-11 -translate-x-1/2 items-center gap-1 bg-[#030303] px-0.5 text-white transition-[background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <span className="block whitespace-nowrap text-[50px] leading-[44px] tracking-[-3px]">
            Request info
          </span>
        </a>
      </div>
    </section>
  );
}

