import type { Artist } from "../../ekchitra-v5/artists-data";
import { V6_HOME } from "../data";

/** An artist's URL segment: their anchor id without its "artist-" prefix. */
export const artistSlug = (artist: Artist) => artist.id.replace(/^artist-/, "");

/** An artist's detail page on the v6 site. */
export const artistPath = (artist: Artist) =>
  `${V6_HOME}/artists/${artistSlug(artist)}`;
