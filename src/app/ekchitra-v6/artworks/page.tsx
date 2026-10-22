import type { Metadata } from "next";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTWORKS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import { ARTIST_WORK_COUNT } from "@/components/sites/ekchitra-v5/artists-data";
import { BODY, CAPS, SANS, TITLE } from "@/components/sites/ekchitra-v5/shared";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { ArtworksIndex } from "@/components/sites/ekchitra-v6/artworks/ArtworksIndex";
import { FooterMark } from "@/components/sites/ekchitra-v6/footer-variants/FooterMark";
import { GRID, HEAD } from "@/components/sites/ekchitra-v6/styles";

/**
 * TEMPORARY PLACEHOLDER — a visitor in front of six paintings in a gallery
 * (Unsplash, free licence — unsplash.com/photos/xJXxMR5PXoY, by Clem
 * Onojeghuo). Replace with an EkChitra photograph.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artworks-banner-unsplash-onojeghuo.jpg",
  alt: "A visitor looking at paintings hung on a gallery wall",
};

export const metadata: Metadata = {
  title: "Artworks — EkChitra Art Gallery",
  description: ARTWORKS_PAGE.intro,
};

/**
 * Artworks, v6: the homepage's top bar and footer around a white page on the
 * Swiss grid — a full-width banner photograph, then the label, a line and the
 * intro over every work in columns, each at its own proportions.
 */
export default async function EkchitraV6ArtworksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // A medium to filter by, e.g. /ekchitra-v6/artworks?medium=Acrylic.
  const { medium } = await searchParams;

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
          className="object-cover object-[50%_45%]"
        />
      </div>

      <div className={cn(GRID, HEAD, "gap-y-6")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[10px] text-(--k-ink)/70")}>
            {ARTWORKS_PAGE.label}
          </p>
          <h1 className={cn(TITLE, "mt-3")}>Discover and collect</h1>
        </div>
        <div className="col-span-4 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <p className={cn(BODY, "text-(--k-ink)/80")}>{ARTWORKS_PAGE.intro}</p>
          <p className="mt-2 text-[13px] tabular-nums">
            {ARTIST_WORK_COUNT} works on view
          </p>
        </div>
      </div>

      <ArtworksIndex initialQuery={typeof medium === "string" ? medium : ""} />
      <FooterMark />
    </main>
  );
}
