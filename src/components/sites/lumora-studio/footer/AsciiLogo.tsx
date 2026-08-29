"use client";

/**
 * Lumora — ASCII logo footer effect.
 *
 * The interaction (idle drift, magnetic hover repulsion, scroll-reveal "fall +
 * form", click "spread") is an original re-implementation of a canvas particle
 * effect. The wordmark itself is rendered from live text — the `wordmark` /
 * `monogram` props — using the page's own font, so no external logotype artwork
 * is used.
 */

import { useEffect, useRef } from "react";

const CHARS = "01#@&ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const PARAMS = {
  jitterPx: 140,
  sampleStep: 14,
  fallDurationMs: 1200,
  formDurationMs: 1100,
  gravity: 0.7,
  magneticStrength: 28,
  magneticRadius: 120,
  magneticReturn: 0.08,
};

type Particle = {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  tx: number;
  ty: number;
  fx: number;
  fy: number;
  sx: number;
  sy: number;
  delay: number;
  done: boolean;
};

type Phase = "idle" | "fall" | "form" | "spread" | "done";

/** Render the wordmark text to an offscreen canvas at a fixed reference size,
 *  so the sampled character grid is identical regardless of screen size. */
function renderText(text: string, family: string): HTMLCanvasElement {
  const refSize = 240;
  const font = `700 ${refSize}px ${family}`;
  const c = document.createElement("canvas");
  const cx = c.getContext("2d")!;
  cx.font = font;
  const m = cx.measureText(text);
  const ascent = m.actualBoundingBoxAscent || refSize * 0.8;
  const descent = m.actualBoundingBoxDescent || refSize * 0.2;
  const padX = Math.round(refSize * 0.12);
  const padY = Math.round(refSize * 0.18);
  c.width = Math.max(1, Math.ceil(m.width) + padX * 2);
  c.height = Math.max(1, Math.ceil(ascent + descent) + padY * 2);
  cx.font = font; // reset — resizing the canvas clears context state
  cx.fillStyle = "#fff";
  cx.textBaseline = "alphabetic";
  cx.fillText(text, padX, padY + ascent);
  return c;
}

