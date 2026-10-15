import { FOOTER, SERVICES } from "../ekchitra-redesign/data";
import { ABOUT_STORY } from "../ekchitra-v5/about-data";
import { ARTISTS, ARTIST_WORK_COUNT } from "../ekchitra-v5/artists-data";
import { EXHIBITIONS } from "../ekchitra-v5/exhibitions-data";
import { V5_ROUTES } from "../ekchitra-v5/shared";

/** Homepage v6 content — all of it from the gallery's own copy and records. */

export const V6_HOME = "/ekchitra-v6";

/** Links in the top bar and footer; pages still live in v5 for now. */
export const V6_NAV = [
  { label: "About", href: V5_ROUTES.about },
  { label: "Exhibitions", href: V5_ROUTES.exhibitions },
  { label: "Artists", href: V5_ROUTES.artists },
  { label: "Artworks", href: V5_ROUTES.artworks },
  { label: "Services", href: `${V6_HOME}#services` },
];

export const CONTACT =
  FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

export const SOCIAL = FOOTER.social;

export const STATEMENT = {
  words: ["Art is", "everywhere."],
  label: "About EkChitra",
  lead: ABOUT_STORY.lead,
  body: ABOUT_STORY.body,
  image: {
    src: "/sites/ekchitra-redesign/about/about-banner-hydart-2025.jpg",
    alt: "Visitors among the paintings at EkChitra, Hyderabad",
  },
};

export const STATS = [
  { value: EXHIBITIONS.length, suffix: "", label: "Exhibitions curated" },
  { value: ARTISTS.length, suffix: "", label: "Artists represented" },
  { value: ARTIST_WORK_COUNT, suffix: "+", label: "Works in the collection" },
];

/** What the gallery does — one stacked card each, in the brand colours. */
export const SERVICE_LIST = [
  {
    title: "Exhibitions",
    headline: "Every exhibition begins with an idea",
    body: "Every visit begins with curiosity — you don’t need to know about art to feel at home here. Every show is curated by Annapurna M.",
    image: {
      src: "/sites/ekchitra-redesign/about/gallery-a7b04229.jpg",
      alt: "Lighting the lamp at an EkChitra opening",
    },
    covers: ["Curated exhibitions", "Openings and walkthroughs", "Hyd Art"],
    cta: { label: "See the exhibitions", href: V5_ROUTES.exhibitions },
    tone: "bg-(--k-maroon) text-white",
    dark: true,
  },
  {
    title: SERVICES[1].title,
    headline: SERVICES[1].eyebrow,
    body: SERVICES[1].body,
    image: {
      src: "/sites/ekchitra-redesign/artists/anupama-choudhary-2.jpg",
      alt: "Arthanareeswara by Anupama Choudhary",
    },
    covers: [
      "Starting a collection",
      "Refining a collection",
      "Growing a collection",
    ],
    cta: { label: "Talk to the gallery", href: SERVICES[1].cta.href },
    tone: "bg-(--k-navy) text-white",
    dark: true,
  },
  {
    title: SERVICES[0].title,
    headline: SERVICES[0].eyebrow,
    body: SERVICES[0].body,
    image: {
      src: "/sites/ekchitra-redesign/placeholders/services-sourcing-unsplash.jpg",
      alt: "An artwork placed in a furnished interior",
    },
    covers: ["Homes", "Architects and designers", "Institutions"],
    cta: { label: SERVICES[0].cta.label, href: SERVICES[0].cta.href },
    tone: "bg-(--k-sky) text-(--k-ink)",
    dark: false,
  },
];

export const SERVICES_INTRO = {
  words: ["Art for", "spaces, minds", "& souls"],
  body: "Our journey began with a simple belief: that art has the power to transform spaces, inspire minds, and connect souls.",
};

export { ARTISTS, EXHIBITIONS };
