import { ARTWORKS, HERO_SLIDES } from "../ekchitra-redesign/data";
import { EXHIBITIONS } from "./exhibitions-data";

/** Content of the About page, from ekchitra.com/about. */

const ABOUT = "/sites/ekchitra-redesign/about";

const artwork = (artist: string) => {
  const found =
    ARTWORKS.find((item) => item.artist === artist && !item.cutout) ??
    ARTWORKS[0];
  return { src: found.image, alt: `${found.title} by ${found.artist}` };
};

export const ABOUT_HERO = {
  label: "About EkChitra",
  title: ["Where art", "meets soul"],
  image: {
    src: `${ABOUT}/about-banner-hydart-2025.jpg`,
    alt: "Visitors among the paintings at EkChitra, Hyderabad",
  },
};

export const ABOUT_STORY = {
  label: "Our story",
  lead: "EkChitra was founded with a vision to bridge the gap between exceptional contemporary Indian artists and art enthusiasts worldwide.",
  body: [
    "Our journey began with a simple belief: that art has the power to transform spaces, inspire minds, and connect souls.",
    "Today, we proudly showcase a diverse collection of contemporary artworks, from bold abstracts to serene landscapes, each piece carefully curated to bring beauty and meaning into your life.",
  ],
};

/** Pictures for the gallery strip; `tall` ones are portrait. */
export const ABOUT_GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  HERO_SLIDES[1],
  { ...artwork("Anupama Choudhary"), tall: true },
  HERO_SLIDES[0],
  { ...artwork("Parul Kaur"), tall: true },
  HERO_SLIDES[2],
  { ...artwork("Selva Kumar"), tall: true },
];

/**
 * "How we work", from the Lovable structure (About, section 04). Each `body`
 * line is Lovable's; each `detail` is drawn from EkChitra's existing copy
 * (homepage "Why we exist", services, Lovable About intro, curator bio).
 */
export const ABOUT_VALUES = {
  label: "How we work",
  image: {
    src: `${ABOUT}/gallery-a7b04229.jpg`,
    alt: "Lighting the lamp at an EkChitra opening",
  },
  items: [
    {
      title: "Curiosity",
      body: "We begin with looking.",
      detail:
        "Every exhibition begins with an idea, and every visit begins with curiosity — you don’t need to know about art to feel at home here.",
      image: artwork("Ashok Juttu"),
    },
    {
      title: "Context",
      body: "Every work belongs to a larger story.",
      detail:
        "From temple carvings and cinema posters to family photographs, textiles and handwritten signs, visual culture has always shaped how we understand identity, memory and belonging.",
      image: artwork("Vinod Daroz"),
    },
    {
      title: "Connection",
      body: "Art becomes meaningful when it enters a life.",
      detail:
        "Art selection, curation and placement shaped around a particular space, and considered guidance for starting, refining or growing a collection.",
      image: artwork("Rajesh Naik"),
    },
    {
      title: "Conversation",
      body: "A gallery is a place to exchange ideas.",
      detail:
        "Knowledgeable without being intimidating, and always open to a conversation — amplifying the voices of artists so their stories reach diverse audiences.",
      image: artwork("Subodh Kerkar"),
    },
  ],
};

export const ABOUT_CURATOR = {
  title: "Curator",
  name: "Annapurna M",
  role: "Curator, EkChitra · Hyderabad",
  lead: "A dynamic force in the world of art — a passionate creator whose heart beats for contemporary expression.",
  image: {
    src: `${ABOUT}/curator-annapurna-m.jpg`,
    alt: "Annapurna M, curator of EkChitra",
  },
  body: [
    "Annapurna M is a passionate creator whose fine art training breathes life into vibrant murals. A true advocate for the arts, she tirelessly amplifies the voices of artists, ensuring their stories and visions reach diverse audiences across multiple platforms.",
    "As a curator, Annapurna possesses a rare and purposeful vision. She is a bridge, connecting the rich world of art with its wider community. In her role as an art curator based in Hyderabad, India, she fosters a fertile ground where creativity flourishes and opportunities blossom. Through unwavering dedication, she champions Indian art, both locally and globally, ensuring it receives the recognition and reverence it rightfully deserves.",
    "A visionary at the helm, Annapurna turns each curated exhibition into an extraordinary celebration — an arena where innovation, passion, and artistry come alive, offering artists the perfect stage to showcase their masterpieces.",
  ],
};

/** Posters for the moving strip: every show except the text-only Hyd Art 2026. */
const POSTERS = EXHIBITIONS.filter((show) => show.title !== "Hyd Art 2026");

export const ABOUT_EXHIBITIONS = {
  statement: `${EXHIBITIONS.length} exhibitions, each curated by Annapurna M — from Shreekaram and Chitram to Living Temple and Hyd Art.`,
  posters: POSTERS.map((show) => ({ src: show.image, title: show.title })),
  by: "Exhibitions at EkChitra, Hyderabad",
};
