import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_CURATOR } from "../../ekchitra-v5/about-data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";
import { CONTACT, EXHIBITIONS } from "../data";
import { GRID } from "../styles";

const C = ABOUT_CURATOR;
const FIRST_YEAR = Math.min(
  ...EXHIBITIONS.map((show) =>
    Number(show.dates.match(/\b20\d{2}\b/)?.[0]),
  ).filter(Boolean),
);
const FACTS = [
  { value: pad(EXHIBITIONS.length), label: "Exhibitions curated" },
  { value: pad(ARTISTS.length), label: "Artists represented" },
  { value: String(FIRST_YEAR), label: "Curating since" },
];

function Portrait({
  className,
  sizes,
  grey = false,
}: {
  className?: string;
  sizes: string;
  grey?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-(--k-ink)/5", className)}>
      <Image
        src={C.image.src}
        alt={C.image.alt}
        fill
        sizes={sizes}
        className={cn("object-cover object-[50%_25%]", grey && "grayscale")}
      />
    </div>
  );
}

const NAME = "text-[40px] leading-[1] tracking-[-0.045em] lg:text-[3.6vw]";
const BODY = "text-[16px] leading-[1.5]";

/** 01 — Pull quote: her line set very large across the page, portrait and bio beneath. */
export function CuratorQuote() {
  return (
    <section className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "gap-y-10")}>
        <p className={cn(CAPS, "col-span-4 text-[12px] lg:col-span-12")}>
          About the curator
        </p>
        <blockquote className="col-span-4 text-[30px] leading-[1.1] tracking-[-0.035em] lg:col-span-11 lg:text-[4vw]">
          “{C.lead}”
        </blockquote>
        <Portrait
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="col-span-4 aspect-[3/4] lg:col-span-3"
        />
        <div className="col-span-4 lg:col-span-4 lg:col-start-5">
          <h3 className={cn(NAME, "lg:text-[2.6vw]")}>{C.name}</h3>
          <p className="mt-2 text-[15px]">{C.role}</p>
        </div>
        <div
          className={cn(
            BODY,
            "col-span-4 space-y-4 lg:col-span-4 lg:col-start-9",
          )}
        >
          {C.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 02 — Portrait banner: the portrait full width, her name over it, a frosted card with the bio. */
export function CuratorBanner() {
  return (
    <section
      className={cn(
        "relative h-[92svh] min-h-[640px] overflow-hidden bg-(--k-ink) text-(--k-ink)",
        SANS,
      )}
    >
      <Image
        src={C.image.src}
        alt={C.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-[50%_22%]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-(--k-ink)/55 via-transparent to-transparent" />
      <div className={cn(GRID, "absolute inset-0 items-end pb-5 lg:pb-8")}>
        <div className="col-span-4 text-white lg:col-span-6">
          <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
          <h3 className="mt-3 text-[56px] leading-[0.95] tracking-[-0.05em] lg:text-[6vw]">
            {C.name}
          </h3>
          <p className="mt-3 text-[16px]">{C.role}</p>
        </div>
        <div className="col-span-4 mt-6 bg-white/85 p-5 backdrop-blur-xl lg:col-span-4 lg:col-start-9 lg:mt-0">
          <p className="text-[18px] leading-[1.3] tracking-[-0.01em]">
            {C.lead}
          </p>
          <p className={cn(BODY, "mt-4 text-[15px]")}>{C.body[0]}</p>
        </div>
      </div>
    </section>
  );
}

/** 03 — Centred profile: a square portrait, the name and lead centred, the bio as one narrow column. */
export function CuratorCentred() {
  return (
    <section className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "justify-items-center gap-y-8 text-center")}>
        <Portrait
          sizes="320px"
          className="col-span-4 aspect-square w-[240px] lg:col-span-12 lg:w-[300px]"
        />
        <div className="col-span-4 lg:col-span-8 lg:col-start-3">
          <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
          <h3 className={cn(NAME, "mt-3")}>{C.name}</h3>
          <p className="mt-2 text-[15px]">{C.role}</p>
          <p className="mx-auto mt-8 max-w-[640px] text-[22px] leading-[1.3] tracking-[-0.02em] lg:text-[26px]">
            {C.lead}
          </p>
        </div>
        <div
          className={cn(
            BODY,
            "col-span-4 max-w-[560px] space-y-4 text-left lg:col-span-6 lg:col-start-4",
          )}
        >
          {C.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 04 — On brand black: portrait in black and white, her name large, the bio in white, and three figures. */
export function CuratorDark() {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-(--k-ink) py-16 text-white lg:py-24",
        SANS,
      )}
    >
      <Diamonds
        rows={30}
        shape="steps"
        side="right"
        tint="maroon"
        tintEvery={6}
        tintOpacity={0.6}
        className="absolute top-0 right-0 -z-10 w-[56px] text-white/[0.1] lg:w-[72px]"
      />
      <div className={cn(GRID, "items-start gap-y-10")}>
        <Portrait
          grey
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="col-span-4 aspect-[3/4]"
        />
        <div className="col-span-4 lg:col-span-7 lg:col-start-6">
          <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
          <h3 className="mt-3 text-[48px] leading-[0.95] tracking-[-0.05em] lg:text-[5vw]">
            {C.name}
          </h3>
          <p className="mt-2 text-[15px] text-white/80">{C.role}</p>
          <div
            className={cn(BODY, "mt-8 max-w-[600px] space-y-4 text-white/90")}
          >
            {C.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 border-t border-white/30 pt-5">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="text-[36px] leading-none tracking-[-0.04em] tabular-nums lg:text-[3vw]">
                  {fact.value}
                </dd>
                <dd className="mt-2 text-[13px] text-white/80">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** 05 — Fact sheet: a Swiss table of her details beside the portrait, the bio under a heavy rule. */
export function CuratorSheet() {
  const rows = [
    ["Name", C.name],
    ["Role", "Curator, EkChitra"],
    ["Based in", "Hyderabad, India"],
    ["Training", "Fine art; muralist"],
    ["Curated", `${EXHIBITIONS.length} exhibitions since ${FIRST_YEAR}`],
  ];
  return (
    <section className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "items-start gap-y-10")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
          <dl className="mt-6 border-t-2 border-(--k-ink)">
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[8rem_1fr] gap-x-5 border-b border-(--k-ink)/15 py-3 lg:grid-cols-[12rem_1fr]"
              >
                <dt className={cn(CAPS, "pt-1 text-[11px]")}>{k}</dt>
                <dd className="text-[20px] leading-[1.25] tracking-[-0.015em] lg:text-[24px]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div
            className={cn(
              BODY,
              "mt-10 space-y-4 lg:columns-2 lg:gap-x-5 lg:space-y-0 [&>p]:mb-4",
            )}
          >
            {C.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <Portrait
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="col-span-4 aspect-[2/3] lg:col-span-4 lg:col-start-9"
        />
      </div>
    </section>
  );
}

/** 06 — Curator and her shows: bio and portrait on the left, every exhibition she curated listed on the right. */
export function CuratorShows() {
  return (
    <section className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "items-start gap-y-10")}>
        <div className="col-span-4 lg:col-span-6">
          <div className="grid grid-cols-6 gap-x-5">
            <Portrait
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="col-span-3 aspect-[3/4]"
            />
            <div className="col-span-3 flex flex-col justify-end">
              <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
              <h3 className="mt-3 text-[34px] leading-[1] tracking-[-0.04em] lg:text-[2.8vw]">
                {C.name}
              </h3>
              <p className="mt-2 text-[15px]">{C.role}</p>
            </div>
          </div>
          <div className={cn(BODY, "mt-8 space-y-4")}>
            {C.body.slice(0, 2).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex h-12 w-full items-center justify-between bg-(--k-ink) px-5 text-[14px] text-white transition-colors duration-300 hover:bg-(--k-navy) sm:w-[300px]"
          >
            Talk to the curator
            <LineArrow />
          </a>
        </div>
        <div className="col-span-4 lg:col-span-5 lg:col-start-8">
          <p className="flex items-baseline justify-between border-y border-(--k-ink) py-3 text-[15px]">
            Curated by {C.name}
            <span className="text-[13px] tabular-nums">
              {pad(EXHIBITIONS.length)}
            </span>
          </p>
          <ol>
            {EXHIBITIONS.map((show, i) => (
              <li
                key={show.title}
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-b border-(--k-ink)/15 py-2.5 text-[15px]"
              >
                <span className="text-[12px] tabular-nums">{pad(i + 1)}</span>
                <a
                  href={show.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {show.title}
                </a>
                <span className="text-[13px] whitespace-nowrap">
                  {show.dates.match(/\b20\d{2}\b/)?.[0] ?? "—"}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 00 — Current: her words pinned on the left, the portrait tall on the right. */
export function CuratorCurrent() {
  return (
    <section className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "items-start gap-y-10")}>
        <div className="col-span-4 lg:sticky lg:top-[calc(44px+2rem)] lg:col-span-5">
          <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
          <h3 className={cn(NAME, "mt-3")}>{C.name}</h3>
          <p className="mt-2 text-[15px]">{C.role}</p>
          <div className={cn(BODY, "mt-8 space-y-4")}>
            {C.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <Portrait
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="col-span-4 aspect-[2/3] lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>
  );
}
