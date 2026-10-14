export interface Exhibition {
  status: "Current" | "Past";
  title: string;
  /** Line under the title. */
  subtitle: string;
  /** As listed on ekchitra.com. */
  dates: string;
  image: string;
  /** The exhibition's page on ekchitra.com. */
  href: string;
}

const DIR = "/sites/ekchitra-redesign/exhibitions";
const SITE = "https://www.ekchitra.com/exhibitions";
const CURATOR = "Curated by Annapurna M";

/**
 * Every exhibition listed on ekchitra.com/exhibitions, in the site's order:
 * the current shows, then the past ones, newest first. Titles, dates and
 * posters are the site's own. Dates are copied as published — including
 * "August 30 – 29 Sept, 2025" for House of Unified Expression, which looks like
 * a typo to check with the gallery — and are left blank where the site gives
 * none.
 */
export const EXHIBITIONS: Exhibition[] = [
  {
    status: "Current",
    title: "Living Temple 2026",
    subtitle: CURATOR,
    dates: "Dates to be announced",
    image: `${DIR}/living-temple-2026.jpg`,
    href: SITE,
  },
  {
    status: "Current",
    title: "Hyd Art 2026",
    subtitle: CURATOR,
    dates: "December 3 – 4, 2026",
    image: `${DIR}/hyd-art-2026.jpg`,
    href: `${SITE}/hyd-art`,
  },
  {
    status: "Past",
    title: "Hyd Art",
    subtitle: CURATOR,
    dates: "December 19 – 21, 2025",
    image: `${DIR}/hyd-art-2025.jpg`,
    href: `${SITE}/hyd-art`,
  },
  {
    status: "Past",
    title: "Swadhatri",
    subtitle: CURATOR,
    dates: "March 7 – 16, 2025",
    image: `${DIR}/swadhatri-2025.jpg`,
    href: `${SITE}/swadhatri`,
  },
  {
    status: "Past",
    title: "Living Temple",
    subtitle: CURATOR,
    dates: "February 28 – March 4, 2025",
    image: `${DIR}/living-temple-2025.jpg`,
    href: `${SITE}/living-temple`,
  },
  {
    status: "Past",
    title: "Naik City",
    subtitle: CURATOR,
    dates: "February 14 – 23, 2025",
    image: `${DIR}/naik-city-2025.jpg`,
    href: `${SITE}/naik-city`,
  },
  {
    status: "Past",
    title: "House of Unified Expression",
    subtitle: CURATOR,
    dates: "August 30 – 29 Sept, 2025",
    image: `${DIR}/house-of-unified-expression.jpg`,
    href: `${SITE}/house-of-unified-express`,
  },
  {
    status: "Past",
    title: "Mirror Mirror – Champa Tree",
    subtitle: CURATOR,
    dates: "March 22, 2024",
    image: `${DIR}/mirror-mirror-champa-tree-2024.jpg`,
    href: `${SITE}/mirror-mirror-champa-tree`,
  },
  {
    status: "Past",
    title: "Katha Kathan",
    subtitle: CURATOR,
    dates: "January 21 – 29, 2024",
    image: `${DIR}/katha-kathan-2024.jpg`,
    href: `${SITE}/katha-kathan`,
  },
  {
    status: "Past",
    title: "Satirical Symphony",
    subtitle: CURATOR,
    dates: "2024",
    image: `${DIR}/satirical-symphony-2024.jpg`,
    href: `${SITE}/satirical-symphony`,
  },
  {
    status: "Past",
    title: "Once Upon a Time",
    subtitle: CURATOR,
    dates: "September 1, 2023",
    image: `${DIR}/once-upon-a-time-2023.jpg`,
    href: `${SITE}/once-upon-a-time`,
  },
  {
    status: "Past",
    title: "Tree of Life",
    subtitle: CURATOR,
    dates: "2022",
    image: `${DIR}/tree-of-life-2022.jpg`,
    href: `${SITE}/tree-of-life`,
  },
  {
    status: "Past",
    title: "Chitram",
    subtitle: CURATOR,
    dates: "2022",
    image: `${DIR}/chitram-2022.jpg`,
    href: `${SITE}/chitram`,
  },
  {
    status: "Past",
    title: "Shreekaram",
    subtitle: CURATOR,
    dates: "2021",
    image: `${DIR}/shreekaram-2021.jpg`,
    href: `${SITE}/shreekaram`,
  },
  {
    status: "Past",
    title: "Pause & Reflect",
    subtitle: CURATOR,
    dates: "2021",
    image: `${DIR}/pause-and-reflect-2021.jpg`,
    href: `${SITE}/pause-%26-reflect`,
  },
  {
    status: "Past",
    title: "Editions",
    subtitle: CURATOR,
    dates: "",
    image: `${DIR}/editions.jpg`,
    href: `${SITE}/editions`,
  },
  {
    status: "Past",
    title: "Daivatvam",
    subtitle: CURATOR,
    dates: "",
    image: `${DIR}/daivatvam.jpg`,
    href: `${SITE}/daivatvam`,
  },
  {
    status: "Past",
    title: "Unknowns 9",
    subtitle: CURATOR,
    dates: "",
    image: `${DIR}/unknowns-9.jpg`,
    href: `${SITE}/unknowns-9`,
  },
];
