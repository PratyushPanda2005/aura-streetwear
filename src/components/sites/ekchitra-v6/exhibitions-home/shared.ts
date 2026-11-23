import { EXHIBITIONS, V6_HOME } from "../data";

/**
 * The shows every homepage exhibitions iteration uses: the latest three
 * gallery shows, newest first, whose posters are full-bleed images that fill
 * a frame (Swadhatri's poster is on white, so it is left out).
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

/** Today in Hyderabad, as YYYY-MM-DD. */
const today = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

/**
 * Where a show stands today, from its opening and closing days: "Upcoming"
 * before it opens (or while its dates are still to be announced), "Ongoing"
 * until it closes, "Past" after — and always "Past" for a past show. The
 * v6 pages are rebuilt hourly (see the ekchitra-v6 layout) so this follows
 * the calendar.
 */
export const statusOf = (
  show: Pick<Show, "status" | "opens" | "closes">,
) => {
  if (show.status === "Past") return "Past";
  const now = today();
  if (show.closes && now > show.closes) return "Past";
  if (show.opens && now >= show.opens) return "Ongoing";
  return "Upcoming";
};

/** The year a show opened, from its published dates, else from its title. */
export const yearOf = (show: Show) =>
  (show.dates.match(/\d{4}/) ?? show.title.match(/\d{4}/))?.[0] ?? "";

export const pad = (value: number) => String(value).padStart(2, "0");
