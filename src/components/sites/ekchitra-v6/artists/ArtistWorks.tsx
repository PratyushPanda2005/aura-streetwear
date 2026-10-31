"use client";

import { useCallback, useMemo, useState } from "react";

import type { Artist } from "../../ekchitra-v5/artists-data";
import { ArtworkPanel } from "../artworks/ArtworkPanel";
import { WORKS, WorkRows } from "../artworks/ArtworksIndex";
import { artworkPath } from "../artworks/paths";
import { relatedWorks } from "../artworks/related";

/**
 * An artist's works as the Artworks page shows them: justified rows with the
 * same cards, numbered from 01, each opening the same panel, with Prev / Next
 * through this artist's works. A related work by someone else opens on the
 * Artworks page, where it can be stepped through with the rest.
 */
export function ArtistWorks({ artist }: { artist: Artist }) {
  const works = useMemo(
    () => WORKS.filter((work) => work.artistData.id === artist.id),
    [artist.id],
  );
  // The open work, by its place in the list; null when closed.
  const [open, setOpen] = useState<number | null>(null);
  // The last work opened, kept on screen while the panel slides away.
  const [shown, setShown] = useState<number | null>(null);
  const show = useCallback((index: number) => {
    setOpen(index);
    setShown(index);
  }, []);
  const shownWork = shown === null ? null : (works[shown] ?? null);

  const related = useMemo(() => {
    if (!shownWork) return { label: "", works: [] };
    const { label, works: list } = relatedWorks(
      shownWork,
      WORKS,
      (work) => work.artist,
    );
    return {
      label,
      works: list.map(({ image, title, artist: name }) => ({
        image,
        title,
        artist: name,
      })),
    };
  }, [shownWork]);

  const pick = useCallback(
    (image: string) => {
      const index = works.findIndex((work) => work.image === image);
      if (index >= 0) {
        show(index);
        return;
      }
      const other = WORKS.find((work) => work.image === image);
      if (other) window.location.assign(artworkPath(other.title, other.artist));
    },
    [works, show],
  );
  const closePanel = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => {
    if (open === null || open === 0) return;
    show(open - 1);
  }, [open, show]);
  const next = useCallback(() => {
    if (open === null || open >= works.length - 1) return;
    show(open + 1);
  }, [open, works.length, show]);

  return (
    <>
      <WorkRows works={works} onOpen={show} className="mt-8 lg:mt-10" />
      <ArtworkPanel
        open={open !== null}
        work={shownWork ? { ...shownWork, artist: shownWork.artistData } : null}
        hasPrev={open !== null && open > 0}
        hasNext={open !== null && open < works.length - 1}
        onPrev={prev}
        onNext={next}
        onClose={closePanel}
        related={related}
        onPick={pick}
      />
    </>
  );
}
