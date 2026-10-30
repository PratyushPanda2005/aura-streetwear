"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/utils";

import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { artistPath } from "../artists/paths";
import { DETAILS as GALLERY } from "../contact/data";
import { CONTACT, EXHIBITIONS, V6_HOME } from "../data";
import { statusOf, VENUE, yearOf } from "../exhibitions-home/shared";
import { DriftPicture, useDrift } from "../motion";
import { LineArrow } from "../cta-variants/shared";
import { CARD_TITLE, FOOTER_GAP, GRID, ITEM_TITLE } from "../styles";
import type { ExhibitionDetail as Detail, Picture, ShowWork } from "./details";

type Show = (typeof EXHIBITIONS)[number];

const ALL_HREF = `${V6_HOME}/exhibitions`;

/**
 * Names compared without spacing, dots, case or the letter h, which
 * spellings drop ("BA Reddy" = "B.A. Reddy", "Choudary" = "Choudhary").
 */
const key = (name: string) => name.toLowerCase().replace(/[^a-gi-z]/g, "");

/** The artist's page here, when the gallery represents them. */
const artistHref = (name: string) => {
  const artist = ARTISTS.find((item) => key(item.name) === key(name));
  return artist ? artistPath(artist) : null;
};

const enquireHref = (text: string) =>
  `${CONTACT.href}?text=${encodeURIComponent(text)}`;

/** Placeholder posters are SVGs, which the image optimiser won't take. */
const unoptimized = (src: string) => src.endsWith(".svg");

/**
 * The space above each section after the overview — the same everywhere,
 * so the page keeps one rhythm (48px on phones, 64px on desktop).
 */
const GAP = "pt-12 lg:pt-16";

/** A sidebar heading, after KNMA's "When", "Where", "Artist". */
const SIDE_HEAD = "text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[26px]";

/**
 * An exhibition's page, v6. Under the top bar, the poster across the width,
 * one screen tall (whole, at its own shape, on phones). Then, after knma.org's pages, the overview at the left, as
 * plain text, beside a sidebar that stays in view: when, where, the
 * artists, and how many works; a slider of views of the show
 * (ViewsSlider); the works in justified rows, as on the Artworks page
 * (ShowWorks); and last, other exhibitions in the Exhibitions page's rows,
 * after goodman-gallery.com's.
 * Everything simply in place for visitors who prefer reduced motion.
 */
