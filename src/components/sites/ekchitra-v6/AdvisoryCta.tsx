"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../ekchitra-v5/shared";
import { SERVICE_LIST } from "./data";

const ADVISORY = SERVICE_LIST[1];

/** Distance between characters of the hidden picture, px. */
const STEP = 10;

/** Characters from lightest to densest; each cell takes one by brightness. */
const RAMP = " .:-=+*#%@";

/** Largest the window grows while the pointer keeps moving, px. */
const REACH = 300;

/** How long the pointer may rest before the window closes, ms. */
const REST_MS = 90;

/**
 * Art advisory, after the newsletter block of stateofaidesign.com.
 *
 * A black block with a centred heading, a line about the service, an email
 * field joined to a sky-blue button, and a small note. Under the black lies
 * a painting from the gallery printed in grey text characters; moving the
 * pointer opens a soft round window in the black that follows it — clear in
 * the middle for six-tenths of its radius, then fading out in steps of a
 * fifth, a half and four-fifths black every 20px. As on the reference, the
 * window opens only while the pointer moves — growing towards 300px — and
 * closes again as soon as it rests, trailing a little behind the pointer. There is no list to join yet, so the form only thanks
 * the visitor.
 */
export function AdvisoryCta() {
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  // Print the painting in characters, once per size.
  useEffect(() => {
    const el = canvas.current;
    const box = host.current;
    if (!el || !box) return;
    const context = el.getContext("2d");
    if (!context) return;
    const picture = new window.Image();
    picture.src = ADVISORY.image.src;

    const draw = () => {
      const { width, height } = box.getBoundingClientRect();
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      el.width = Math.round(width * ratio);
      el.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      if (!picture.complete || !picture.naturalWidth) return;
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
      context.fillStyle = "#9a9a9a";
      context.font = `${STEP + 1}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const i = (y * columns + x) * 4;
          const tone =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const glyph =
            RAMP[Math.min(RAMP.length - 1, Math.floor(tone * RAMP.length))];
          if (glyph !== " ") {
            context.fillText(glyph, x * STEP + STEP / 2, y * STEP + STEP / 2);
          }
        }
      }
    };

    picture.onload = draw;
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // The window: follows the pointer, easing, and grows open or shut.
  useEffect(() => {
    const box = host.current;
    const mask = cover.current;
    if (!box || !mask) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let x = 0;
    let y = 0;
    let r = 0;
    let tx = 0;
    let ty = 0;
    let tr = 0;
    let frame = 0;
    let rest = 0;
    const tick = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      r += (tr - r) * 0.08;
      mask.style.setProperty("--x", `${x.toFixed(1)}px`);
      mask.style.setProperty("--y", `${y.toFixed(1)}px`);
      mask.style.setProperty("--r", `${r.toFixed(1)}px`);
      const settled =
        Math.abs(tx - x) < 0.3 &&
        Math.abs(ty - y) < 0.3 &&
        Math.abs(tr - r) < 0.3;
      frame = settled ? 0 : window.requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (r < 1) {
        x = tx;
        y = ty;
      }
      // The window opens while the pointer moves and closes when it rests.
      tr = REACH;
      window.clearTimeout(rest);
      rest = window.setTimeout(() => {
        tr = 0;
        kick();
      }, REST_MS);
      kick();
    };
    const leave = () => {
      window.clearTimeout(rest);
      tr = 0;
      kick();
    };
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(rest);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section
      ref={host}
      id="advisory"
      aria-label="Art advisory"
      className={cn(
        "relative flex min-h-[560px] scroll-mt-11 items-center justify-center overflow-hidden bg-(--k-ink) px-4 py-24 text-white lg:min-h-[680px] lg:px-5",
        SANS,
      )}
    >
      {/* The hidden picture, in characters. */}
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {/* The black over it, with a soft window cut where the pointer is. */}
      <div
        ref={cover}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-(--k-ink) [--r:0px] [--x:50%] [--y:50%] [mask-image:radial-gradient(circle_var(--r)_at_var(--x)_var(--y),transparent_0px,transparent_calc(var(--r)*0.6),rgba(0,0,0,0.2)_calc(var(--r)*0.6_+_20px),rgba(0,0,0,0.5)_calc(var(--r)*0.6_+_40px),rgba(0,0,0,0.8)_calc(var(--r)*0.6_+_60px),black_calc(var(--r)*0.6_+_80px))]"
      />

      <div className="relative w-full max-w-[664px] text-center">
        <p className={cn(CAPS, "text-[11px] text-white/60")}>Art advisory</p>
        <h2 className="mt-5 text-[34px] leading-[1.05] tracking-[-0.035em] lg:text-[52px]">
          Start, refine or grow
          <br />
          your collection
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.4] lg:text-[19px]">
          {ADVISORY.body} Tell us a little about what you live with, and
          we&rsquo;ll be in touch.
        </p>

        {sent ? (
          <p className="mt-10 text-[17px] lg:mt-14">
            Thank you — we&rsquo;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mt-10 flex flex-col sm:flex-row lg:mt-14"
          >
            <label htmlFor="ek6-advisory-email" className="sr-only">
              Your email
            </label>
            <input
              id="ek6-advisory-email"
              type="email"
              required
              placeholder="Your email"
              autoComplete="email"
              className="h-[62px] min-w-0 flex-1 bg-white px-5 text-[17px] text-(--k-ink) outline-none placeholder:text-(--k-ink)"
            />
            <button
              type="submit"
              className="h-[62px] bg-(--k-sky) px-8 text-[17px] text-(--k-ink) transition-colors hover:bg-white"
            >
              Talk to us
            </button>
          </form>
        )}

        <p className="mx-auto mt-6 max-w-[560px] text-[13px] leading-[1.45] text-white/70">
          We&rsquo;ll only use your email to reply about your collection.
        </p>
      </div>
    </section>
  );
}
