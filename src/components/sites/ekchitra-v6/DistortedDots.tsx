"use client";

import { useEffect, useRef } from "react";

/** Distance between dots, px. */
const STEP = 9;

/** How far the waves push a dot out of line, px. */
const WARP = 14;

/**
 * A picture printed as a field of dots — the same halftone that used to
 * follow the cursor — now always on and still, with the grid pulled into
 * slow waves so it reads as distorted rather than mechanical.
 *
 * Fill its positioned parent. `ink` is the dot colour; on a light ground the
 * dots grow where the picture is dark (`invert`), on a dark ground where it
 * is light. `seed` shifts the waves so each use bends its own way.
 */
export function DistortedDots({
  src,
  ink,
  invert = false,
  seed = 0,
  opacity = 0.35,
}: {
  src: string;
  ink: string;
  invert?: boolean;
  seed?: number;
  opacity?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const context = el.getContext("2d");
    if (!context) return;

    const ratio = Math.min(2, window.devicePixelRatio || 1);
    const picture = new window.Image();
    picture.src = src;

    const draw = () => {
      const { width, height } = host.getBoundingClientRect();
      el.width = Math.round(width * ratio);
      el.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      if (!picture.complete || !picture.naturalWidth) return;

      // Sample the picture's brightness once per dot.
      const columns = Math.ceil(width / STEP);
      const rows = Math.ceil(height / STEP);
      const sample = document.createElement("canvas");
      sample.width = columns;
      sample.height = rows;
      const sampler = sample.getContext("2d");
      if (!sampler) return;
      const scale = Math.max(
        columns / picture.naturalWidth,
        rows / picture.naturalHeight,
      );
      const w = picture.naturalWidth * scale;
      const h = picture.naturalHeight * scale;
      sampler.drawImage(picture, (columns - w) / 2, (rows - h) / 2, w, h);
      const data = sampler.getImageData(0, 0, columns, rows).data;

      context.fillStyle = ink;
      context.globalAlpha = opacity;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const i = (y * columns + x) * 4;
          const value =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const tone = invert ? 1 - value : value;
          const px = x * STEP + STEP / 2;
          const py = y * STEP + STEP / 2;
          // Two crossing waves bend the grid.
          const dx =
            Math.sin(py * 0.011 + seed) * WARP +
            Math.sin((px + py) * 0.006 + seed * 2) * WARP * 0.5;
          const dy =
            Math.cos(px * 0.009 + seed * 1.5) * WARP +
            Math.sin((px - py) * 0.005 + seed) * WARP * 0.5;
          context.beginPath();
          context.arc(
            px + dx,
            py + dy,
            (STEP / 2) * (0.2 + 0.8 * tone),
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      }
    };

    picture.onload = draw;
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(host);
    return () => observer.disconnect();
  }, [src, ink, invert, seed, opacity]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
