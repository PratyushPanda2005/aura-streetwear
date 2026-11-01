"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Chars } from "../../ekchitra-v5/Chars";
import { BODY, CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { EXHIBITIONS } from "../data";
import { GRID, HEAD } from "../styles";
import { Index } from "../ui";
import { statusOf, yearOf } from "./shared";

/** How many frames ride the ribbon at once. */
const COUNT = 10;

/**
 * The newest shows with full-bleed posters, one per frame (Where Light Rests
 * has only a placeholder, and Swadhatri's poster is on white, so both are
 * left out).
 */
const RIBBON = EXHIBITIONS.filter(
  (show) => show.image.endsWith(".jpg") && show.title !== "Swadhatri",
).slice(0, COUNT);

/** The ribbon's frames and curve, in scene units, on desktop and phones. */
const DESKTOP = {
  panelW: 4.8,
  panelH: 3,
  gap: 1,
  depth: 9,
  dist: 22,
  radius: 0.05,
  segments: 24,
  drift: 0.45,
};
const PHONE = {
  panelW: 4.3,
  panelH: 2.7,
  gap: 0.75,
  depth: 4.5,
  dist: 19.5,
  radius: 0.04,
  segments: 16,
  drift: 0.22,
};
type Layout = typeof DESKTOP;

/** The camera, the grid behind the frames, and how quickly the view turns. */
const SCENE = {
  tiltDeg: 10,
  fovDeg: 40,
  ahead: 25,
  floorY: -65,
  wallZ: -70,
  gridCell: 4,
  gridHalf: { w: 90, h: 50 },
  turnLerp: 0.095,
  driftFrom: 0.12,
};

/** Wraps a position into [-length/2, length/2). */
const wrap = (value: number, length: number) =>
  ((((value + length / 2) % length) + length) % length) - length / 2;

/** Bends each frame onto the ribbon, tilts it, and pitches the camera. */
const PANEL_VERTEX = `#version 300 es
in vec2 aLocal;
uniform float uX, uLoop, uDepth, uDist, uTilt, uSinP, uCosP, uF, uAspect;
out vec2 vLocal;
void main() {
  float gx = uX + aLocal.x;
  float lift = cos(gx / uLoop * 6.2831853) * uDepth;
  float tx = gx * cos(uTilt) - aLocal.y * sin(uTilt);
  float ty = gx * sin(uTilt) + aLocal.y * cos(uTilt);
  float y = -uDist + lift;
  float z = -ty;
  float yc = y * uCosP - z * uSinP;
  float zc = y * uSinP + z * uCosP;
  vLocal = aLocal;
  gl_Position = vec4(uF * tx / uAspect, uF * yc, (zc * -1.001 - 0.2), -zc);
}`;

/** A rounded frame, filled with its poster (cropped to cover) once loaded. */
const PANEL_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vLocal;
uniform sampler2D uTex;
uniform vec2 uHalf, uCropScale, uCropOffset;
uniform float uRadius, uHasTex;
uniform vec3 uFill;
out vec4 outColor;
void main() {
  vec2 q = abs(vLocal) - uHalf + uRadius;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
  float aa = fwidth(d);
  float a = 1.0 - smoothstep(-aa, aa, d);
  if (a <= 0.0) discard;
  vec2 uv = (vLocal / (uHalf * 2.0)) * vec2(1.0, -1.0) + 0.5;
  vec3 c = uHasTex > 0.5 ? texture(uTex, uv * uCropScale + uCropOffset).rgb : uFill;
  outColor = vec4(c, a);
}`;

/** The floor and back wall grid, seen through the same camera. */
const GRID_VERTEX = `#version 300 es
in vec3 aPos;
uniform float uSinP, uCosP, uF, uAspect;
void main() {
  float yc = aPos.y * uCosP - aPos.z * uSinP;
  float zc = aPos.y * uSinP + aPos.z * uCosP;
  gl_Position = vec4(uF * aPos.x / uAspect, uF * yc, (zc * -1.001 - 0.2), -zc);
}`;

const GRID_FRAGMENT = `#version 300 es
precision highp float;
uniform vec4 uColor;
out vec4 outColor;
void main() { outColor = uColor; }`;

function program(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const prog = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(prog, shader);
  }
  gl.linkProgram(prog);
  return gl.getProgramParameter(prog, gl.LINK_STATUS) ? prog : null;
}

/** The outline of a rounded frame, as points, for the 2D outlines. */
function outlinePoints({ panelW, panelH, radius: r, segments }: Layout) {
  const w = panelW / 2;
  const h = panelH / 2;
  const points: [number, number][] = [];
  const line = (x0: number, y0: number, x1: number, y1: number) => {
    for (let i = 0; i <= segments; i++)
      points.push([
        x0 + ((x1 - x0) * i) / segments,
        y0 + ((y1 - y0) * i) / segments,
      ]);
  };
  const corner = (cx: number, cy: number, start: number) => {
    for (let i = 1; i < 4; i++) {
      const a = start - (i / 4) * (Math.PI / 2);
      points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
  };
  line(-w + r, h, w - r, h);
  corner(w - r, h - r, Math.PI / 2);
  line(w, h - r, w, -h + r);
  corner(w - r, -h + r, 0);
  line(w - r, -h, -w + r, -h);
  corner(-w + r, -h + r, -Math.PI / 2);
  line(-w, -h + r, -w, h - r);
  corner(-w + r, h - r, Math.PI);
  return points;
}

/** The floor and wall grid lines, as pairs of 3D points. */
function gridLines() {
  const { gridCell, gridHalf, floorY, wallZ } = SCENE;
  const v: number[] = [];
  for (let x = -gridHalf.w; x <= gridHalf.w; x += gridCell)
    v.push(x, floorY, -gridHalf.h, x, floorY, gridHalf.h);
  for (let x = -gridHalf.w; x <= gridHalf.w; x += gridCell)
    v.push(x, -gridHalf.h, wallZ, x, gridHalf.h, wallZ);
  for (let z = -gridHalf.h; z <= gridHalf.h; z += gridCell)
    v.push(-gridHalf.w, floorY, z, gridHalf.w, floorY, z);
  for (let y = -gridHalf.h; y <= gridHalf.h; y += gridCell)
    v.push(-gridHalf.w, y, wallZ, gridHalf.w, y, wallZ);
  return new Float32Array(v);
}

type Texture = { tex: WebGLTexture; w: number; h: number };

/**
 * 05 — Ribbon, a port of "the mess" on krew-orqestra.vercel.app in the
 * house colours: a screen-high white field where ten exhibition frames ride
 * a looping ribbon that rises and dips in depth, drawn outside the centre as
 * thin ink outlines. The centre is an ink window onto the same scene in
 * WebGL — the frames filled with their posters over a faint floor-and-wall
 * grid — so each show comes into colour as it passes through. As the section
 * comes up the screen, the camera turns down onto the ribbon; once it has,
 * the ribbon drifts right to left on its own. The window opens a little on
 * hover and links to the show at its centre, with its status, dates and
 * title set inside. Held still, looking down, for visitors who prefer
 * reduced motion; a poster stands in where WebGL2 is missing.
 */
export function ExRibbon() {
  const section = useRef<HTMLDivElement>(null);
  const ribbon = useRef<HTMLDivElement>(null);
  const outlines = useRef<HTMLCanvasElement>(null);
  const scene = useRef<HTMLCanvasElement>(null);
  const portal = useRef<HTMLAnchorElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const root = section.current;
    const wrapEl = ribbon.current;
    const flat = outlines.current;
    const canvas = scene.current;
    if (!root || !wrapEl || !flat || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
    });
    const ctx = flat.getContext("2d");
    if (!gl || !ctx) return;
    const panelProg = program(gl, PANEL_VERTEX, PANEL_FRAGMENT);
    const gridProg = program(gl, GRID_VERTEX, GRID_FRAGMENT);
    if (!panelProg || !gridProg) return;
    wrapEl.setAttribute("data-gl", "");

    const reduce = !window.matchMedia("(prefers-reduced-motion: no-preference)")
      .matches;

    // The house ink, read from the page.
    const probe = document.createElement("span");
    probe.style.color = "var(--k-ink)";
    wrapEl.append(probe);
    const ink = getComputedStyle(probe)
      .color.match(/[\d.]+/g)
      ?.map(Number) ?? [25, 25, 25];
    probe.remove();

    const grid = gridLines();
    const gridBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
    const stripBuffer = gl.createBuffer();

    const uniforms = <T extends string>(prog: WebGLProgram, names: T[]) =>
      Object.fromEntries(
        names.map((name) => [name, gl.getUniformLocation(prog, name)]),
      ) as Record<T, WebGLUniformLocation | null>;
    const P = uniforms(panelProg, [
      "uX",
      "uLoop",
      "uDepth",
      "uDist",
      "uTilt",
      "uSinP",
      "uCosP",
      "uF",
      "uAspect",
      "uTex",
      "uHalf",
      "uCropScale",
      "uCropOffset",
      "uRadius",
      "uHasTex",
      "uFill",
    ]);
    const G = uniforms(gridProg, ["uSinP", "uCosP", "uF", "uAspect", "uColor"]);
    const aLocal = gl.getAttribLocation(panelProg, "aLocal");
    const aPos = gl.getAttribLocation(gridProg, "aPos");

    const textures: (Texture | null)[] = RIBBON.map(() => null);
    let layout: Layout = DESKTOP;
    let loop = 0;
    let outline: [number, number][] = [];
    let dpr = 1;
    let width = 0;
    let height = 0;
    let turn = reduce ? 1 : 0;
    let offset = 0;
    let nearest = -1;

    const resize = () => {
      const phone = window.innerWidth < 768;
      const next = phone ? PHONE : DESKTOP;
      if (next !== layout || !loop) {
        layout = next;
        loop = COUNT * (layout.panelW + layout.gap);
        const strip: number[] = [];
        for (let i = 0; i <= layout.segments; i++) {
          const x = -layout.panelW / 2 + (layout.panelW * i) / layout.segments;
          strip.push(x, layout.panelH / 2, x, -layout.panelH / 2);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, stripBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(strip), gl.STATIC_DRAW);
        outline = outlinePoints(layout);
      }
      dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2);
      width = root.clientWidth;
      height = root.clientHeight;
      for (const c of [canvas, flat]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      draw();
    };

    const draw = () => {
      if (!width || !height) return;
      const t = Math.min(Math.max(turn, 0), 1);
      const eased = t * t * (3 - 2 * t);
      const pitch = Math.atan2(layout.dist * eased, SCENE.ahead * (1 - eased));
      const sinP = Math.sin(pitch);
      const cosP = Math.cos(pitch);
      const f = 1 / Math.tan(((SCENE.fovDeg / 2) * Math.PI) / 180);
      const aspect = width / height;
      const tilt = (SCENE.tiltDeg * Math.PI) / 180;
      const xs = Array.from({ length: COUNT }, (_, i) =>
        wrap(i * (layout.panelW + layout.gap) + offset, loop),
      );

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(ink[0] / 255, ink[1] / 255, ink[2] / 255, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // The grid.
      gl.useProgram(gridProg);
      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(G.uSinP, sinP);
      gl.uniform1f(G.uCosP, cosP);
      gl.uniform1f(G.uF, f);
      gl.uniform1f(G.uAspect, aspect);
      gl.uniform4f(G.uColor, 1, 1, 1, 0.12);
      gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINES, 0, grid.length / 3);
      gl.disableVertexAttribArray(aPos);

      // The frames.
      gl.useProgram(panelProg);
      gl.enable(gl.DEPTH_TEST);
      gl.bindBuffer(gl.ARRAY_BUFFER, stripBuffer);
      gl.enableVertexAttribArray(aLocal);
      gl.vertexAttribPointer(aLocal, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(P.uLoop, loop);
      gl.uniform1f(P.uDepth, layout.depth);
      gl.uniform1f(P.uDist, layout.dist);
      gl.uniform1f(P.uTilt, tilt);
      gl.uniform1f(P.uSinP, sinP);
      gl.uniform1f(P.uCosP, cosP);
      gl.uniform1f(P.uF, f);
      gl.uniform1f(P.uAspect, aspect);
      gl.uniform2f(P.uHalf, layout.panelW / 2, layout.panelH / 2);
      gl.uniform1f(P.uRadius, layout.radius);
      gl.uniform3f(P.uFill, 0.2, 0.2, 0.2);
      gl.uniform1i(P.uTex, 0);
      gl.activeTexture(gl.TEXTURE0);
      const frame = layout.panelW / layout.panelH;
      xs.forEach((x, i) => {
        const texture = textures[i];
        gl.uniform1f(P.uX, x);
        gl.uniform1f(P.uHasTex, texture ? 1 : 0);
        if (texture) {
          gl.bindTexture(gl.TEXTURE_2D, texture.tex);
          const ratio = texture.w / texture.h;
          const sx = ratio > frame ? frame / ratio : 1;
          const sy = ratio > frame ? 1 : ratio / frame;
          gl.uniform2f(P.uCropScale, sx, sy);
          gl.uniform2f(P.uCropOffset, (1 - sx) / 2, (1 - sy) / 2);
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, (layout.segments + 1) * 2);
      });
      gl.disableVertexAttribArray(aLocal);

      // The same frames as outlines, projected onto the white field.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = `rgb(${ink[0]} ${ink[1]} ${ink[2]} / 0.25)`;
      ctx.lineWidth = 1.25;
      ctx.lineJoin = "round";
      for (const x of xs) {
        ctx.beginPath();
        let visible = true;
        outline.forEach(([lx, ly], i) => {
          const gx = x + lx;
          const lift = Math.cos((gx / loop) * Math.PI * 2) * layout.depth;
          const tx = gx * Math.cos(tilt) - ly * Math.sin(tilt);
          const ty = gx * Math.sin(tilt) + ly * Math.cos(tilt);
          const y = -layout.dist + lift;
          const z = -ty;
          const yc = y * cosP - z * sinP;
          const zc = y * sinP + z * cosP;
          if (zc > -0.2) visible = false;
          const sx = width / 2 - (height / 2) * ((f * tx) / zc);
          const sy = height / 2 + (height / 2) * ((f * yc) / zc);
          if (i) ctx.lineTo(sx, sy);
          else ctx.moveTo(sx, sy);
        });
        ctx.closePath();
        if (visible) ctx.stroke();
      }

      // The frame nearest the centre is the one the window names.
      let best = 0;
      xs.forEach((x, i) => {
        if (Math.abs(x) < Math.abs(xs[best])) best = i;
      });
      if (best !== nearest) {
        nearest = best;
        setActive(best);
      }
    };

    let running = false;
    let frame = 0;
    let then = 0;
    const tick = (now: number) => {
      const dt = then ? Math.min((now - then) / 1000, 0.1) : 1 / 60;
      then = now;
      const top = root.getBoundingClientRect().top;
      const goal = reduce
        ? 1
        : Math.min(Math.max(1 - top / window.innerHeight, 0), 1);
      turn += (goal - turn) * (1 - Math.pow(1 - SCENE.turnLerp, 60 * dt));
      if (Math.abs(goal - turn) < 1e-4) turn = goal;
      if (!reduce && !pausedRef.current && turn > SCENE.driftFrom)
        offset = wrap(offset - layout.drift * dt, loop);
      draw();
      frame = running && !reduce ? requestAnimationFrame(tick) : 0;
      if (!frame) then = 0;
    };

    let loaded = false;
    const load = () => {
      loaded = true;
      RIBBON.forEach((show, i) => {
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => {
          const tex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
          );
          gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            gl.LINEAR_MIPMAP_LINEAR,
          );
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.generateMipmap(gl.TEXTURE_2D);
          textures[i] = { tex, w: img.naturalWidth, h: img.naturalHeight };
          draw();
        };
        img.src = show.image;
      });
    };

    const watch = new IntersectionObserver(
      ([entry]) => {
        running = !!entry?.isIntersecting;
        if (running && !loaded) load();
        if (running && !frame) frame = requestAnimationFrame(tick);
      },
      { rootMargin: "25% 0px" },
    );
    watch.observe(root);
    const sizer = new ResizeObserver(resize);
    sizer.observe(root);
    resize();

    // The cursor over the window, for a mouse only.
    const link = portal.current;
    const dot = cursor.current;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !dot) return;
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      dot.setAttribute("data-on", "");
    };
    const leave = () => dot?.removeAttribute("data-on");
    link?.addEventListener("pointermove", move);
    link?.addEventListener("pointerleave", leave);

    return () => {
      watch.disconnect();
      sizer.disconnect();
      cancelAnimationFrame(frame);
      link?.removeEventListener("pointermove", move);
      link?.removeEventListener("pointerleave", leave);
      wrapEl.removeAttribute("data-gl");
    };
  }, []);

  const show = RIBBON[active];

  return (
    <section
      id="exhibitions"
      aria-labelledby="exhibitions-heading"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      <div className={cn(GRID, HEAD, "relative z-10")}>
        <div className="col-span-4 lg:col-span-12">
          <Index label="Exhibitions" />
          {/* The title, with the control to hold the ribbon still opposite. */}
          <div className="mt-2 flex items-center justify-between gap-x-6 lg:mt-3">
            <h2 id="exhibitions-heading" className={TITLE}>
              <Chars text="Now and next at EkChitra" />
            </h2>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              className={cn(
                CAPS,
                "-mr-2 flex h-11 shrink-0 items-center gap-x-2 px-2 text-[11px] focus-visible:outline-1 focus-visible:outline-(--k-ink) motion-reduce:hidden",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block shrink-0",
                  paused
                    ? "size-0 border-y-4 border-l-[6px] border-y-transparent border-l-(--k-ink)"
                    : "h-2 w-1.5 border-x-2 border-(--k-ink)",
                )}
              />
              {paused ? "Play" : "Pause"}
            </button>
          </div>
          <p className={cn(BODY, "mt-6 max-w-[360px] text-(--k-ink)/70")}>
            <Chars text="Every exhibition begins with an idea, and every visit begins with curiosity." />
          </p>
        </div>
      </div>

      {/* The stage: the ribbon, a screen high (the scene scales with it).
          Its empty white above and below the frames is tucked under the
          header and the next section, so the ribbon sits close to both. */}
      <div
        ref={section}
        className="pointer-events-none relative isolate -mt-[max(0px,calc(50svh_-_var(--wh)/2_-_108px))] -mb-[max(0px,calc(50svh_-_var(--wh)/2_-_80px))] h-svh min-h-[40rem] overflow-hidden [--grow:1] [--wh:calc(var(--ww)/1.55)] [--ww:min(78vw,460px)] has-[[data-portal]:hover]:[--grow:1.2] lg:[--ww:min(520px,56vw)]"
      >
        <div ref={ribbon} className="group/gl absolute inset-0">
          {/* The frames as outlines, across the whole field. */}
          <canvas
            ref={outlines}
            aria-hidden="true"
            className="absolute inset-0 size-full"
          />

          {/* The window onto the WebGL scene. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-(--k-ink) transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(calc(50%_-_var(--wh)*var(--grow)/2)_calc(50%_-_var(--ww)*var(--grow)/2)_round_2px)]"
          >
            <Image
              src={RIBBON[0].image}
              alt=""
              fill
              sizes="56vw"
              className="object-cover group-data-gl/gl:hidden"
            />
            <canvas ref={scene} className="absolute inset-0 size-full" />
          </div>

          {/* The window: a link to the show at its centre. */}
          <a
            ref={portal}
            data-portal=""
            href={show.href}
            className="pointer-events-auto absolute top-1/2 left-1/2 h-(--wh) w-(--ww) -translate-x-1/2 -translate-y-1/2 text-white pointer-fine:cursor-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
          >
            <span className="sr-only">View {show.title}</span>
            <span
              aria-hidden="true"
              className="absolute top-4 left-4 flex flex-col items-start gap-1.5"
            >
              <span
                className={cn(
                  CAPS,
                  "bg-(--k-ink)/60 px-2 py-1 text-[11px] ring-1 ring-white/20 backdrop-blur-md",
                )}
              >
                {statusOf(show)} · {yearOf(show)}
              </span>
              <span className="max-w-[16rem] bg-(--k-ink)/60 px-2 py-1 text-[13px] leading-snug backdrop-blur-md lg:text-sm">
                {show.dates}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-(--k-ink)/60 px-2 py-1.5 text-[20px] leading-none tracking-[-0.02em] uppercase backdrop-blur-md lg:text-[22px]"
            >
              {show.title}
            </span>
          </a>

          {/* The cursor over the window. */}
          <span
            ref={cursor}
            aria-hidden="true"
            className="group/cursor pointer-events-none invisible fixed top-0 left-0 z-50 data-on:visible"
          >
            <span
              className={cn(
                CAPS,
                "flex size-14 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center bg-white text-[10px] text-(--k-ink) transition-[scale] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-on/cursor:scale-100",
              )}
            >
              View
            </span>
          </span>
        </div>

        {/* Every show, for screen readers and keyboards. */}
        <ul className="sr-only">
          {RIBBON.map((item) => (
            <li key={item.title}>
              <a href={item.href}>
                {item.title}, {statusOf(item)}, {item.dates}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
