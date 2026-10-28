import { V6_HOME } from "../data";

/**
 * The Artworks page with one work's panel open on arrival, e.g. from the
 * homepage carousel. Works are named by title and artist, which every data
 * set agrees on.
 */
export function artworkPath(title: string, artist: string) {
  const params = new URLSearchParams({ work: title, artist });
  return `${V6_HOME}/artworks?${params}`;
}
