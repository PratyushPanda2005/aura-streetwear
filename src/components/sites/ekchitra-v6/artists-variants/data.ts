import { ARTISTS } from "../data";

/** Artists the variations feature, in order; the rest are a click away. */
const PICKS = [
  "Anupama Choudhary",
  "Ashok Juttu",
  "Charanjeet Singh",
  "Dilip Kumar",
  "Vinod Daroz",
  "Farhad Hussain",
];

export const FEATURED = PICKS.map((name) =>
  ARTISTS.find((artist) => artist.name === name),
).filter((artist) => artist !== undefined);

export type FeaturedArtist = (typeof FEATURED)[number];

export const TOTAL = ARTISTS.length;

export const pad = (value: number) => String(value).padStart(2, "0");
