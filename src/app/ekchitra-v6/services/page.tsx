import type { Metadata } from "next";

import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { SERVICES_INTRO } from "@/components/sites/ekchitra-v6/data";
import {
  SERVICES_PHOTOS,
  ServicesPage,
} from "@/components/sites/ekchitra-v6/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services — EkChitra Art Gallery",
  description:
    "Art advisory for collectors and bespoke sourcing for spaces, from EkChitra in Hyderabad.",
};

/** Services, v6: the shared frame over the services, after goodman-gallery.com/goodman-advisory. */
export default function EkchitraV6ServicesPage() {
  return (
    <PageFrame
      banner={SERVICES_PHOTOS.banner}
      label="Services"
      title={SERVICES_INTRO.words.join(" ")}
      intro={SERVICES_INTRO.body}
      note="Art advisory and bespoke sourcing"
      hideHeading
    >
      <ServicesPage />
    </PageFrame>
  );
}
