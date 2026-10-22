"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";

/** v7's light grey: the picture cell and the medium tags. */
const GREY = "bg-[#e0e0e0]";

/** An artist's mediums, short and without repeats: "Acrylic", "Mixed Media". */
const mediums = (artist: (typeof ARTISTS)[number]) =>
  Array.from(
    new Set(
      artist.works.map((work) => work.medium.replace(/\s+on\s+.*/i, "").trim()),
    ),
  ).slice(0, 1);

/**
 * The artist's main medium as a tag: small capitals in a grey box, as v7
 * sets them, cut short with an ellipsis when it runs long.
 */
function Tags({
  artist,
  inverted = false,
}: {
  artist: (typeof ARTISTS)[number];
  inverted?: boolean;
}) {
  return (
    <span className="flex max-w-[11rem] shrink-0 justify-end">
      {mediums(artist).map((tag) => (
        <span
          key={tag}
          className={cn(
            CAPS,
            "truncate px-2 py-1 text-[9px] leading-none transition-colors duration-300",
            inverted ? "bg-white/15 text-white" : GREY,
          )}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}

/**
 * Artists as an index with a pinned preview (version 2), in v7's ruled grid:
 * no gutters, every cell divided by a brand-black rule. Columns 1–4 hold
 * every name in full-width ruled rows with its number and medium tags; the
 * chosen row is filled black with white type, the others turn grey under
 * the pointer. Columns 5–12 stay pinned under the top bar while the list
 * scrolls: in 5–8, on v7's light grey, the chosen artist's lead work at its
 * own proportions; in 9–12, on sky blue, their number, name, statement, the
 * work's title and size, the rest of their works as thumbnails and a black
 * button. Panels cross-fade (the old one clears, then the new one settles
 * in); hovering waits a beat before choosing so skimming doesn't flicker.
 * On a phone each name opens its own preview beneath it instead.
 */
export function ArtistsIndexRuled() {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef(0);

  // Hover chooses after a short pause, so running the pointer down the list
  // doesn't flick through every artist on the way.
  const choose = (index: number, wait = 0) => {
    window.clearTimeout(hoverTimer.current);
    if (!wait) return setActive(index);
    hoverTimer.current = window.setTimeout(() => setActive(index), wait);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  return (
    <section
      aria-label="Artists"
      className={cn("border-y border-(--k-ink) bg-white text-(--k-ink)", SANS)}
    >
      <div className="grid grid-cols-1 items-start lg:grid-cols-12">
        {/* The names. */}
        <ol className="lg:col-span-4 lg:border-r lg:border-(--k-ink)">
          {ARTISTS.map((item, index) => {
            const on = index === active;
            return (
              <li
                key={item.id}
                id={item.id}
                className="border-b border-(--k-ink) last:border-b-0"
              >
                <button
                  type="button"
                  onMouseEnter={() => choose(index, 140)}
                  onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                  onFocus={() => choose(index)}
                  onClick={() => choose(index)}
                  aria-expanded={on}
                  className={cn(
                    "flex w-full items-center gap-x-3 px-4 py-4 text-left transition-colors duration-300 lg:px-5",
                    on ? "bg-(--k-ink) text-white" : "hover:bg-[#e0e0e0]",
                  )}
                >
                  <span className="w-6 shrink-0 text-[12px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[24px] leading-[1.05] tracking-[-0.035em] lg:text-[1.75vw]">
                    {item.name}
                  </span>
                  <span className="hidden xl:flex">
                    <Tags artist={item} inverted={on} />
                  </span>
                </button>

                {/* On a phone, the preview opens under its name. */}
                {on && (
                  <div className="lg:hidden">
                    <Preview artist={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* The pinned preview (desktop): the work in the grey cell, the
            details in the sky-blue cell. Every artist's panel is stacked in
            one place and they cross-fade. */}
        <div className="hidden lg:sticky lg:top-11 lg:col-span-8 lg:grid lg:h-[calc(100svh-44px)]">
          {ARTISTS.map((artist, index) => {
            const on = index === active;
            const [lead, ...rest] = artist.works;
            return (
              <div
                key={artist.id}
                aria-hidden={!on}
                className={cn(
                  "grid grid-cols-8 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1] motion-reduce:transition-none",
                  // The outgoing panel clears quickly, then the new one fades
                  // in, so the two never overlap.
                  on
                    ? "opacity-100 delay-150 duration-700"
                    : "pointer-events-none opacity-0 delay-0 duration-300",
                )}
              >
                <div
                  className={cn(
                    "col-span-4 flex items-center justify-center overflow-hidden border-r border-(--k-ink) p-5",
                    GREY,
                  )}
                >
                  <Image
                    src={lead.image}
                    alt={on ? `${lead.title} by ${artist.name}` : ""}
                    width={0}
                    height={0}
                    sizes="30vw"
                    className={cn(
                      "h-auto max-h-full w-auto max-w-full transition-[translate,scale] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      on
                        ? "translate-y-0 scale-100"
                        : "translate-y-3 scale-[0.98]",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "col-span-4 flex flex-col bg-(--k-sky) p-5 transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    on ? "translate-y-0" : "translate-y-2",
                  )}
                >
                  <div className="flex items-baseline justify-between text-[12px] tabular-nums">
                    <span>
                      {pad(index + 1)} — {pad(ARTISTS.length)}
                    </span>
                    <span>
                      {pad(artist.works.length)}{" "}
                      {artist.works.length === 1 ? "work" : "works"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-[34px] leading-[1] tracking-[-0.04em] lg:text-[2.4vw]">
                    {artist.name}
                  </h2>
                  <p className="mt-4 line-clamp-6 text-[15px] leading-[1.4] tracking-[-0.01em]">
                    {artist.statement}
                  </p>

                  <div className="mt-5 border-t border-(--k-ink)/25 pt-3">
                    <p className={cn(CAPS, "text-[10px]")}>{lead.title}</p>
                    <p className={cn(CAPS, "mt-1 text-[10px] opacity-70")}>
                      {lead.medium} · {lead.size}
                    </p>
                  </div>

                  {rest.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {rest.slice(0, 8).map((work) => (
                        <li key={work.image}>
                          <Image
                            src={work.image}
                            alt=""
                            width={0}
                            height={0}
                            sizes="64px"
                            className="h-11 w-auto"
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={artist.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={on ? undefined : -1}
                    className="mt-6 flex h-12 shrink-0 items-center justify-between bg-(--k-ink) px-5 text-[14px] text-white transition-colors duration-300 hover:bg-(--k-maroon) lg:mt-auto"
                  >
                    {ARTISTS_PAGE.cardCta}
                    <LineArrow />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** The phone preview: the work on grey, then the details on sky blue. */
function Preview({ artist }: { artist: (typeof ARTISTS)[number] }) {
  const lead = artist.works[0];
  return (
    <div className="border-t border-(--k-ink)">
      <div className={cn("flex justify-center p-4", GREY)}>
        <Image
          src={lead.image}
          alt={`${lead.title} by ${artist.name}`}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[60svh] w-auto max-w-full"
        />
      </div>
      <div className="border-t border-(--k-ink) bg-(--k-sky) p-4">
        <Tags artist={artist} />
        <p className="mt-3 line-clamp-5 text-[15px] leading-[1.4]">
          {artist.statement}
        </p>
        <a
          href={artist.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex h-12 items-center justify-between bg-(--k-ink) px-5 text-[14px] text-white"
        >
          {ARTISTS_PAGE.cardCta}
          <LineArrow />
        </a>
      </div>
    </div>
  );
}
