import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { ArrowLink, pad, SERVICES, type Service } from "./shared";

/**
 * Where each cell sits on the twelve-column, two-row block: the pictures and
 * the words alternate like a chequerboard, each service's words beside its
 * picture — Exhibitions across the top left, Art advisory turning the corner
 * from top right to bottom left, Bespoke sourcing across the bottom right.
 */
const PLACES: { picture: string; words: string; tone: Tone }[] = [
  {
    picture: "lg:col-span-4 lg:col-start-1 lg:row-start-1",
    words: "lg:col-span-4 lg:col-start-5 lg:row-start-1",
    tone: "navy",
  },
  {
    picture: "lg:col-span-4 lg:col-start-9 lg:row-start-1",
    words: "lg:col-span-4 lg:col-start-1 lg:row-start-2",
    tone: "ink",
  },
  {
    picture: "lg:col-span-4 lg:col-start-5 lg:row-start-2",
    words: "lg:col-span-4 lg:col-start-9 lg:row-start-2",
    tone: "light",
  },
];

type Tone = "light" | "ink" | "navy";

/** Ground of each tone of text cell. */
const GROUND: Record<Tone, string> = {
  light: "bg-white text-(--k-ink)",
  ink: "bg-(--k-ink) text-white",
  navy: "bg-(--k-navy) text-white",
};

/** A service's words, filling one cell. */
function Words({
  service,
  n,
  tone,
}: {
  service: Service;
  n: number;
  tone: Tone;
}) {
  const dark = tone !== "light";
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-8 p-4 lg:p-5",
        GROUND[tone],
      )}
    >
      <div>
        <p
          className={cn(
            "text-[13px] tabular-nums",
            dark ? "text-white/50" : "text-(--k-ink)/50",
          )}
        >
          {pad(n)}
        </p>
        <h3 className="mt-1 text-[28px] leading-none tracking-[-0.035em] lg:text-[32px]">
          {service.title}
        </h3>
        <p
          className={cn(
            CAPS,
            "mt-3 text-[10px]",
            dark ? "text-white/60" : "text-(--k-ink)/60",
          )}
        >
          {service.headline}
        </p>
        <p
          className={cn(
            "mt-3 text-[14px] leading-[1.5]",
            dark ? "text-white/75" : "text-(--k-ink)/75",
          )}
        >
          {service.body}
        </p>
      </div>
      <div>
        <ul
          className={cn(
            "mb-5 space-y-1 text-[13px]",
            dark ? "text-white/80" : "text-(--k-ink)/80",
          )}
        >
          {service.covers.slice(0, 2).map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <ArrowLink light={dark} href={service.cta.href}>
          {service.cta.label}
        </ArrowLink>
      </div>
    </div>
  );
}

/**
 * Variation 06 — Grid. The three services as cells of one block, like the
 * hero: twelve columns by two rows with no gaps, a full-colour picture and a
 * cell of words for each, set in a chequerboard so every service's words sit
 * beside its picture. Exhibitions' words are on navy and Art
 * advisory's on black. On a phone
 * each service stacks as picture over words.
 */
export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 lg:h-[calc(100svh-44px)] lg:min-h-[640px] lg:grid-cols-12 lg:grid-rows-2">
      {SERVICES.map((service, index) => {
        const place = PLACES[index];
        return [
          <div
            key={`${service.title}-picture`}
            className={cn(
              "relative h-[56vw] overflow-hidden lg:h-auto",
              place.picture,
            )}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>,
          <div key={`${service.title}-words`} className={place.words}>
            <Words service={service} n={index + 1} tone={place.tone} />
          </div>,
        ];
      })}
    </div>
  );
}
