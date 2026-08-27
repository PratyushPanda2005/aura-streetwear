"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsDesktop } from "./useMediaQuery";
import type { IndigoImage } from "@/types/indigo";

/**
 * Desktop pointer ring-trail, rebuilt to match `.tale-head__trail` /
 * `.tale-lookbook__trail` on the live site.
 *
 * Mechanism (verified against the original): the trail is a fixed, full-viewport,
 * `pointer-events: none` layer portalled to `<body>`, holding ten copies of the
 * chapter's 240×240 `ring-float` webp with **`mix-blend-mode: multiply`** (so the
 * white plate drops out and only the ring shows). Element transitions are `0s` —
 * every frame is driven in JS:
 *
 *  - image 0 is the **primary**: it eases toward the cursor each frame
 *    (`pos += (target - pos) * FOLLOW`), staying at scale 1 / opacity 1, and is
 *    the single ring left sitting under the cursor when the pointer stops.
 *  - images 1..9 are **ghost stamps**: once the pointer has travelled `SPAWN_DIST`
 *    a ghost is stamped at that point (opacity 1, scale ~0.85) and then decays
 *    each frame toward opacity 0 / scale 0.8, forming the fading wake.
 *
 * Everything eases out when the pointer leaves the owning section.
 */

const GHOSTS = 9;
const TOTAL = GHOSTS + 1;
const SIZE = 240;
const HALF = SIZE / 2;

/** px the pointer must travel before the next ghost is stamped */
const SPAWN_DIST = 55;
/** primary follow easing per frame */
const FOLLOW = 0.2;
/** ghost opacity decay per frame */
const GHOST_DECAY = 0.09;
/** ghost scale endpoints */
const GHOST_SCALE_IN = 0.85;
const GHOST_SCALE_OUT = 0.8;

interface Ghost {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export function ImageTrail({
  image,
  containerRef,
}: {
  image: IndigoImage;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  // useIsDesktop is a useSyncExternalStore read: false during SSR, so the
  // portal (and its document.body access) never runs on the server.
  const isDesktop = useIsDesktop();
  const nodes = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!isDesktop || !container) return;

    // Primary follower state.
    const primary = { x: -9999, y: -9999, opacity: 0, seeded: false };
    const target = { x: 0, y: 0, inside: false };

    // Ghost ring buffer (rendered as nodes 1..GHOSTS).
    const ghosts: Ghost[] = Array.from({ length: GHOSTS }, () => ({
      x: 0,
      y: 0,
      opacity: 0,
      scale: GHOST_SCALE_OUT,
    }));
    let ghostCursor = 0;
    let travelled = 0;
    let lastSpawn: { x: number; y: number } | null = null;

    const paint = (
      el: HTMLImageElement | null,
      x: number,
      y: number,
      opacity: number,
      scale: number,
    ) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate(${x - HALF}px, ${y - HALF}px) scale(${scale})`;
    };

    let raf = 0;
    const tick = () => {
      // Primary eases toward the cursor; fades with `inside`.
      if (primary.seeded) {
        primary.x += (target.x - primary.x) * FOLLOW;
        primary.y += (target.y - primary.y) * FOLLOW;
      }
      const wantOpacity = target.inside ? 1 : 0;
      primary.opacity += (wantOpacity - primary.opacity) * 0.15;
      paint(nodes.current[0], primary.x, primary.y, primary.opacity, 1);

      // Ghosts decay toward transparent + settle scale.
      for (let i = 0; i < GHOSTS; i++) {
        const g = ghosts[i];
        if (g.opacity > 0.001) {
          g.opacity -= GHOST_DECAY;
          if (g.opacity < 0) g.opacity = 0;
          g.scale += (GHOST_SCALE_OUT - g.scale) * 0.2;
        }
        paint(nodes.current[i + 1], g.x, g.y, g.opacity, g.scale);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.inside = true;
      if (!primary.seeded) {
        primary.x = e.clientX;
        primary.y = e.clientY;
        primary.seeded = true;
        lastSpawn = { x: e.clientX, y: e.clientY };
      }

      // Accumulate travel; stamp a ghost every SPAWN_DIST.
      if (lastSpawn) {
        travelled += Math.hypot(e.clientX - lastSpawn.x, e.clientY - lastSpawn.y);
      }
      lastSpawn = { x: e.clientX, y: e.clientY };
      if (travelled >= SPAWN_DIST) {
        travelled = 0;
        const g = ghosts[ghostCursor % GHOSTS];
        ghostCursor += 1;
        g.x = e.clientX;
        g.y = e.clientY;
        g.opacity = 1;
        g.scale = GHOST_SCALE_IN;
      }
    };

    const onLeave = () => {
      target.inside = false;
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [isDesktop, containerRef]);

  if (!isDesktop) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {Array.from({ length: TOTAL }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          src={image.src}
          alt=""
          width={SIZE}
          height={SIZE}
          className="absolute top-0 left-0 w-60 opacity-0 mix-blend-multiply will-change-transform"
          style={{ zIndex: i === 0 ? 2 : 1 }}
        />
      ))}
    </div>,
    document.body,
  );
}
