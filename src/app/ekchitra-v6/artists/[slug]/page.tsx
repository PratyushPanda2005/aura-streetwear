import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ARTISTS } from "@/components/sites/ekchitra-v5/artists-data";
import { SANS } from "@/components/sites/ekchitra-v5/shared";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { ArtistDetail } from "@/components/sites/ekchitra-v6/artists/ArtistDetail";
import { artistSlug } from "@/components/sites/ekchitra-v6/artists/paths";
import { FooterCard } from "@/components/sites/ekchitra-v6/footer-variants/FooterCard";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) =>
  ARTISTS.find((artist) => artistSlug(artist) === slug);

/** One page per artist, built ahead of time. */
export function generateStaticParams() {
  return ARTISTS.map((artist) => ({ slug: artistSlug(artist) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = find((await params).slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — EkChitra Art Gallery`,
    description: artist.statement,
  };
}

/**
 * An artist's page, v6: no banner — the top bar, then the artist's own
 * intro and works (see ArtistDetail), then the shared footer.
 */
export default async function EkchitraV6ArtistPage({ params }: Props) {
  const artist = find((await params).slug);
  if (!artist) notFound();

  return (
    <main className={cn("min-h-svh bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />
      <ArtistDetail artist={artist} />
      <FooterCard />
    </main>
  );
}
