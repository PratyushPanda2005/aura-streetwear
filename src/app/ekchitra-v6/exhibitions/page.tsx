import type { Metadata } from "next";

import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { EXHIBITIONS } from "@/components/sites/ekchitra-v6/data";
import { ExhibitionsRecord } from "@/components/sites/ekchitra-v6/exhibitions/ExhibitionsRecord";

export const metadata: Metadata = {
  title: "Exhibitions — EkChitra Art Gallery",
  description: "Current, upcoming and past exhibitions at EkChitra, Hyderabad.",
};

/**
 * TEMPORARY PLACEHOLDER — a gallery room from Unsplash (free licence),
 * unsplash.com/photos/a-room-with-a-lot-of-paintings-on-the-walls-PmF9EcHvFB0,
 * as on the v5 page. Replace with a photograph of EkChitra's own space.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/exhibitions-banner-unsplash.jpg",
  alt: "",
};

/** Exhibitions, v6: what is on now and next, then the archive by year. */
export default function EkchitraV6ExhibitionsPage() {
  return (
    <PageFrame
      banner={BANNER}
      label="Exhibitions"
      title="Current, upcoming and past"
      intro="Every exhibition begins with an idea, and every visit begins with curiosity."
      note={`${EXHIBITIONS.length} exhibitions`}
    >
      <ExhibitionsRecord />
    </PageFrame>
  );
}