export function ExhibitionDetail({
  show,
  detail,
  others,
}: {
  show: Show;
  detail?: Detail;
  /** Shows to suggest at the foot of the page. */
  others: Show[];
}) {
  const root = useRef<HTMLDivElement>(null);
  useDrift(root, []);
  const works = detail?.works ?? [];
  const views = detail?.views ?? [];
  const [lead, ...rest] = detail?.overview ?? [];
  const year = yearOf(show);
  const artists = [
    ...new Set(works.map((work) => work.artist).filter(Boolean)),
  ] as string[];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(el);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Blocks settle in as they arrive.
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      });
    });

    // Pictures change the layout as they load.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <div ref={root} className={cn("bg-white text-(--k-ink)", SANS)}>
      {/* The opening: the poster across the width, one screen tall; the
          name is for screen readers, as the poster carries it. */}
      <header>
        <h1 className="sr-only">{show.title}</h1>

        <div
          data-poster=""
          className="relative aspect-video overflow-hidden bg-(--k-ink)/5 lg:aspect-auto lg:h-[calc(100svh-44px)] lg:min-h-[560px]"
        >
          <Image
            src={show.image}
            alt={`${show.title} — exhibition poster`}
            fill
            priority
            sizes="100vw"
            unoptimized={unoptimized(show.image)}
            className="object-cover"
          />
        </div>
      </header>

      {/* The overview at the left, the facts beside it. */}
      <section
        aria-labelledby="overview-heading"
        className={cn(GRID, "gap-y-14", GAP)}
      >
        <div className="col-span-4 lg:col-span-7">
          <h2
            id="overview-heading"

            className="text-[30px] leading-[1.1] tracking-[-0.035em] lg:text-[2.6vw]"
          >
            {detail?.tagline ?? "About the exhibition"}
          </h2>
          {lead ? (
            <>
              <p className="mt-8 text-[20px] leading-[1.4] tracking-[-0.015em] lg:mt-10 lg:text-[24px]">
                {lead.text}
              </p>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.55] text-(--k-ink)/80">
                {rest.map((paragraph) => (
                  <div key={paragraph.text.slice(0, 32)}>
                    {paragraph.heading && (
                      <h3
                        className={cn(CAPS, "mb-2 text-[11px] text-(--k-ink)")}
                      >
                        {paragraph.heading}
                      </h3>
                    )}
                    <p>{paragraph.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-8 text-[20px] leading-[1.4] tracking-[-0.015em] lg:text-[24px]">
              {show.status === "Current"
                ? `${show.title} comes to ${VENUE}. The works and the full story follow soon — ask us to hear first.`
                : `${show.title} was shown at ${VENUE}.`}
            </p>
          )}
        </div>

        <aside className="col-span-4 lg:col-span-4 lg:col-start-9">
          <dl className="space-y-10 lg:sticky lg:top-[76px]">
            <div>
              <dt className={SIDE_HEAD}>When</dt>
              <dd className="mt-3 space-y-2 text-[15px] leading-[1.5] text-(--k-ink)/80">
                <p>{show.dates || year || "Dates to be announced"}</p>
                <p>
                  {GALLERY.hours.days}, {GALLERY.hours.time}
                </p>
              </dd>
            </div>
            <div>
              <dt className={SIDE_HEAD}>Where</dt>
              <dd className="mt-3 text-[15px] leading-[1.5] text-(--k-ink)/80">
                <p className="text-(--k-ink)">{VENUE}</p>
                <p className="mt-2">
                  {GALLERY.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={GALLERY.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-(--k-ink) underline decoration-(--k-ink)/30 underline-offset-4 hover:decoration-(--k-ink)"
                >
                  Get Directions
                </a>
              </dd>
            </div>
            {artists.length > 0 && (
              <div>
                <dt className={SIDE_HEAD}>
                  {artists.length === 1 ? "Artist" : "Artists"}
                </dt>
                <dd className="mt-3 text-[15px] leading-[1.5] text-(--k-ink)/80">
                  {artists.map((name, index) => {
                    const href = artistHref(name);
                    return (
                      <span key={name}>
                        {href ? (
                          <a
                            href={href}
                            className="text-(--k-ink) underline decoration-(--k-ink)/30 underline-offset-4 hover:decoration-(--k-ink)"
                          >
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                        {index < artists.length - 1 && ", "}
                      </span>
                    );
                  })}
                </dd>
              </div>
            )}
            {works.length > 0 && (
              <div>
                <dt className={SIDE_HEAD}>In the exhibition</dt>
                <dd className="mt-3 text-[15px] leading-[1.5] text-(--k-ink)/80">
                  {works.length} {works.length === 1 ? "work" : "works"}
                  <a
                    href="#exhibition-artworks"
                    className="mt-3 block text-(--k-ink) underline decoration-(--k-ink)/30 underline-offset-4 hover:decoration-(--k-ink)"
                  >
                    See them below
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </section>

      {views.length > 0 && <ViewsSlider views={views} title={show.title} />}

      {works.length > 0 && <ShowWorks works={works} show={show} />}

      {/* Other exhibitions, after goodman-gallery.com's, in the rows of the
          Exhibitions page: title and line at the left, when beside them,
          the poster at the right. */}
      <section aria-labelledby="others-heading" className={cn(GAP, FOOTER_GAP)}>
        <div className={cn(GRID, "items-end pb-8 lg:pb-10")}>
          <h2
            id="others-heading"
            className={cn(TITLE, "col-span-3 lg:col-span-6")}
          >
            Other exhibitions
          </h2>
          <a
            href={ALL_HREF}
            className="group col-span-1 flex items-center justify-end gap-x-2 text-[14px] lg:col-span-6"
          >
            See All
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
        <ol className="space-y-5">
          {others.map((other) => (
            <li key={other.title}>
              <a
                href={other.href}
                className={cn(GRID, "group items-start gap-y-4")}
              >
                <span className="col-span-4 grid grid-cols-subgrid gap-y-3 lg:sticky lg:top-[calc(44px+2rem)] lg:col-span-6">
                  <span className="col-span-4 lg:col-span-3">
                    <span className={cn(ITEM_TITLE, "block")}>
                      {other.title}
                    </span>
                    <span className="mt-1 block text-[15px]">
                      {other.subtitle}
                    </span>
                  </span>
                  <span className="col-span-4 text-[14px] leading-[1.4] lg:col-span-3">
                    <span className="block">{statusOf(other)}</span>
                    <span className="block">
                      {other.dates || yearOf(other) || "Dates to be announced"}
                    </span>
                  </span>
                </span>
                <DriftPicture
                  src={other.image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="col-span-4 aspect-video lg:col-span-6"
                />
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/**
 * The works shown in the exhibition, as on the Artworks page: a heading as
 * on every page, then the works in justified rows — every work in a row one
 * height, each as wide as its proportions make it, the row filling the
 * width, never cropped — each with its number and medium, title, artist and
 * size, and "Enquire" sliding in on hover; a work links to an enquiry about
 * it.
 */
function ShowWorks({ works, show }: { works: ShowWork[]; show: Show }) {
  return (
    <section
      id="exhibition-artworks"
      aria-labelledby="artworks-heading"
      className={cn("scroll-mt-11", GAP)}
    >
      <div className={cn(GRID, "items-end gap-y-4 pb-8 lg:pb-10")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[12px]")}>{show.title}</p>
          <h2 id="artworks-heading" className={cn(TITLE, "mt-3")}>
            Exhibition artworks
          </h2>
        </div>
        <p className="col-span-4 text-[13px] tabular-nums lg:col-span-4 lg:col-start-9 lg:text-right">
          {String(works.length).padStart(2, "0")}{" "}
          {works.length === 1 ? "work" : "works"}
        </p>
      </div>
      {/* The trailing ::after soaks up the spare width in the last row so it
          stays at the base height. */}
      <ul className="flex flex-wrap items-start gap-x-3 gap-y-8 px-4 [--row-h:120px] after:grow-[999] after:content-[''] lg:gap-x-4 lg:gap-y-10 lg:px-5 lg:[--row-h:240px]">
        {works.map((work, index) => (
          <li
            key={work.src}
            data-rise=""
            style={{ "--ratio": work.width / work.height } as CSSProperties}
            className="min-w-0 grow-(--ratio) basis-[calc(var(--ratio)*var(--row-h))]"
          >
            <a
              href={enquireHref(
                `Hello EkChitra, I'd like to know more about "${work.title}"${
                  work.artist ? ` by ${work.artist}` : ""
                } from ${show.title}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <Image
                src={work.src}
                alt={
                  work.artist ? `${work.title} by ${work.artist}` : work.title
                }
                width={work.width}
                height={work.height}
                sizes="(min-width: 1024px) 620px, 360px"
                className="h-auto w-full"
              />
              <div className="mt-3 flex items-baseline justify-between gap-x-3 pt-2.5">
                <span className="text-[12px] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {work.medium && (
                  <span
                    className={cn(CAPS, "line-clamp-1 text-right text-[11px]")}
                  >
                    {work.medium}
                  </span>
                )}
              </div>
              <h3 className={cn(CARD_TITLE, "mt-2")}>{work.title}</h3>
              {work.artist && (
                <p className="mt-0.5 text-[14px]">{work.artist}</p>
              )}
              <div className="mt-2 flex items-center justify-between gap-x-3 text-[13px]">
                <span className="lg:shrink-0 lg:whitespace-nowrap">
                  {[work.size, work.year].filter(Boolean).join(", ")}
                </span>
                <span className="hidden min-w-0 items-center gap-x-2 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex">
                  Enquire
                  <LineArrow className="w-6" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** How long each view holds before the next slides in, ms. */
const HOLD = 5000;

/** How far a drag or swipe has to travel sideways to change the view, px. */
const SWIPE = 40;

/**
 * The views of the show, after east64films.com's about slider: one picture
 * at a time, 16:9 and centred, its neighbours peeking in at either side at
 * half strength; it moves on by itself and loops round without end. Under
 * the picture, "▸ Installation view" at the left and the place at the
 * right; under that, a dot per view, the current one stretched into a bar
 * that fills while it holds. Click a side picture or a dot, or swipe, to
 * move; stepping by hand restarts the hold. Doesn't move on its own for
 * reduced motion.
 */
function ViewsSlider({ views, title }: { views: Picture[]; title: string }) {
  const n = views.length;
  // Three copies in a row, so there is always a picture at either side; the
  // place runs over the middle copy and is moved back into it, unseen,
  // once a slide past either end has finished.
  const loop = [...views, ...views, ...views];
  const [place, setPlace] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [steps, setSteps] = useState(0);
  const start = useRef<number | null>(null);
  // Set by a swipe, so letting go doesn't also count as a click on a picture.
  const swiped = useRef(false);
  const active = ((place % n) + n) % n;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setAnimate(true);
      setPlace((at) => at + 1);
    }, HOLD);
    return () => window.clearTimeout(id);
  }, [place, steps]);

  const go = (to: number) => {
    setAnimate(true);
    setPlace(to);
    setSteps((count) => count + 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title}: views of the exhibition`}
      className={cn("overflow-hidden", GAP)}
    >
      <div
        className="relative touch-pan-y select-none [--gap:12px] [--w:84vw] lg:[--gap:24px] lg:[--w:55vw]"
        onPointerDown={(event) => {
          start.current = event.clientX;
          swiped.current = false;
        }}
        onPointerUp={(event) => {
          if (start.current === null) return;
          const moved = event.clientX - start.current;
          start.current = null;
          if (Math.abs(moved) < SWIPE) return;
          swiped.current = true;
          go(place + (moved < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        <ul
          style={{ "--at": place } as CSSProperties}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (place < n || place >= 2 * n) {
              setAnimate(false);
              setPlace(n + active);
            }
          }}
          className={cn(
            "flex gap-x-(--gap) translate-x-[calc(50vw-var(--w)/2-var(--at)*(var(--w)+var(--gap)))]",
            animate &&
              "transition-transform duration-[900ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none",
          )}
        >
          {loop.map((view, index) => {
            const current = index === place;
            return (
              <li
                key={`${view.src}-${index}`}
                aria-hidden={!current}
                className={cn(
                  "relative aspect-video w-(--w) shrink-0 overflow-hidden bg-(--k-ink)/5 transition-opacity duration-[800ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                  current ? "opacity-100" : "cursor-pointer opacity-50",
                )}
                onClick={() => {
                  if (!current && !swiped.current) go(index);
                }}
              >
                <Image
                  src={view.src}
                  alt={
                    current
                      ? `${title} at EkChitra, view ${(index % n) + 1} of ${n}`
                      : ""
                  }
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 55vw, 84vw"
                  className="object-cover"
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* The caption, as wide as the centred picture. */}
      <div
        className={cn(
          CAPS,
          "mx-auto mt-3 flex w-[84vw] justify-between text-[11px] lg:w-[55vw]",
        )}
      >
        <span>▸ Installation view</span>
        <span>@{VENUE}</span>
      </div>

      {/* A dot per view; the current one a bar that fills while it holds. */}
      <div className="mt-6 flex items-center justify-center gap-x-2">
        {views.map((view, index) => {
          const on = index === active;
          return (
            <button
              key={view.src}
              type="button"
              aria-label={`Show view ${index + 1} of ${n}`}
              aria-current={on}
              onClick={() => go(n + index)}
              className="flex h-6 items-center"
            >
              <span
                className={cn(
                  "relative block h-1 overflow-hidden rounded-full bg-(--k-ink)/25 transition-[width] duration-500",
                  on ? "w-12" : "w-1 hover:bg-(--k-ink)/50",
                )}
              >
                {on && (
                  <span
                    key={steps * 1000 + place}
                    className="absolute inset-0 origin-left animate-[ek6-fill_5000ms_linear_forwards] bg-(--k-ink) motion-reduce:animate-none"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
