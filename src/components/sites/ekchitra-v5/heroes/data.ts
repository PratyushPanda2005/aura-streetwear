import { V5_NAV } from "../shared";

/** Material shared by the hero studies: the gallery's own artworks and photographs. */

const ARTISTS = "/sites/ekchitra-redesign/artists";
const ARTWORKS = "/sites/ekchitra-redesign/artworks";
const IMAGES = "/sites/ekchitra-redesign/images";
const ABOUT = "/sites/ekchitra-redesign/about";

export interface HeroArt {
  src: string;
  title: string;
  artist: string;
  medium: string;
}

const art = (
  src: string,
  title: string,
  artist: string,
  medium: string,
): HeroArt => ({ src, title, artist, medium });

export const HERO_ART: HeroArt[] = [
  art(
    `${ARTISTS}/anupama-choudhary-1.jpg`,
    "Garuda",
    "Anupama Choudhary",
    "Mixed media",
  ),
  art(
    `${ARTISTS}/ashok-juttu-1.jpg`,
    "Unexplored Heritage - 051",
    "Ashok Juttu",
    "Acrylic & acid wash",
  ),
  art(
    `${ARTISTS}/charanjeet-singh-1.jpg`,
    "Untitled - 6",
    "Charanjeet Singh",
    "Acrylic on paper",
  ),
  art(
    `${ARTWORKS}/harmony-of-nature-and-mind--farhad-hussain.png`,
    "Harmony of Nature and Mind",
    "Farhad Hussain",
    "Acrylic on canvas",
  ),
  art(
    `${ARTISTS}/dilip-kumar-1.jpg`,
    "Paths - 2",
    "Dilip Kumar",
    "Acrylic on plywood",
  ),
  art(
    `${ARTWORKS}/vernacular-house-2--kolipitchai-prabhakar.png`,
    "Vernacular House",
    "Kolipitchai Prabhakar",
    "Acrylic on canvas",
  ),
  art(
    `${ARTISTS}/vinod-daroz-1.jpg`,
    "Sanctum",
    "Vinod Daroz",
    "Porcelain & gold",
  ),
  art(
    `${ARTWORKS}/meri-maa-ki-dua--rajesh-naik.png`,
    "Meri Maa Ki Dua",
    "Rajesh Naik",
    "Metal",
  ),
  art(
    `${ARTISTS}/anupama-choudhary-3.jpg`,
    "Warhalseque",
    "Anupama Choudhary",
    "Mixed media",
  ),
  art(
    `${ARTWORKS}/untitled-1--chandrapal-panjre.png`,
    "Untitled - 1",
    "Chandrapal Panjre",
    "Thread on cloth",
  ),
  art(
    `${ARTISTS}/charanjeet-singh-8.jpg`,
    "Untitled - 5",
    "Charanjeet Singh",
    "Acrylic on paper",
  ),
  art(
    `${ARTWORKS}/between-presence-and-absence-3--parul-kaur-trimmed.png`,
    "Between Presence and Absence 3",
    "Parul Kaur",
    "Watercolour",
  ),
  art(
    `${ARTISTS}/ashok-juttu-2.jpg`,
    "Untitled - 1",
    "Ashok Juttu",
    "Acrylic ink",
  ),
  art(
    `${ARTWORKS}/head-1--subodh-kerkar-trimmed.png`,
    "Head 1",
    "Subodh Kerkar",
    "Ceramic",
  ),
  art(
    `${ARTWORKS}/modified-continuity--sarvanan-parasuraman.png`,
    "Modified Continuity",
    "Sarvanan Parasuraman",
    "Paper board",
  ),
];

export const HERO_PHOTOS = {
  gallery: {
    src: `${IMAGES}/gallery-space-hyderabad.webp`,
    alt: "Inside the EkChitra gallery, Hyderabad",
  },
  opening: {
    src: `${IMAGES}/hero-dsc01932.jpg`,
    alt: "Lamp lighting at an EkChitra opening",
  },
  visitors: {
    src: `${ABOUT}/about-banner-hydart-2025.jpg`,
    alt: "Visitors among the paintings at EkChitra",
  },
  lamp: {
    src: `${ABOUT}/gallery-a7b04229.jpg`,
    alt: "Lighting the lamp at an EkChitra opening",
  },
};

export const HERO_COPY = {
  statement: "Art is everywhere. We help you notice.",
  body: "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
  city: "Hyderabad",
  coordinates: "17.3850° N · 78.4867° E",
  now: {
    label: "Now showing",
    title: "Living Temple 2026",
    image: "/sites/ekchitra-redesign/exhibitions/living-temple-2026.jpg",
  },
};

export const HERO_NAV = V5_NAV;

/** Current time in Hyderabad, as HH:MM. */
export const hyderabadTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
