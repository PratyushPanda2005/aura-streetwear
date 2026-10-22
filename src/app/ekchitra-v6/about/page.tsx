import type { Metadata } from "next";

import { ABOUT_HERO } from "@/components/sites/ekchitra-v5/about-data";
import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { AboutStory } from "@/components/sites/ekchitra-v6/about/AboutStory";
import { EXHIBITIONS } from "@/components/sites/ekchitra-v6/data";

export const metadata: Metadata = {
  title: "About — EkChitra Art Gallery",
  description:
    "EkChitra was founded to bridge exceptional contemporary Indian artists and art enthusiasts worldwide.",
};

/** About, v6: the shared frame over the gallery's story, after goodman-gallery.com/about. */
export default function EkchitraV6AboutPage() {
  return (
    <PageFrame
      banner={ABOUT_HERO.image}
      label={ABOUT_HERO.label}
      title={ABOUT_HERO.title.join(" ")}
      intro="A contemporary Indian art gallery in Hyderabad, curated by Annapurna M."
      note={`${EXHIBITIONS.length} exhibitions curated`}
      hideHeading
    >
      <AboutStory />
    </PageFrame>
  );
}
