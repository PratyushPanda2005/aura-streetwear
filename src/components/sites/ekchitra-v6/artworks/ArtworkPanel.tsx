"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import type { Artist, ArtistWork } from "../../ekchitra-v5/artists-data";
import { SANS } from "../../ekchitra-v5/shared";
import { firstSentence } from "../artists/ArtistDetail";
import { artistPath } from "../artists/paths";
import { CONTACT } from "../data";

export type PanelWork = ArtistWork & { artist: Artist };

/** How long the panel takes to slide down or up, ms (matches its duration class). */
const SLIDE_MS = 900;

/** A small outlined button, as the panel's Prev / Next pair. */
const STEP =
  "flex h-8 flex-1 items-center justify-center border border-(--k-ink)/30 text-[13px] transition-colors duration-200 hover:border-(--k-ink) disabled:pointer-events-none disabled:opacity-35";

/** The arrows on the picture: small white squares at its left and right. */
const ARROW =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 text-[16px] transition-opacity duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-0";

/**
 * An artwork's details, after the available-artworks view on
 * goodman-gallery.com: a full-screen panel that slides up from the foot of
 * the screen over the grid. "Artworks" at the top left and "Close" at the
 * top right; the work shown whole in the left half, with an arrow at each
 * side of it; at the right, Prev / Next buttons through the works in the
 * current list, the artist and the title, the
 * medium and size (as on ekchitra.com's product pages), a button to enquire
 * about this work and a link to the artist's page, the opening line of
 * the artist's statement, and small pictures of related works — the same
 * family of medium, or more by the artist — each opening in the panel. Esc closes it and the arrow keys step through; the
 * page behind doesn't scroll while it is open.
 */
