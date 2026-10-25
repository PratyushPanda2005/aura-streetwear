"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { pad } from "../cta-variants/shared";
import { BUTTON, GRID, ITEM_TITLE, SECTION_TITLE } from "../styles";
import { artistPath } from "./paths";

/** An artist's mediums, short and without repeats: "Acrylic", "Mixed Media". */
const mediums = (artist: (typeof ARTISTS)[number]) =>
  Array.from(
    new Set(
      artist.works.map((work) => work.medium.replace(/\s+on\s+.*/i, "").trim()),
    ),
  ).slice(0, 3);

/**
 * Artists as an index with a pinned preview, on the v6 grid. Columns 1–4
 * hold every name in ruled rows, each with its number and how many works it
 * has here; the chosen one in black, the rest a mid grey that still meets
 * 4.5:1 contrast. Columns 5–12 stay pinned
 * under the top bar while the list scrolls: the chosen artist's lead work,
 * centred at its own proportions, in 5–8, and in 9–12 their number, name,
 * mediums, statement, the work's title and size, the rest of their works as
 * small thumbnails and a link to their page — the two columns one height,
 * the button on the foot. Panels cross-fade (the old one clears, then the
 * new one settles in); hovering waits a beat before choosing, so skimming
 * the list doesn't flicker. On a phone each name opens its own preview
 * beneath it instead.
 */
export function ArtistsIndex() {
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
      className={cn("bg-white pb-16 text-(--k-ink) lg:pb-24", SANS)}
    >
      <div className={cn(GRID, "items-start")}>
        {/* The names. */}
        <ol className="col-span-4 lg:col-span-4">
          {ARTISTS.map((item, index) => {
            const on = index === active;
            return (
              <li key={item.id} id={item.id} className="">
                <button
                  type="button"
                  onMouseEnter={() => choose(index, 140)}
                  onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                  onFocus={() => choose(index)}
                  onClick={() => choose(index)}
                  aria-expanded={on}
                  className={cn(
                    "grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-3 text-left transition-colors duration-300",
                    on
                      ? "text-(--k-ink)"
                      : // 60% keeps 4.5:1 contrast on white, so even the
                        // small numbers stay readable.
                        "text-(--k-ink)/60 hover:text-(--k-ink)/85",
                  )}
                >
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className={ITEM_TITLE}>{item.name}</span>
                  <span className="text-[13px] tabular-nums">
                    {pad(item.works.length)}
                  </span>
                </button>

                {/* On a phone, the preview opens under its name. */}
                {on && (
                  <div className="pb-6 lg:hidden">
                    <Preview artist={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* The pinned preview (desktop): the work in the middle, the
            details on the right, sharing one height. Every artist's panel is
            stacked in one cell and they cross-fade, the image settling up. */}
        <div className="hidden lg:sticky lg:top-[calc(44px+1.5rem)] lg:col-span-8 lg:grid lg:h-[calc(100svh-44px-3rem)] lg:max-h-[640px]">
          {ARTISTS.map((artist, index) => {
            const on = index === active;
            const [lead, ...rest] = artist.works;
            return (
              <div
                key={artist.id}
                aria-hidden={!on}
                className={cn(
                  "grid grid-cols-8 gap-x-5 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1] motion-reduce:transition-none",
                  // The outgoing panel clears quickly, then the new one fades
                  // in, so the two never overlap.
                  on
                    ? "opacity-100 delay-150 duration-700"
                    : "pointer-events-none opacity-0 delay-0 duration-300",
                )}
              >
                <div className="col-span-4 flex items-center justify-center overflow-hidden bg-(--k-ink)/[0.03] p-5">
                  <Image
                    src={lead.image}
                    alt={on ? `${lead.title} by ${artist.name}` : ""}
                    width={0}
                    height={0}
                    sizes="30vw"
                    className={cn(
                      // Multiply blends a photo's own white ground into the panel's grey.
                      "h-auto max-h-full w-auto max-w-full mix-blend-multiply transition-[translate,scale] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      on
                        ? "translate-y-0 scale-100"
                        : "translate-y-3 scale-[0.98]",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "col-span-4 flex flex-col pt-4 transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    on ? "translate-y-0" : "translate-y-2",
                  )}
                >
                  <p className="text-[13px] tabular-nums">
                    {pad(index + 1)} / {pad(ARTISTS.length)}
                  </p>
                  <h2 className={cn(SECTION_TITLE, "mt-2")}>{artist.name}</h2>
                  <p className={cn(CAPS, "mt-3 text-[11px]")}>
                    {mediums(artist).join(" · ")}
                  </p>
                  <p className="mt-4 line-clamp-5 text-[15px] leading-[1.45]">
                    {artist.statement}
                  </p>

                  <div className="mt-5 pt-3 text-[13px]">
                    <p>{lead.title}</p>
                    <p>{lead.size}</p>
                  </div>

                  {rest.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {rest.slice(0, 8).map((work) => (
                        <li key={work.image}>
                          <Image
                            src={work.image}
                            alt={on ? `${work.title} by ${artist.name}` : ""}
                            title={work.title}
                            width={0}
                            height={0}
                            sizes="96px"
                            className="h-16 w-auto xl:h-[4.5rem]"
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={artistPath(artist)}
                    tabIndex={on ? undefined : -1}
                    className={cn(BUTTON, "mt-6 lg:mt-auto")}
                  >
                    {ARTISTS_PAGE.cardCta}
                    <span aria-hidden="true">→</span>
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

/** The phone preview: the lead work, the statement and the link. */
function Preview({ artist }: { artist: (typeof ARTISTS)[number] }) {
  const lead = artist.works[0];
  return (
    <div>
      <Image
        src={lead.image}
        alt={`${lead.title} by ${artist.name}`}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
      />
      <p className={cn(CAPS, "mt-4 text-[11px]")}>
        {mediums(artist).join(" · ")}
      </p>
      <p className="mt-2 line-clamp-4 text-[15px] leading-[1.45]">
        {artist.statement}
      </p>
      <a href={artistPath(artist)} className={cn(BUTTON, "mt-5")}>
        {ARTISTS_PAGE.cardCta}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
