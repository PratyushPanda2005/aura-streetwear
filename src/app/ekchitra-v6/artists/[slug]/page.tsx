import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ARTISTS } from "@/components/sites/ekchitra-v5/artists-data";
import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import {
  ArtistDetail,
  firstSentence,
} from "@/components/sites/ekchitra-v6/artists/ArtistDetail";
import { artistSlug } from "@/components/sites/ekchitra-v6/artists/paths";
import { ARTWORK_SIZES } from "@/components/sites/ekchitra-v6/artworks/sizes";
import type { ArtistWork } from "@/components/sites/ekchitra-v5/artists-data";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) =>
  ARTISTS.find((artist) => artistSlug(artist) === slug);

/** The artist's widest work, which crops best into the wide banner. */
const widestWork = (works: ArtistWork[]) =>
  [...works].sort((a, b) => {
    const [aw, ah] = ARTWORK_SIZES[a.image] ?? [1, 1];
    const [bw, bh] = ARTWORK_SIZES[b.image] ?? [1, 1];
    return bw / bh - aw / ah;
  })[0];

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
 * An artist's page, v6: the shared page frame every inner page uses, with
 * their widest work as the banner and their name set over it — then a short
 * centred line, the works, the bio, the other artists and an enquiry card.
 */
export default async function EkchitraV6ArtistPage({ params }: Props) {
  const artist = find((await params).slug);
  if (!artist) notFound();
  const count = artist.works.length;
  const wide = widestWork(artist.works);

  return (
    <PageFrame
      banner={{ src: wide.image, alt: `${wide.title} by ${artist.name}` }}
      nameOnBanner
      label="Artist"
      title={artist.name}
      intro={firstSentence(artist.statement)}
      note={`${count} ${count === 1 ? "work" : "works"} at EkChitra`}
    >
      <ArtistDetail artist={artist} />
    </PageFrame>
  );
}
