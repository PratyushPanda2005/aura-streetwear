"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { pad } from "../cta-variants/shared";
import { EXHIBITIONS } from "../data";
import { BUTTON, GRID } from "../styles";

/** The shows that are on now or coming next. */
export const CURRENT = EXHIBITIONS.filter((show) => show.status === "Current");

export type Show = (typeof EXHIBITIONS)[number];

/** "Upcoming" when the show has dates, "Now on" while they are still to come. */
export const statusOf = (show: Show) =>
  /\d/.test(show.dates) ? "Upcoming" : "Now on";
export const datesOf = (show: Show) => show.dates || "Dates to be announced";

/** The ruled bar that opens every version: the section name and a count. */
export function Bar({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        "col-span-4 flex items-baseline justify-between border-y border-(--k-ink) py-3 text-[15px] lg:col-span-12",
        className,
      )}
    >
      Now and upcoming
      <span className="text-[13px] tabular-nums">{pad(CURRENT.length)}</span>
    </h2>
  );
}

/** The black "View exhibition" button, named for screen readers. */
export function ViewButton({
  show,
  light = false,
  className,
}: {
  show: Show;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href={show.href}
      target="_blank"
      rel="noreferrer"
      className={cn(BUTTON, light && "bg-white text-(--k-ink)", className)}
    >
      View exhibition
      <span className="sr-only">: {show.title}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

/** A poster at its own 16:9, linking to the show (hidden from screen readers; the button names it). */
export function Poster({
  show,
  sizes,
  className,
}: {
  show: Show;
  sizes: string;
  className?: string;
}) {
  return (
    <a
      href={show.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={cn(
        "group relative block aspect-video overflow-hidden bg-(--k-ink)/5",
        className,
      )}
    >
      <Image
        src={show.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </a>
  );
}

/**
 * 00 — The pair (current): the two shows side by side, six columns each —
 * poster, status, title, curator and dates, and a button.
 */
export function CurrentPair() {
  return (
    <div className={cn(GRID, "gap-y-12")}>
      <Bar />
      {CURRENT.map((show) => (
        <article
          key={show.title}
          className="col-span-4 flex flex-col lg:col-span-6"
        >
          <Poster show={show} sizes="(min-width: 1024px) 50vw, 100vw" />
          <p className={cn(CAPS, "mt-5 text-[12px]")}>{statusOf(show)}</p>
          <h3 className="mt-2 text-[36px] leading-[1] tracking-[-0.045em] lg:text-[3.2vw]">
            {show.title}
          </h3>
          <div className="mt-4 border-t border-(--k-ink)/15 pt-3 text-[15px] leading-[1.45]">
            <p>{show.subtitle}</p>
            <p>{datesOf(show)}</p>
          </div>
          <ViewButton show={show} className="mt-6" />
        </article>
      ))}
    </div>
  );
}

/**
 * 01 — Lead and next: what is on now takes eight columns, large; what comes
 * next sits beside it in four, smaller, so the order reads at a glance. Both
 * end on the same line.
 */
export function CurrentLead() {
  const [lead, next] = CURRENT;
  return (
    <div className={cn(GRID, "gap-y-10")}>
      <Bar />
      <article className="col-span-4 flex flex-col lg:col-span-8">
        <Poster show={lead} sizes="(min-width: 1024px) 66vw, 100vw" />
        <div className="mt-5 flex flex-col gap-y-4 lg:flex-row lg:items-end lg:justify-between lg:gap-x-8">
          <div>
            <p className={cn(CAPS, "text-[12px]")}>{statusOf(lead)}</p>
            <h3 className="mt-2 text-[40px] leading-[1] tracking-[-0.045em] lg:text-[3.8vw]">
              {lead.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.45]">
              {lead.subtitle} · {datesOf(lead)}
            </p>
          </div>
          <ViewButton show={lead} />
        </div>
      </article>
      {next && (
        <article className="col-span-4 flex flex-col lg:border-l lg:border-(--k-ink)/15 lg:pl-5">
          <Poster show={next} sizes="(min-width: 1024px) 33vw, 100vw" />
          <p className={cn(CAPS, "mt-5 text-[12px]")}>{statusOf(next)}</p>
          <h3 className="mt-2 text-[28px] leading-[1.05] tracking-[-0.04em] lg:text-[2vw]">
            {next.title}
          </h3>
          <div className="mt-3 border-t border-(--k-ink)/15 pt-3 text-[15px] leading-[1.45]">
            <p>{next.subtitle}</p>
            <p>{datesOf(next)}</p>
          </div>
          <ViewButton show={next} className="mt-6 lg:mt-auto" />
        </article>
      )}
    </div>
  );
}

/**
 * 02 — Alternating rows: each show is a full-width row — the poster in six
 * columns, its details in the other six from the poster's top edge, the
 * button on its bottom edge. The second row mirrors the first.
 */
export function CurrentRows() {
  return (
    <div className={cn(GRID, "gap-y-8")}>
      <Bar />
      {CURRENT.map((show, index) => (
        <article
          key={show.title}
          className={cn(
            "col-span-4 grid grid-cols-1 gap-y-5 lg:col-span-12 lg:grid-cols-12 lg:gap-x-5",
            index > 0 && "border-t border-(--k-ink)/15 pt-8",
          )}
        >
          <Poster
            show={show}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn("lg:col-span-6", index % 2 === 1 && "lg:order-2")}
          />
          <div className="flex flex-col lg:col-span-6">
            <p className="text-[13px] tabular-nums">
              {pad(index + 1)} / {pad(CURRENT.length)}
            </p>
            <p className={cn(CAPS, "mt-4 text-[12px]")}>{statusOf(show)}</p>
            <h3 className="mt-2 text-[40px] leading-[1] tracking-[-0.045em] lg:text-[3.8vw]">
              {show.title}
            </h3>
            <div className="mt-4 border-t border-(--k-ink)/15 pt-3 text-[15px] leading-[1.45]">
              <p>{show.subtitle}</p>
              <p>{datesOf(show)}</p>
            </div>
            <ViewButton show={show} className="mt-6 lg:mt-auto" />
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * 03 — Tabs: "Now on" and "Upcoming" as a pair of large tabs across the
 * width; under them one show at a time — the poster in columns 1–8 and its
 * details in 9–12 — cross-fading when the tab changes. One poster on screen,
 * so it can be shown large.
 */
export function CurrentTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className={GRID}>
      <div
        role="tablist"
        aria-label="Now and upcoming"
        className="col-span-4 grid grid-cols-2 gap-x-4 lg:col-span-12 lg:gap-x-5"
      >
        {CURRENT.map((show, index) => (
          <button
            key={show.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              "flex flex-col items-start border-b-2 pb-3 text-left transition-colors duration-300",
              active === index
                ? "border-(--k-ink) text-(--k-ink)"
                : "border-(--k-ink)/15 text-(--k-ink)/60 hover:text-(--k-ink)/85",
            )}
          >
            <span className={cn(CAPS, "text-[12px]")}>{statusOf(show)}</span>
            <span className="mt-1 text-[24px] leading-[1] tracking-[-0.04em] lg:text-[2.6vw]">
              {show.title}
            </span>
          </button>
        ))}
      </div>

      <div className="col-span-4 mt-6 grid lg:col-span-12">
        {CURRENT.map((show, index) => (
          <div
            key={show.title}
            role="tabpanel"
            aria-hidden={active !== index}
            className={cn(
              "grid grid-cols-1 gap-y-5 transition-opacity duration-500 ease-out [grid-area:1/1] lg:grid-cols-12 lg:gap-x-5",
              active === index
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <Poster
              show={show}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="lg:col-span-8"
            />
            <div className="flex flex-col lg:col-span-4">
              <div className="border-t border-(--k-ink) pt-3 text-[15px] leading-[1.45]">
                <p>{show.subtitle}</p>
                <p>{datesOf(show)}</p>
              </div>
              <ViewButton show={show} className="mt-6 lg:mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 04 — On brand black: the pair set on a full-width brand-black band — the
 * posters side by side, white type under them, and white buttons that turn
 * sky blue — so the shows on now stand apart from the white archive below.
 */
export function CurrentDark() {
  return (
    <div className="bg-(--k-ink) py-10 text-white lg:py-14">
      <div className={cn(GRID, "gap-y-12")}>
        <h2 className="col-span-4 flex items-baseline justify-between border-y border-white/40 py-3 text-[15px] lg:col-span-12">
          Now and upcoming
          <span className="text-[13px] tabular-nums">
            {pad(CURRENT.length)}
          </span>
        </h2>
        {CURRENT.map((show) => (
          <article
            key={show.title}
            className="col-span-4 flex flex-col lg:col-span-6"
          >
            <Poster
              show={show}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="bg-white/5"
            />
            <p className={cn(CAPS, "mt-5 text-[12px]")}>{statusOf(show)}</p>
            <h3 className="mt-2 text-[36px] leading-[1] tracking-[-0.045em] lg:text-[3.2vw]">
              {show.title}
            </h3>
            <div className="mt-4 border-t border-white/25 pt-3 text-[15px] leading-[1.45] text-white/85">
              <p>{show.subtitle}</p>
              <p>{datesOf(show)}</p>
            </div>
            <ViewButton show={show} light className="mt-6" />
          </article>
        ))}
      </div>
    </div>
  );
}
