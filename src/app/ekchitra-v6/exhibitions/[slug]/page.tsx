import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SANS } from "@/components/sites/ekchitra-v5/shared";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import {
  EXHIBITIONS,
  exhibitionSlug,
} from "@/components/sites/ekchitra-v6/data";
import { ExhibitionDetail } from "@/components/sites/ekchitra-v6/exhibitions/ExhibitionDetail";
import { DETAILS } from "@/components/sites/ekchitra-v6/exhibitions/details";
import { FooterCard } from "@/components/sites/ekchitra-v6/footer-variants/FooterCard";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const indexOf = (slug: string) =>
  EXHIBITIONS.findIndex((show) => exhibitionSlug(show) === slug);

/** One page per exhibition, built ahead of time. */
export function generateStaticParams() {
  return EXHIBITIONS.map((show) => ({ slug: exhibitionSlug(show) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = EXHIBITIONS[indexOf(slug)];
  if (!show) return {};
  return {
    title: `${show.title} — EkChitra Art Gallery`,
    description:
      DETAILS[slug]?.overview[0]?.text ??
      `${show.title} at EkChitra, Hyderabad.`,
  };
}

/**
 * An exhibition's page, v6: the title, the poster opening to full width, the
 * overview, the photographs of the show, its works and other shows (see
 * ExhibitionDetail), between the top bar and the shared footer.
 */
export default async function EkchitraV6ExhibitionPage({ params }: Props) {
  const { slug } = await params;
  const index = indexOf(slug);
  if (index < 0) notFound();
  const show = EXHIBITIONS[index];
  // The three shows after this one in the list, wrapping round.
  const others = [1, 2, 3].map(
    (step) => EXHIBITIONS[(index + step) % EXHIBITIONS.length],
  );

  return (
    <main className={cn("min-h-svh bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />
      <ExhibitionDetail show={show} detail={DETAILS[slug]} others={others} />
      <FooterCard />
    </main>
  );
}
