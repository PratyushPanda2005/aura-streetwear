"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { STATEMENT, STATS } from "../ekchitra-v6/data";
import { Label } from "./ui";

const STORY = [STATEMENT.lead, ...STATEMENT.body].join(" ");

/**
 * A few works filling some of the grid's empty cells, not all: top left, top
 * right and low in column three. Chosen because they fill their own frames
 * edge to edge, so cropped to the wide cells they read as full pictures;
 * `focus` keeps each one's subject in view. The pinned figures slide over
 * them. Desktop only.
 */
const DIR = "/sites/ekchitra-redesign/artworks";
const HUNG = [
  {
    src: `${DIR}/sanctum-aikyam--vinod-daroz.png`,
    alt: "Sanctum Aikyam by Vinod Daroz",
    focus: "object-center",
    place: "lg:col-start-1 lg:row-start-1",
  },
  {
    src: `${DIR}/embrace-of-light--selvakumar.png`,
    alt: "Embrace of Light by Selvakumar",
    focus: "object-[50%_40%]",
    place: "lg:col-start-4 lg:row-start-1",
  },
  {
    src: `${DIR}/harmony-of-nature-and-mind--farhad-hussain.png`,
    alt: "Harmony of Nature and Mind by Farhad Hussain",
    focus: "object-[50%_42%]",
    place: "lg:col-start-3 lg:row-start-4",
  },
];

/**
 * The figures, placed as in the reference's five-row grid: a black cell in
 * column three, row one; a mint cell across columns one and two, rows two
 * to five; and a grey cell in column four, rows two and three. The black and
 * grey cells are sticky under the top bar, so as the grid scrolls they stay
 * pinned and ride down their columns while the mint cell passes beneath.
 * Each figure grows with its cell: 80px, 132px and 115px at 1440.
 */
const STAT_CELLS = [
  {
    tone: "bg-(--e7-maroon) text-white",
    place:
      "lg:col-start-3 lg:row-start-1 lg:sticky lg:top-(--e7-header) lg:z-10",
    size: "lg:text-[5.55vw]",
  },
  {
    tone: "bg-(--e7-sky)",
    pattern: true,
    place:
      "lg:col-span-2 lg:col-start-1 lg:row-span-4 lg:row-start-2 lg:border-t lg:border-r",
    size: "lg:text-[9.18vw]",
  },
  {
    tone: "bg-(--e7-navy) text-white",
    place:
      "lg:col-start-4 lg:row-span-2 lg:row-start-2 lg:sticky lg:top-(--e7-header) lg:z-10 lg:border-t lg:border-l",
    size: "lg:text-[7.97vw]",
  },
];

/**
 * About, after aspensearch.com: a square-bulleted label in the first column
 * and the gallery's story across the other three, its words filling from
 * grey to ink as the paragraph scrolls through the screen. Under it, three
 * figures in a five-row grid whose black and grey cells pin as it scrolls.
 */
export function About() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = ref.current;
    if (!text) return;
    const words = Array.from(text.querySelectorAll<HTMLElement>("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((word) => word.style.setProperty("opacity", "1"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = text.getBoundingClientRect();
      const view = window.innerHeight;
      // 0 as the paragraph's top reaches 80% down the screen, 1 as its
      // bottom reaches 45%.
      const start = view * 0.8;
      const end = view * 0.45;
      const progress =
        (start - box.top) / Math.max(1, start - end + box.height - 0);
      const lit = Math.min(1, Math.max(0, progress)) * words.length;
      words.forEach((word, i) => {
        const amount = Math.min(1, Math.max(0, lit - i));
        word.style.setProperty("opacity", `${0.18 + amount * 0.82}`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="e7-about"
      className="scroll-mt-(--e7-header)"
    >
      <div className="grid grid-cols-1 border-y border-(--e7-rule) lg:grid-cols-2 lg:divide-x lg:divide-(--e7-rule)">
        <div className="p-5 pt-16 lg:pt-5">
          <Label>
            <span id="e7-about">About EkChitra</span>
          </Label>
        </div>
        <div className="px-5 pt-6 pb-12 lg:pt-5 lg:pb-16">
          <p
            ref={ref}
            className="text-[24px] leading-[1.1] tracking-[-0.02em] sm:text-[28px] lg:text-[2.15vw]"
          >
            {STORY.split(" ").map((word, i) => (
              <span key={i} data-word className="opacity-[0.18]">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="e7-ruled grid grid-cols-1 border-b border-(--e7-rule) sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(5,200px)]">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "relative flex min-h-[200px] flex-col justify-between overflow-hidden border-(--e7-rule) p-5",
              STAT_CELLS[i].tone,
              STAT_CELLS[i].place,
            )}
          >
            <p
              className={cn(
                "text-[64px] leading-none tracking-[-0.04em]",
                STAT_CELLS[i].size,
              )}
            >
              {stat.value}
              {stat.suffix}
            </p>
            <p className="text-[16px] leading-[1.3] tracking-[-0.02em]">
              {stat.label}
            </p>
            {STAT_CELLS[i].pattern && (
              <Diamonds
                shape="steps"
                tint="maroon"
                tintOpacity={1}
                horizontal
                rows={17}
                className="absolute right-0 bottom-0 h-[90px] -scale-y-100 text-(--e7-ink)/[0.14] lg:h-[120px]"
              />
            )}
          </div>
        ))}
        {HUNG.map((item) => (
          <div
            key={item.src}
            className={cn(
              "relative hidden overflow-hidden border-r border-b border-(--e7-rule) lg:block",
              item.place,
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="25vw"
              className={cn("object-cover", item.focus)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
