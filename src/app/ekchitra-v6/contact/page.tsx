import type { Metadata } from "next";

import { HERO_SLIDES } from "@/components/sites/ekchitra-redesign/data";
import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { ContactDirectory } from "@/components/sites/ekchitra-v6/contact/ContactDirectory";
import { DETAILS } from "@/components/sites/ekchitra-v6/contact/data";

export const metadata: Metadata = {
  title: "Contact — EkChitra Art Gallery",
  description:
    "Visit, call or write to EkChitra, a contemporary Indian art gallery in HITEC City, Hyderabad.",
};

/** Contact, v6: the shared frame over the gallery's details, after goodman-gallery.com/contact. */
export default function EkchitraV6ContactPage() {
  return (
    <PageFrame
      banner={HERO_SLIDES[0]}
      label="Contact"
      title="Get in touch"
      intro="We’d love to hear from you."
      note={`${DETAILS.hours.days}, ${DETAILS.hours.time}`}
    >
      <ContactDirectory />
    </PageFrame>
  );
}
