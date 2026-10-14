"use client";

import Image from "next/image";
import { type ComponentProps, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { ABOUT_VALUES } from "./about-data";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { InView } from "./InView";
import { BODY, CAPS, DISPLAY, SANS } from "./shared";

/** How far the previous card rises to show its title as a strip, px. */
const STRIP_PX = { mobile: 64, desktop: 80 };

/**
 * A small diamond motif for the bottom-left corner of each card, a different
 * shape or colouring each time, in one colour or two — always faint, never the
 * focus. Each is a horizontal strip, flipped so its straight edge sits on the
 * card's bottom edge.
 */
const PATTERNS: ComponentProps<typeof Diamonds>[] = [
  {
    rows: 26,
    shape: "steps",
    horizontal: true,
    className: "h-[52px] -scale-y-100 text-(--k-ink)/[0.14] lg:h-[68px]",
  },
  {
    rows: 26,
    shape: "clusters",
    horizontal: true,
    tint: "sky",
    tintEvery: 5,
    tintOpacity: 0.85,
    className: "h-[52px] -scale-y-100 text-(--k-ink)/[0.14] lg:h-[68px]",
  },
  {
    rows: 26,
    shape: "zigzag",
    horizontal: true,
    className: "h-[52px] -scale-y-100 text-(--k-maroon)/30 lg:h-[68px]",
  },
  {
    rows: 26,
    shape: "clusters",
    horizontal: true,
    tint: "maroon",
    tintEvery: 4,
    tintOpacity: 0.55,
    className: "h-[52px] -scale-y-100 text-(--k-navy)/[0.16] lg:h-[68px]",
  },
];

/** kettal.com's power2.inOut. */
const ease = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * "How we work", built as kettal.com's stacked cards (their history page).
 *
 * The section pins to the screen for a long stretch of scrolling. Behind, a
 * photograph from the gallery fills the screen, drifting slowly upwards into
 * place. In front, white cards — each from 45% of the way down to the bottom
 * of the screen, each with its own small diamond motif in the bottom-left
 * corner — slide up one at a time from below. As each card arrives,
 * every card before it rises by a strip, so all the earlier titles stay
 * readable as a stack of strips above the new card. Each card's title and text fade in
 * letter by letter and its picture opens upwards as it comes into view. When
 * the last card is in place the pin releases and the section scrolls away.
 *
 * Every card's share of the pinned scroll is the same; within it the card
 * moves on an ease-in-out, as on kettal.com.
 */
export function AboutValues() {
  const section = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const count = ABOUT_VALUES.items.length;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      // Photograph: from the section entering the screen to the pin ending.
      const drift = clamp((view - rect.top) / rect.height);
      photo.current?.style.setProperty("--drift", drift.toFixed(4));
      // Cards: across the pinned stretch only.
      const pinned = clamp(-rect.top / Math.max(1, rect.height - view));
      const strip =
        window.innerWidth >= 1024 ? STRIP_PX.desktop : STRIP_PX.mobile;
      const reached = (index: number) =>
        index < count ? ease(clamp(pinned * count - index)) : 0;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const own = card.offsetHeight * (1 - reached(index));
        // Rise one strip for every later card that has arrived, so every
        // earlier title stays readable in the finished stack.
        let lift = 0;
        for (let later = index + 1; later < count; later += 1) {
          lift += strip * reached(later);
        }
        card.style.transform = `translate3d(0, ${(own - lift).toFixed(1)}px, 0)`;
      });
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
      ref={section}
      className={cn(
        // One screen, plus about 92% of a screen of pinned scroll per card
        // (kettal.com: 2490px for three cards on a 900px screen).
        "relative h-[469svh]",
        SANS,
      )}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-(--k-ink)">
        {/* Photograph, 22% taller than the screen, drifting into place. */}
        <div
          ref={photo}
          className="absolute inset-x-0 top-0 h-[122svh] translate-y-[calc((var(--drift,0)_-_1)_*_22svh)] will-change-transform"
        >
          <Image
            src={ABOUT_VALUES.image.src}
            alt={ABOUT_VALUES.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <p
          className={cn(
            CAPS,
            "absolute top-[88px] left-4 text-white lg:top-[104px] lg:left-5",
          )}
        >
          <Chars once text={ABOUT_VALUES.label} />
        </p>

        <ul>
          {ABOUT_VALUES.items.map((item, index) => (
            <li
              key={item.title}
              ref={(node) => {
                cards.current[index] = node;
              }}
              className="absolute inset-x-0 top-[45%] bottom-0 flex [transform:translateY(100svh)] justify-between gap-x-6 border-t border-(--k-ink)/30 bg-white p-5 will-change-transform lg:p-10"
            >
              <div className="max-w-[414px]">
                <h3
                  className={cn(
                    DISPLAY,
                    "flex items-baseline gap-x-3 text-[20px] leading-6 lg:text-[24px] lg:leading-9",
                  )}
                >
                  <span className="text-[11px] tracking-[0.12em] text-(--k-maroon)">
                    0{index + 1}
                  </span>
                  <Chars once text={item.title} className="inline" />
                </h3>
                <p
                  className={cn(
                    DISPLAY,
                    "mt-5 text-[19px] leading-[1.25] lg:mt-8 lg:text-[28px]",
                  )}
                >
                  <Chars once text={item.body} />
                </p>
                <p
                  className={cn(
                    BODY,
                    "mt-3 text-[14px] leading-[1.45] text-(--k-ink)/70 lg:mt-5 lg:text-[16px]",
                  )}
                >
                  <Chars once text={item.detail} />
                </p>
              </div>
              <InView
                once
                className="pointer-events-none absolute bottom-0 left-0"
              >
                <div className="ek5-fade">
                  <Diamonds {...PATTERNS[index % PATTERNS.length]} />
                </div>
              </InView>
              <InView
                once
                className="w-[40%] max-w-[180px] shrink-0 lg:h-full lg:w-auto lg:max-w-none"
              >
                <div className="ek5-clip relative aspect-[334/414] w-full overflow-hidden bg-(--k-sand) lg:h-full lg:w-auto">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="334px"
                    className="object-cover"
                  />
                </div>
              </InView>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
