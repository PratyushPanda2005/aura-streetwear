import { EXHIBITIONS, V6_HOME } from "../data";

/**
 * The shows every homepage exhibitions iteration uses: the latest three,
 * newest first, whose posters are full-bleed images that fill a frame
 * (Where Light Rests has only a placeholder, and Swadhatri's poster is on
 * white, so both are left out).
 */
const TITLES = ["Living Temple 2026", "Hyd Art", "House of Unified Expression"];

export const SHOWS = TITLES.map((title) =>
  EXHIBITIONS.find((show) => show.title === title),
).filter((show) => show !== undefined);

export type Show = (typeof SHOWS)[number];

/** Where every show is held. */
export const VENUE = "EkChitra, Hyderabad";

/** The exhibitions page, for "all exhibitions" links. */
export const ALL_HREF = `${V6_HOME}/exhibitions`;

/**
 * "Upcoming" for a current show with dates or dates still to be announced,
 * "Now on" otherwise; else "Past".
 */
export const statusOf = (show: Show) =>
  show.status === "Current"
    ? /\d|announced/i.test(show.dates)
      ? "Upcoming"
      : "Now on"
    : "Past";

/** The year a show opened, from its published dates, else from its title. */
export const yearOf = (show: Show) =>
  (show.dates.match(/\d{4}/) ?? show.title.match(/\d{4}/))?.[0] ?? "";

export const pad = (value: number) => String(value).padStart(2, "0");
