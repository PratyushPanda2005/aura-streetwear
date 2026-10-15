"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO } from "../../ekchitra-redesign/data";
import { EXHIBITIONS } from "../exhibitions-data";
import { Chars } from "../Chars";
import { Diamonds } from "../Diamonds";
import { CAPS, SANS, V5_HOME, V5_ROUTES } from "../shared";
import { HERO_ART, HERO_COPY, HERO_NAV, hyderabadTime } from "./data";

/**
 * TEMPORARY PLACEHOLDER — a visitor in front of a large painting (Unsplash,
 * free licence — unsplash.com/photos/vOKvkIf_4QI). Replace with an EkChitra
 * photograph.
 */
const GALLERY = {
  src: "/sites/ekchitra-redesign/placeholders/hero-grid-gallery-unsplash.jpg",
  alt: "A visitor looking at a large painting in a gallery",
};

/**
 * An artwork printed as a halftone — grey dots on white — that turns back
 * into the full-colour work on hover.
 */
function Halftone({
  src,
  alt,
  position = "object-center",
  tone = "brightness-[0.58] contrast-[1.9]",
  className,
}: {
  src: string;
  alt: string;
  /** Where to crop the picture, as an `object-…` class. */
  position?: string;
  /** Brightness and contrast before printing, as filter classes. */
  tone?: string;
  className?: string;
}) {
  return (
    <div className={cn("group relative overflow-hidden bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={cn(
          "scale-[1.02] object-cover opacity-0 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-100 group-hover:opacity-100",
          position,
        )}
      />
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={cn(
          "object-cover grayscale transition-opacity duration-700 [mask-image:radial-gradient(circle,#000_52%,transparent_58%)] [mask-size:5px_5px] group-hover:opacity-0",
          tone,
          position,
        )}
      />
    </div>
  );
}

/**
 * Study 02 — after aspensearch.com. A Swiss grid of cells fills the
 * screen: a thin top bar with a live Hyderabad clock and the page links; the
 * wordmark set huge in a white cell; artworks printed as grey halftone dots
 * (they turn back into full colour on hover); and two information cells — one
 * in black with what the gallery does, one in white listing recent exhibitions
 * over a run of the diamond motif.
 * Cells open in sequence on arrival.
 */
export function HeroGrid() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(hyderabadTime());
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  const recent = EXHIBITIONS.slice(0, 4);

  return (
    <section
      id="grid"
      className={cn(
        "flex h-svh min-h-[640px] flex-col overflow-hidden bg-white text-(--k-ink)",
        SANS,
      )}
    >
      {/* Top bar. */}
      <div className="flex h-11 shrink-0">
        <a
          href={V5_HOME}
          aria-label="EkChitra — home"
          className="flex w-11 items-center justify-center bg-(--k-ink)"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
            <path d="M10 1l9 9-9 9-9-9z" fill="#fff" />
          </svg>
        </a>
        <p
          className={cn(CAPS, "flex items-center px-4 text-[11px]")}
          suppressHydrationWarning
        >
          {time} {HERO_COPY.city.toUpperCase()}
        </p>
        <nav
          aria-label="Primary navigation"
          className={cn("ml-auto hidden items-center px-5 lg:flex")}
        >
          <ul className="flex gap-x-5 text-[13px]">
            {HERO_NAV.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:opacity-60">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contact"
          className="ml-auto flex items-center gap-x-6 bg-(--k-ink) px-5 text-[13px] text-white transition-opacity hover:opacity-80 lg:ml-0 lg:w-[208px] lg:justify-between"
        >
          Contact <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* The grid. */}
      <div className="grid flex-1 grid-cols-2 grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr_0.62fr_0.62fr]">
        <div className="ek5-rise relative col-span-2 flex items-end p-4 [--d:150ms] lg:p-5">
          <h1 className="sr-only">EkChitra — {HERO_COPY.statement}</h1>
          <span
            role="img"
            aria-label={LOGO.alt}
            className="block aspect-[526/118] w-[88%] max-w-[720px] bg-(--k-ink) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
          />
        </div>
        <Halftone
          src={HERO_ART[0].src}
          alt={`${HERO_ART[0].title} by ${HERO_ART[0].artist}`}
          className={cn("ek5-rise col-span-2 hidden [--d:300ms] lg:block")}
        />
        <Halftone
          src={GALLERY.src}
          position="object-[24%_80%]"
          tone="brightness-[1.12] contrast-[2.4]"
          alt={GALLERY.alt}
          className={cn("ek5-rise col-span-2 [--d:450ms] lg:col-span-2")}
        />
        <div className="ek5-rise hidden flex-col justify-between bg-(--k-ink) p-5 text-white [--d:600ms] lg:flex">
          <p className="text-[17px] leading-[1.3]">
            <Chars text={HERO_COPY.body} />
          </p>
          <a
            href={V5_ROUTES.about}
            className={cn(
              CAPS,
              "flex items-center justify-between text-[11px] text-white/80 hover:text-white",
            )}
          >
            About the gallery <span aria-hidden="true">→</span>
          </a>
        </div>
        <div
          className={cn(
            "ek5-rise relative hidden flex-col justify-between overflow-hidden bg-white p-5 [--d:750ms] lg:flex",
          )}
        >
          <Diamonds
            rows={22}
            shape="steps"
            horizontal
            side="right"
            tint="maroon"
            tintEvery={7}
            tintOpacity={0.45}
            className="absolute right-0 bottom-0 h-[56px] -scale-y-100 text-(--k-ink)/[0.12]"
          />
          <p className="text-[17px] leading-[1.3]">
            Every exhibition begins with an idea. Recent shows:
          </p>
          <ul className="relative mb-16 space-y-1 text-[14px] text-(--k-ink)/70">
            {recent.map((show) => (
              <li key={show.title}>{show.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
