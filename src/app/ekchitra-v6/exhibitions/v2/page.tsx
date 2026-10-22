import type { Metadata } from "next";

import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { EXHIBITIONS } from "@/components/sites/ekchitra-v6/data";
import { ExhibitionsGallery } from "@/components/sites/ekchitra-v6/exhibitions/ExhibitionsGallery";

export const metadata: Metadata = {
  title: "Exhibitions (v2) — EkChitra Art Gallery",
  description: "Current, upcoming and past exhibitions at EkChitra, Hyderabad.",
  robots: { index: false },
};

/**
 * TEMPORARY PLACEHOLDER — a gallery room from Unsplash (free licence),
 * unsplash.com/photos/a-room-with-a-lot-of-paintings-on-the-walls-PmF9EcHvFB0.
 * Replace with a photograph of EkChitra's own space.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/exhibitions-banner-unsplash.jpg",
  alt: "",
};

/** Exhibitions, v6 — version 2: the shared frame over a Goodman-style list. */
export default function EkchitraV6ExhibitionsV2Page() {
  return (
    <PageFrame
      banner={BANNER}
      label="Exhibitions"
      title="Current, upcoming and past"
      intro="Every exhibition begins with an idea, and every visit begins with curiosity."
      note={`${EXHIBITIONS.length} exhibitions`}
    >
      <ExhibitionsGallery />
    </PageFrame>
  );
}
