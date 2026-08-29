"use client";

import { useRef, useState } from "react";
import { products } from "./data";
import { cn } from "@/lib/utils";

export function ProductIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
  };

  const activeMedia = hover !== null ? products[hover].media[0] : null;

  return (
    <section
      id="lookbook"
      className="c-footer-list relative z-10 bg-[var(--y-beige)] py-24 lg:py-40"
      onMouseMove={onMove}
    >
      <ul className="mx-auto max-w-[1400px] px-5 text-center lg:px-30">
        {products.map((p, i) => (
          <li key={p.index}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "y-title group flex items-baseline justify-center gap-3 py-1 text-[9vw] leading-[0.95] transition-colors lg:text-[5vw]",
                hover !== null && hover !== i ? "text-black/30" : "text-black",
              )}
            >
              <span className="text-[2vw] lg:text-[1vw]">[{p.index}]</span>
              <span>{p.name}</span>
              <span className="text-[2vw] lg:text-[1vw]">{p.price}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* cursor-following preview */}
      <div
        ref={previewRef}
        className={cn(
          "pointer-events-none fixed z-50 hidden aspect-[4/5] w-[220px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border-2 border-black transition-opacity duration-200 lg:block",
          hover !== null ? "opacity-100" : "opacity-0",
        )}
      >
        {activeMedia?.kind === "video" ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={activeMedia.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : activeMedia ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={activeMedia.src} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
    </section>
  );
}
