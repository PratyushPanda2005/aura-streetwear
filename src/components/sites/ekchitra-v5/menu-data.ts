import { ARTWORKS, ARTWORKS_PAGE, FOOTER } from "../ekchitra-redesign/data";
import { EXHIBITIONS } from "./exhibitions-data";
import { V5_HOME, V5_ROUTES } from "./shared";

export interface MenuLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MenuPanel {
  /** Label of the top-level link the panel opens from. */
  for: string;
  columns: { title: string; links: MenuLink[] }[];
  card: { label: string; href: string; image: string; alt: string };
}

const CONTACT =
  FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

const artistId = (name: string) =>
  `artist-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

/** Every artist once, in the order their works appear. */
const ARTIST_NAMES = [...new Set(ARTWORKS.map((artwork) => artwork.artist))];

const artistLinks = (names: string[]): MenuLink[] =>
  names.map((name) => ({
    label: name,
    href: `${V5_ROUTES.artists}#${artistId(name)}`,
  }));

const exhibitionLinks = (status: "Current" | "Past", count: number) =>
  EXHIBITIONS.filter((exhibition) => exhibition.status === status)
    .slice(0, count)
    .map((exhibition) => ({
      label: exhibition.title,
      href: exhibition.href,
      external: true,
    }));

const cardArtwork = (artist: string) =>
  ARTWORKS.find((artwork) => artwork.artist === artist && !artwork.cutout) ??
  ARTWORKS[0];

const ARTISTS_CARD = cardArtwork("Vinod Daroz");
const ARTWORKS_CARD = cardArtwork("Ashok Juttu");

/** The panels that drop from the header, as on kettal.com. */
export const MENU_PANELS: MenuPanel[] = [
  {
    for: "About",
    columns: [
      {
        title: "Discover EkChitra",
        links: [
          { label: "Our story", href: V5_ROUTES.about },
          { label: "Our curator", href: `${V5_ROUTES.about}#curator` },
          { label: "Exhibitions", href: V5_ROUTES.exhibitions },
          { label: "Artists", href: V5_ROUTES.artists },
          { label: "Artworks", href: V5_ROUTES.artworks },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Bespoke sourcing", href: `${V5_HOME}#services` },
          { label: "Art advisory", href: `${V5_HOME}#services` },
          { label: "Contact us", href: CONTACT.href, external: true },
        ],
      },
      {
        title: "Follow us",
        links: FOOTER.social.map((link) => ({ ...link, external: true })),
      },
    ],
    card: {
      label: "Visit the gallery",
      href: V5_ROUTES.about,
      image: "/sites/ekchitra-redesign/images/gallery-space-hyderabad.webp",
      alt: "EkChitra gallery, Hyderabad",
    },
  },
  {
    for: "Exhibitions",
    columns: [
      { title: "Current", links: exhibitionLinks("Current", 2) },
      { title: "Recent", links: exhibitionLinks("Past", 6) },
    ],
    card: {
      label: "View all exhibitions",
      href: V5_ROUTES.exhibitions,
      image: "/sites/ekchitra-redesign/exhibitions/living-temple-2025.jpg",
      alt: "Living Temple exhibition",
    },
  },
  {
    for: "Artists",
    columns: [
      { title: "Artists", links: artistLinks(ARTIST_NAMES.slice(0, 5)) },
      { title: "", links: artistLinks(ARTIST_NAMES.slice(5, 10)) },
      { title: "", links: artistLinks(ARTIST_NAMES.slice(10)) },
    ],
    card: {
      label: "Explore all artists",
      href: V5_ROUTES.artists,
      image: ARTISTS_CARD.image,
      alt: `${ARTISTS_CARD.title} by ${ARTISTS_CARD.artist}`,
    },
  },
  {
    for: "Artworks",
    columns: [
      {
        title: "By medium",
        links: ARTWORKS_PAGE.quickSearches.map((label) => ({
          label,
          href: `${V5_ROUTES.artworks}?medium=${encodeURIComponent(label)}`,
        })),
      },
      {
        title: "Browse",
        links: [
          { label: "All artworks", href: V5_ROUTES.artworks },
          { label: "Enquire about a work", href: CONTACT.href, external: true },
        ],
      },
    ],
    card: {
      label: "View all artworks",
      href: V5_ROUTES.artworks,
      image: ARTWORKS_CARD.image,
      alt: `${ARTWORKS_CARD.title} by ${ARTWORKS_CARD.artist}`,
    },
  },
];
