"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS } from "../ekchitra-v6/data";
import { DISPLAY, MONO, V5_ROUTES } from "./styles";
import { Arrow, Label, MonoButton } from "./ui";

const LIST = ARTISTS.slice(0, 8);
const pad = (n: number) => String(n).padStart(2, "0");

/** The artist's mediums, as short tags: "Mixed Media", "Oil". */
function mediums(index: number) {
  const tags = LIST[index].works.map((work) =>
    work.medium.replace(/\s+on\s+.*/i, ""),
  );
  return Array.from(new Set(tags)).slice(0, 2);
}

/**
 * Artists, after the reference's clients block: the section name huge in
 * the first two columns, then a list of artists with mono medium tags.
 * Hovering or choosing one shows it in the featured card — a work, the
 * artist's statement and a link — under a counter reading "01 — 08".
 */
export function Artists() {
  const [active, setActive] = useState(0);
  const artist = LIST[active];
  const work = artist.works[0];

  return (
    <section
      id="artists"
      aria-labelledby="e7-artists"
      className="scroll-mt-(--e7-header) border-b border-(--e7-rule)"
    >
      <div className="grid grid-cols-1 border-b border-(--e7-rule) lg:grid-cols-4">
        <h2
          id="e7-artists"
          className={cn(DISPLAY, "px-5 pt-16 pb-5 lg:col-span-2 lg:pt-[6vw]")}
        >
          Artists
        </h2>
        <div className="flex items-end justify-between px-5 pb-5 lg:col-span-2">
          <Label>Represented by EkChitra</Label>
          <p className={MONO} aria-live="polite">
            {pad(active + 1)} — {pad(LIST.length)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <ul className="border-(--e7-rule) lg:col-span-2 lg:border-r">
          {LIST.map((item, i) => (
            <li
              key={item.id}
              className="border-b border-(--e7-rule) last:border-b-0"
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "group flex w-full items-center justify-between gap-x-6 px-5 py-4 text-left transition-colors duration-300 lg:py-[1.15vw]",
                  active === i
                    ? "bg-(--e7-ink) text-white"
                    : "hover:bg-(--e7-grey)",
                )}
              >
                <span className="text-[24px] leading-none tracking-[-0.04em] lg:text-[2.2vw]">
                  {item.name}
                </span>
                <span className="flex shrink-0 gap-x-1.5">
                  {mediums(i).map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        MONO,
                        "hidden px-2 py-1 sm:inline",
                        active === i
                          ? "bg-white/15"
                          : "bg-(--e7-grey) group-hover:bg-white",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2">
          <div className="relative aspect-square bg-(--e7-grey) sm:aspect-auto">
            {LIST.map((item, i) => (
              <Image
                key={item.id}
                src={item.works[0].image}
                alt={
                  i === active ? `${item.works[0].title} by ${item.name}` : ""
                }
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={cn(
                  "object-cover p-5 transition-opacity duration-500",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between gap-y-10 border-l border-(--e7-rule) bg-(--e7-sky) p-5">
            <div>
              <p className={MONO}>{work.title}</p>
              <p className={cn(MONO, "mt-1 opacity-60")}>
                {work.medium} · {work.size}
              </p>
            </div>
            <p className="line-clamp-[9] text-[16px] leading-[1.25] tracking-[-0.02em]">
              {artist.statement}
            </p>
            <div className="flex flex-col items-start gap-y-3">
              <a
                href={artist.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  MONO,
                  "flex items-center gap-x-2 hover:opacity-70",
                )}
              >
                About {artist.name.split(" ")[0]}
                <Arrow />
              </a>
              <MonoButton href={V5_ROUTES.artists}>
                {`All ${ARTISTS.length} artists`}
              </MonoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
