"use client";

import { Curtains, Plane } from "curtainsjs";
import { useEffect, useRef, type ReactNode } from "react";

/** Bends each tile into an arc; `uBend` follows the scroll speed. */
const VERTEX_SHADER = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 planeTextureMatrix;
  uniform float uBend;

  varying vec2 vTextureCoord;

  void main() {
    vec3 position = aVertexPosition;
    position.y += sin(((position.x + 1.0) / 2.0) * 3.141592) * sin(uBend / 240.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

/** Draws the picture slightly darkened so text over it stays readable. */
const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform sampler2D planeTexture;

  void main() {
    vec4 color = texture2D(planeTexture, vTextureCoord);
    gl_FragColor = vec4(color.rgb * 0.82, color.a);
  }
`;

/** Largest bend, reached on a fast scroll. */
const MAX_BEND = 20;

/**
 * Wavy scroll for the pictures inside it.
 *
 * Every descendant marked `data-wave` (a box holding one image marked
 * `data-sampler="planeTexture"`) is redrawn on a shared full-screen WebGL canvas
 * and bows in the direction of travel while the page is scrolling, settling flat
 * when it stops. Once a tile is drawn on the canvas it gets `data-gl="true"` so
 * the ordinary image can be hidden. Without WebGL, or with reduced motion on,
 * nothing changes and the ordinary images stay.
 */
export function WaveCanvas({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const container = canvasRef.current;
    if (!root || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = [...root.querySelectorAll<HTMLElement>("[data-wave]")];
    const curtains = new Curtains({
      container,
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
      watchScroll: false,
      autoRender: true,
      production: true,
    });
    let failed = false;
    curtains.onError(() => {
      failed = true;
      for (const tile of tiles) delete tile.dataset.gl;
    });
    curtains.onContextLost(() => curtains.restoreContext());

    const planes = tiles.map((tile) => {
      const plane = new Plane(curtains, tile, {
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        widthSegments: 12,
        heightSegments: 12,
        uniforms: { bend: { name: "uBend", type: "1f", value: 0 } },
      });
      plane.onReady(() => {
        if (!failed) tile.dataset.gl = "true";
      });
      return plane;
    });

    let bend = 0;
    let lastY = window.scrollY;
    curtains.onRender(() => {
      const y = window.scrollY;
      const target = Math.max(-MAX_BEND, Math.min(MAX_BEND, (y - lastY) * 0.5));
      lastY = y;
      bend += (target - bend) * 0.08;
      for (const plane of planes) {
        plane.uniforms.bend.value = bend;
        // Tiles also move with the column's own drift, so re-read their place.
        plane.updatePosition();
      }
    });

    // Draw only while the tiles are near the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (failed) return;
        if (entry.isIntersecting) curtains.enableDrawing();
        else curtains.disableDrawing();
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      for (const tile of tiles) delete tile.dataset.gl;
      curtains.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      <div
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
      />
      {children}
    </div>
  );
}
