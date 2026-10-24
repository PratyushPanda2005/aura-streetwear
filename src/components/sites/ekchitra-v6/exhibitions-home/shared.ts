import { EXHIBITIONS, V6_HOME } from "../data";

/**
 * The shows every homepage exhibitions iteration uses, picked by title for
 * their posters: full-bleed images that fill a frame (no white grounds).
 */
const TITLES = ["Satirical Symphony", "Tree of Life", "Pause & Reflect"];

export const SHOWS = TITLES.map((title) =>
  EXHIBITIONS.find((show) => show.title === title),
).filter((show) => show !== undefined);

export type Show = (typeof SHOWS)[number];

/** Where every show is held. */
export const VENUE = "EkChitra, Hyderabad";

/** The exhibitions page, for "all exhibitions" links. */
export const ALL_HREF = `${V6_HOME}/exhibitions`;

/** "Upcoming" for a current show with dates, "Now on" without; else "Past". */
export const statusOf = (show: Show) =>
  show.status === "Current"
    ? /\d/.test(show.dates)
      ? "Upcoming"
      : "Now on"
    : "Past";

/** The year a show opened, from its published dates. */
export const yearOf = (show: Show) => show.dates.match(/\d{4}/)?.[0] ?? "";

export const pad = (value: number) => String(value).padStart(2, "0");
