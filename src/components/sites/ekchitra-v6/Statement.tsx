"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CapsLink } from "../ekchitra-v5/CapsLink";
import { Chars } from "../ekchitra-v5/Chars";
import { Reveal } from "../ekchitra-v5/Reveal";
import { BODY, SANS, TITLE, V5_ROUTES } from "../ekchitra-v5/shared";
import { STATEMENT, STATS } from "./data";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

const [exhibitions, artists] = STATS;

/** Brand-coloured panels that slide in beside the photograph. */
const PANELS = [
  {
    stat: exhibitions,
    tone: "bg-(--k-maroon) text-white",
    caption: "text-white/80",
    size: "h-[60%]",
  },
  {
    stat: artists,
    tone: "bg-(--k-sky) text-(--k-ink)",
    caption: "text-(--k-ink)/70",
    size: "h-[40%]",
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** power2.out */
const ease = (t: number) => 1 - (1 - t) * (1 - t);

/**
 * 01 — About, after the "An inflection point" section of stateofaidesign.com.
 *
 * A small label sits directly over the gallery's founding line, both flush
 * with the left margin. Then a photograph of the gallery fills the width; as it reaches
 * the top of the screen it pins, and while scrolling on, the photograph slides
 * left and two brand-coloured panels slide in beside it — maroon with the
 * number of exhibitions curated, sky blue with the number of artists — their
 * figures rolling up with the scroll. The pin releases and the story follows
 * in two columns, with a link to the About page.
 */
export function Statement() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight + 44);
      const amount = ease(clamp((44 - rect.top) / (span * 0.75)));
      track.current?.style.setProperty("--slide", amount.toFixed(4));
      setProgress(Math.round(amount * 100) / 100);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="about"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      {/* Label over the founding line, flush left. */}
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index n={1} label={STATEMENT.label} />
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text={STATEMENT.lead} />
          </h2>
        </div>
      </div>

      {/* The photograph, pinned while the panels slide in. */}
      <div ref={pin} className="relative h-[calc(100svh+520px)]">
        <div className="sticky top-11 h-[calc(100svh-44px)]">
          <div className="h-full overflow-hidden">
            <div
              ref={track}
              className="flex h-full w-[calc(100%+min(34vw,480px))] translate-x-[calc(var(--slide,0)_*_-1_*_min(34vw,480px))] will-change-transform"
            >
              <div className="relative h-full flex-1 overflow-hidden bg-(--k-ink)">
                <Image
                  src={STATEMENT.image.src}
                  alt={STATEMENT.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex h-full w-[min(34vw,480px)] shrink-0 flex-col">
                {PANELS.map((panel) => (
                  <div
                    key={panel.stat.label}
                    className={cn(
                      "flex flex-col justify-between p-5 lg:p-6",
                      panel.tone,
                      panel.size,
                    )}
                  >
                    <p className="text-[56px] leading-none tracking-[-0.04em] tabular-nums lg:text-[88px]">
                      {Math.round(progress * panel.stat.value)}
                      {panel.stat.suffix || "+"}
                    </p>
                    <p
                      className={cn(
                        "text-[14px] lg:text-[15px]",
                        panel.caption,
                      )}
                    >
                      {panel.stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The story: the belief on the left, the rest on the right. */}
      <div className={cn(GRID, "gap-y-6 pt-16 lg:pt-24")}>
        <Reveal className="col-span-4 lg:col-span-6">
          <p className="text-[24px] leading-[1.2] tracking-[-0.02em] lg:text-[30px]">
            {STATEMENT.body[0]}
          </p>
        </Reveal>
        <Reveal className="col-span-4 flex flex-col items-start gap-8 lg:col-span-5 lg:col-start-8">
          <p className={cn(BODY, "text-(--k-ink)/70")}>{STATEMENT.body[1]}</p>
          <CapsLink arrow href={V5_ROUTES.about}>
            Read our story
          </CapsLink>
        </Reveal>
      </div>
    </section>
  );
}
