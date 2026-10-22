import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { BODY, CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { SmoothScroll } from "../SmoothScroll";
import { TopBar } from "../TopBar";
import { FooterMark } from "../footer-variants/FooterMark";
import { GRID, HEAD } from "../styles";

/**
 * TEMPORARY PLACEHOLDER — the Unsplash photograph already used on the v5
 * artists page. Replace with an EkChitra photograph.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artists-banner-unsplash.jpg",
  alt: "",
};

/**
 * The frame every version of the artists page shares, as the artworks page
 * is set: top bar, a full-width banner, the label, a line and the intro,
 * then the artists in whichever format, and the shared footer.
 */
export function ArtistsFrame({ children }: { children: ReactNode }) {
  return (
    <main className={cn("min-h-svh bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />

      {/* The banner, full width under the top bar. */}
      <div className="relative h-[36svh] min-h-[240px] overflow-hidden bg-(--k-ink) lg:h-[44svh]">
        <Image
          src={BANNER.src}
          alt={BANNER.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className={cn(GRID, HEAD, "gap-y-6")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[10px] text-(--k-ink)/70")}>
            {ARTISTS_PAGE.label}
          </p>
          <h1 className={cn(TITLE, "mt-3")}>Meet the artists</h1>
        </div>
        <div className="col-span-4 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <p className={cn(BODY, "text-(--k-ink)/80")}>{ARTISTS_PAGE.intro}</p>
          <p className="mt-2 text-[13px] tabular-nums">
            {ARTISTS.length} artists represented
          </p>
        </div>
      </div>

      {children}
      <FooterMark />
    </main>
  );
}
