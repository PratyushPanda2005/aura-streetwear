import { EVENTS } from "../ekchitra-redesign/data";

export interface Exhibition {
  status: "Ongoing" | "Upcoming" | "Past";
  title: string;
  /** Second line under the title: the curator, or the show's own strapline. */
  subtitle: string;
  venue: string;
  dates: string;
  /** Poster or installation image; omitted until one is supplied. */
  image?: string;
  href: string;
}

const DIR = "/sites/ekchitra-redesign/exhibitions";
const EXHIBITIONS_URL = "https://www.ekchitra.com/exhibitions";

/**
 * Every exhibition, newest first: the two shown on the homepage, then the past
 * shows listed on ekchitra.com. Straplines, dates and venues of the past shows
 * are as printed on their posters; where a poster gives only the year, so do we.
 */
export const EXHIBITIONS: Exhibition[] = [
  ...EVENTS.map((event): Exhibition => ({
    status: event.status === "Upcoming" ? "Upcoming" : "Ongoing",
    title: event.title,
    subtitle: event.curator,
    venue: event.venue,
    dates: event.dates,
    image: event.image,
    href: event.href,
  })),
  {
    status: "Past",
    title: "Hyd Art 2025",
    subtitle: "Hyderabad’s biggest art show",
    venue: "EON Hyderabad",
    dates: "20 — 21 Dec 2025",
    image: `${DIR}/hyd-art-2025.jpg`,
    href: EXHIBITIONS_URL,
  },
  {
    status: "Past",
    title: "Swadhatri",
    subtitle: "Rooted in memory",
    venue: "EkChitra, Hyderabad",
    dates: "2025",
    image: `${DIR}/swadhatri-2025.jpg`,
    href: EXHIBITIONS_URL,
  },
  {
    status: "Past",
    title: "Living Temple 2025",
    subtitle: "A celebration of timeless Indian heritage",
    venue: "EkChitra, Hyderabad",
    dates: "2025",
    image: `${DIR}/living-temple-2025.jpg`,
    href: EXHIBITIONS_URL,
  },
];