export function AsciiLogo({
  className,
  wordmark,
  monogram,
  align,
}: {
  className?: string;
  wordmark: string;
  monogram?: string;
  align?: "left" | "center";
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mobileText = monogram || wordmark.charAt(0);

    root.style.position ||= "relative";
    root.style.overflow = "hidden";
    root.style.cursor = "pointer";

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    root.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const mouse = { x: 0, y: 0, active: false };

    let particles: Particle[] = [];
    let dpr = 1;
    let fontSize = 10;
    let phase: Phase = "idle";
    let fallStart = 0;
    let formStart = 0;
    let spreadStart = 0;
    let floorY = 0;
    let rafId = 0;
    let visible = true;
    let resizeTimer = 0;
    let logoSource: HTMLCanvasElement | null = null;
    let logoMode: "mobile" | "desktop" | null = null;
    let dispScale = 1;
    let scrollRevealDone = false;
    let disposed = false;
    const bounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    const logoBounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    const mobileMq = window.matchMedia("(max-width: 767px)");

    const currentLogoMode = () => (mobileMq.matches ? "mobile" : "desktop");

    async function ensureLogoSource() {
      const mode = currentLogoMode();
      if (logoSource && logoMode === mode) return logoSource;
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          /* ignore font loading errors — falls back to system font */
        }
      }
      if (disposed) return logoSource;
      logoMode = mode;
      const family = getComputedStyle(root!).fontFamily || "sans-serif";
      logoSource = renderText(mode === "mobile" ? mobileText : wordmark, family);
      return logoSource;
    }

    const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    function snapToGrid(v: number) {
      const unit = Math.max(1, fontSize);
      return Math.round(v / unit) * unit;
    }

    function updateBounds() {
      const edge = Math.ceil(fontSize * 0.5);
      bounds.minX = edge;
      bounds.minY = edge;
      bounds.maxX = canvas.width - edge - fontSize * 0.5;
      bounds.maxY = canvas.height - edge - fontSize;
      floorY = bounds.maxY;
      logoBounds.minX = edge;
      logoBounds.minY = Math.ceil(fontSize * 0.75);
      logoBounds.maxX = canvas.width - edge - fontSize * 0.5;
      logoBounds.maxY = canvas.height - Math.ceil(fontSize * 0.75) - fontSize;
    }

    function clampParticle(p: Particle) {
      p.x = Math.max(bounds.minX, Math.min(bounds.maxX, p.x));
      p.y = Math.max(bounds.minY, Math.min(bounds.maxY, p.y));
    }

    function resizeCanvas() {
      const rect = root!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      fontSize = Math.max(5, Math.round(canvas.height / 14));
      updateBounds();
    }

    async function sampleTargets() {
      const src = await ensureLogoSource();
      if (!src) return [];
      const step = PARAMS.sampleStep;
      const sctx = src.getContext("2d")!;
      const data = sctx.getImageData(0, 0, src.width, src.height).data;

      const fitW = logoBounds.maxX - logoBounds.minX;
      const fitH = logoBounds.maxY - logoBounds.minY;
      dispScale = Math.min(fitW / src.width, fitH / src.height);
      const dispW = src.width * dispScale;
      const dispH = src.height * dispScale;
      const chosenAlign = align || (logoMode === "mobile" ? "center" : "left");
      const ox = chosenAlign === "left" ? logoBounds.minX : logoBounds.minX + (fitW - dispW) / 2;
      const oy = logoBounds.minY + (fitH - dispH) / 2;

      fontSize = Math.max(4, Math.round(step * dispScale));
      updateBounds();

      const pts: { tx: number; ty: number }[] = [];
      for (let y = 0; y < src.height; y += step) {
        for (let x = 0; x < src.width; x += step) {
          if (data[(y * src.width + x) * 4 + 3] > 50) {
            pts.push({ tx: snapToGrid(ox + x * dispScale), ty: snapToGrid(oy + y * dispScale) });
          }
        }
      }
      return pts;
    }

    function computeNearPosition(t: { tx: number; ty: number }) {
      const jitter = PARAMS.jitterPx * dispScale;
      const angle = Math.random() * Math.PI * 2;
      const maxDist = Math.min(
        jitter,
        t.tx - bounds.minX,
        bounds.maxX - t.tx,
        t.ty - bounds.minY,
        bounds.maxY - t.ty,
      );
      const dist = Math.random() * Math.max(0, maxDist);
      return { x: t.tx + Math.cos(angle) * dist, y: t.ty + Math.sin(angle) * dist };
    }

    function spawnParticles(targets: { tx: number; ty: number }[]): Particle[] {
      return targets.map((t, i) => {
        const pos = computeNearPosition(t);
        const x = pos.x;
        const y = pos.y;
        return {
          char: randChar(),
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3 * dpr,
          vy: (Math.random() - 0.5) * 0.3 * dpr,
          hx: x,
          hy: y,
          tx: t.tx,
          ty: t.ty,
          fx: x,
          fy: y,
          sx: x,
          sy: y,
          delay: (i % 20) / 20,
          done: false,
        };
      });
    }

    function maybeScramble(p: Particle, rate = 0.015) {
      if (Math.random() < rate) p.char = randChar();
    }

    function updateIdle(p: Particle, t: number) {
      const drift = 0.03;
      p.x += p.vx + Math.sin(t * 0.001 + p.y) * drift * dpr;
      p.y += p.vy + Math.cos(t * 0.001 + p.x) * drift * dpr;
      clampParticle(p);
      maybeScramble(p);
    }

    function applyMagnetic(p: Particle) {
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = PARAMS.magneticRadius * dpr;
        if (dist < radius) {
          const t = 1 - dist / radius;
          const force = t * t * PARAMS.magneticStrength;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          if (t > 0.65 && Math.random() < 0.06) p.char = randChar();
        }
      }
      p.x += (p.hx - p.x) * PARAMS.magneticReturn;
      p.y += (p.hy - p.y) * PARAMS.magneticReturn;
      clampParticle(p);
    }

    function updateFall(p: Particle) {
      p.vy += PARAMS.gravity * dpr;
      p.x += p.vx;
      p.y += p.vy;
      if (p.y >= floorY) {
        p.y = floorY;
        p.vy *= -0.25;
        p.vx *= 0.8;
      }
      clampParticle(p);
    }

    function startSpread(now: number) {
      phase = "spread";
      spreadStart = now;
      particles.forEach((p) => {
        p.fx = p.x;
        p.fy = p.y;
        const pos = computeNearPosition(p);
        p.sx = pos.x;
        p.sy = pos.y;
        p.vx = (Math.random() - 0.5) * 0.3 * dpr;
        p.vy = (Math.random() - 0.5) * 0.3 * dpr;
        p.hx = p.sx;
        p.hy = p.sy;
        p.done = false;
      });
    }

    function updateSpread(p: Particle, now: number) {
      const delay = p.delay * PARAMS.formDurationMs * 0.5;
      const t = Math.max(0, Math.min(1, (now - spreadStart - delay) / PARAMS.formDurationMs));
      const ease = 1 - Math.pow(1 - t, 3);
      p.x = p.fx + (p.sx - p.fx) * ease;
      p.y = p.fy + (p.sy - p.fy) * ease;
      clampParticle(p);
      if (t >= 1) p.done = true;
      maybeScramble(p, 0.012);
    }

    function startForm(now: number) {
      phase = "form";
      formStart = now;
      particles.forEach((p) => {
        p.fx = p.x;
        p.fy = p.y;
        p.done = false;
      });
    }

    function updateForm(p: Particle, now: number) {
      const delay = p.delay * PARAMS.formDurationMs * 0.5;
      const t = Math.max(0, Math.min(1, (now - formStart - delay) / PARAMS.formDurationMs));
      const ease = 1 - Math.pow(1 - t, 3);
      p.x = p.fx + (p.tx - p.fx) * ease;
      p.y = p.fy + (p.ty - p.fy) * ease;
      if (t >= 0.98) {
        p.x = snapToGrid(p.tx);
        p.y = snapToGrid(p.ty);
      }
      clampParticle(p);
      if (t >= 1) p.done = true;
      maybeScramble(p, 0.012);
    }

    function draw(now: number) {
      rafId = 0;
      if (!visible || disposed) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = `${fontSize}px Menlo, Monaco, "Courier New", monospace`;
      ctx.textBaseline = "top";

      particles.forEach((p) => {
        if (phase === "idle") {
          updateIdle(p, now);
          applyMagnetic(p);
        } else if (phase === "fall") updateFall(p);
        else if (phase === "form") updateForm(p, now);
        else if (phase === "spread") updateSpread(p, now);
        else if (phase === "done") {
          applyMagnetic(p);
          maybeScramble(p);
        }
        ctx.fillText(p.char, p.x, p.y);
      });

      if (phase === "form" && particles.every((p) => p.done)) {
        phase = "done";
        particles.forEach((p) => {
          p.x = snapToGrid(p.tx);
          p.y = snapToGrid(p.ty);
          p.hx = p.tx;
          p.hy = p.ty;
        });
      }

      if (phase === "spread" && particles.every((p) => p.done)) phase = "idle";

      if (phase === "fall" && now - fallStart >= PARAMS.fallDurationMs) startForm(now);

      rafId = requestAnimationFrame(draw);
    }

    function ensureLoop() {
      if (!rafId && visible && !disposed) rafId = requestAnimationFrame(draw);
    }

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function triggerFall() {
      if (phase !== "idle") return;
      phase = "fall";
      fallStart = performance.now();
      particles.forEach((p) => {
        p.vy += (Math.random() * 2 + 0.5) * dpr;
        p.vx += (Math.random() - 0.5) * 5 * dpr;
      });
      ensureLoop();
    }

    function onClick() {
      if (phase !== "idle" && phase !== "done") return;
      if (phase === "done") {
        startSpread(performance.now());
        ensureLoop();
        return;
      }
      triggerFall();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    }

    function onMouseLeave() {
      mouse.active = false;
    }

    async function resetParticles() {
      const prevMode = logoMode;
      resizeCanvas();
      const targets = await sampleTargets();
      if (disposed) return;
      particles = spawnParticles(targets);
      phase = "idle";
      if (logoMode !== prevMode) scrollRevealDone = false;
      ensureLoop();
    }

    function scheduleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => resetParticles(), 100);
    }

    root.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(scheduleResize);
    ro.observe(root);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) {
            ensureLoop();
            if (!scrollRevealDone && phase === "idle" && entry.intersectionRatio >= 0.8) {
              scrollRevealDone = true;
              triggerFall();
            }
          } else {
            stopLoop();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.8] },
    );
    io.observe(root);

    const onMobileChange = () => scheduleResize();
    mobileMq.addEventListener("change", onMobileChange);

    resetParticles();

    return () => {
      disposed = true;
      stopLoop();
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      mobileMq.removeEventListener("change", onMobileChange);
      root.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.remove();
    };
  }, [wordmark, monogram, align]);

  return <div ref={rootRef} className={className} data-cursor-text="Click to interact" aria-label={wordmark} />;
}