export function ArtworkPanel({
  open,
  work,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onClose,
  related,
  onPick,
}: {
  open: boolean;
  /** The work to show; kept while the panel slides away after closing. */
  work: PanelWork | null;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  /** Other works to suggest, with what they have in common (e.g. "More in Acrylic"). */
  related: {
    label: string;
    works: { image: string; title: string; artist: string }[];
  };
  /** Show another work, by its image, in the panel. */
  onPick: (image: string) => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  const current = work;

  // Scroll lock and focus, once per opening (not on every Prev / Next, which
  // would unlock and relock the page and make it jump). The scrollbar's width
  // is padded back in while locked, so nothing behind the panel reflows.
  const unlock = useRef<number | null>(null);
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    // Reopened before the last close finished: the page is still locked.
    if (unlock.current !== null) {
      window.clearTimeout(unlock.current);
      unlock.current = null;
    } else {
      const gap = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      if (gap > 0) html.style.paddingRight = `${gap}px`;
    }
    // preventScroll: the panel is still above the screen at this moment.
    close.current?.focus({ preventScroll: true });
    return () => {
      // Unlock only once the panel has finished sliding up (900ms), so the
      // page doesn't reflow underneath it mid-slide.
      unlock.current = window.setTimeout(() => {
        html.style.overflow = "";
        html.style.paddingRight = "";
        unlock.current = null;
      }, SLIDE_MS);
    };
  }, [open]);

  // Never leave the page locked if the panel unmounts mid-close.
  useEffect(
    () => () => {
      if (unlock.current !== null) {
        window.clearTimeout(unlock.current);
        document.documentElement.style.overflow = "";
        document.documentElement.style.paddingRight = "";
      }
    },
    [],
  );

  // Keys while open: Esc closes, the arrows step through.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev) onPrev();
      if (event.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hasPrev, hasNext, onPrev, onNext, onClose]);

  const enquire = current
    ? `${CONTACT.href}?text=${encodeURIComponent(
        `Hello EkChitra, I'd like to enquire about "${current.title}" by ${current.artist.name}.`,
      )}`
    : "#";

  return (
    <div
      role="dialog"
      // Smooth scroll (Lenis) leaves wheel and touch inside the panel alone.
      data-lenis-prevent=""
      aria-modal="true"
      aria-label={
        current ? `${current.title} by ${current.artist.name}` : "Artwork"
      }
      aria-hidden={!open}
      className={cn(
        // Drops down from above, settling softly; rises back up on close.
        "fixed inset-0 z-[60] flex flex-col bg-white text-(--k-ink) transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none",
        open ? "translate-y-0" : "pointer-events-none -translate-y-full",
        SANS,
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4 text-[14px] lg:px-5">
        <span>Artworks</span>
        <button
          ref={close}
          type="button"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="hover:opacity-60"
        >
          Close
        </button>
      </div>

      {current && (
        <div
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            open ? "opacity-100 delay-500" : "opacity-0 delay-0",
            "grid min-h-0 flex-1 grid-cols-1 gap-y-8 overflow-y-auto px-4 pb-10 lg:grid-cols-12 lg:gap-x-5 lg:overflow-hidden lg:px-5 lg:pb-14",
          )}
        >
          {/* The work, whole, in the left half, with an arrow at each side. */}
          <div className="relative min-h-[50svh] lg:col-span-6 lg:col-start-1 lg:min-h-0">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              tabIndex={open ? 0 : -1}
              aria-label="Previous artwork"
              className={cn(ARROW, "left-0")}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              tabIndex={open ? 0 : -1}
              aria-label="Next artwork"
              className={cn(ARROW, "right-0")}
            >
              <span aria-hidden="true">→</span>
            </button>
            <Image
              key={current.image}
              src={current.image}
              alt={`${current.title} by ${current.artist.name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>

          {/* The details. */}
          <div className="flex flex-col lg:col-span-4 lg:col-start-8 lg:justify-center">
            <div className="flex gap-x-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                tabIndex={open ? 0 : -1}
                className={STEP}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                tabIndex={open ? 0 : -1}
                className={STEP}
              >
                Next
              </button>
            </div>

            <p className="mt-10 text-[26px] leading-[1.1] font-medium tracking-[-0.02em]">
              {current.artist.name}
            </p>
            <h2 className="mt-1 text-[26px] leading-[1.15] tracking-[-0.02em]">
              {current.title}
            </h2>
            <dl className="mt-5 space-y-1 text-[14px] text-(--k-ink)/70">
              <div className="flex gap-x-2">
                <dt>Medium:</dt>
                <dd>{current.medium}</dd>
              </div>
              <div className="flex gap-x-2">
                <dt>Size:</dt>
                <dd>{current.size}</dd>
              </div>
            </dl>

            <a
              href={enquire}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              className="mt-6 flex h-10 items-center justify-center bg-(--k-ink) text-[13px] text-white transition-opacity hover:opacity-85"
            >
              Enquire About This Artwork
            </a>
            <a
              href={artistPath(current.artist)}
              tabIndex={open ? 0 : -1}
              className="mt-4 self-start text-[13px] underline decoration-1 underline-offset-4 hover:no-underline"
            >
              About {current.artist.name}
            </a>

            <p className="mt-8 text-[14px] leading-[1.55]">
              {firstSentence(current.artist.statement)}
            </p>

            {/* Related works: the same family of medium, or more by the artist. */}
            {related.works.length > 0 && (
              <div className="mt-8 border-t border-(--k-ink)/15 pt-4">
                <p className="text-[13px]">{related.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {related.works.map((work) => (
                    <li key={work.image}>
                      <button
                        type="button"
                        onClick={() => onPick(work.image)}
                        tabIndex={open ? 0 : -1}
                        title={`${work.title} — ${work.artist}`}
                        className="block transition-opacity duration-200 hover:opacity-75 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-(--k-ink)"
                      >
                        <Image
                          src={work.image}
                          alt={`${work.title} by ${work.artist}`}
                          width={0}
                          height={0}
                          sizes="96px"
                          className="h-16 w-auto"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
