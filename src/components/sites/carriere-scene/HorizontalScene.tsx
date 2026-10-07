"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  IntroPanel,
  MetiersPanel,
  FormationsPanel,
  TemoignagesPanel,
} from "./Panels";
import { GRAIN } from "./shared";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Sections that scroll horizontally AFTER the intro is pushed away.
const GALLERY = 3;
// Fraction of scroll during which the man reveals + pushes the intro off.
const INTRO_OUT = 0.4;

/**
 * The intro (section 1) is a full-screen cover. An articulated black-and-white
 * man lives BEHIND it: hidden at rest, then revealed at the intro's trailing
 * edge in a straining PUSH cycle (GSAP-driven jointed limbs) as he shoves it
 * off to the left. Once it's gone he's carried off with it, and the remaining
 * sections scroll horizontally on a smooth 1:1 map to the scrollbar.
 */
export function HorizontalScene() {
  const driverRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const manRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // The figure holds a fixed PUSH pose (lean + arms braced against the panel);
  // only its legs stride, scrubbed by scroll. Set up once here.
  const legTlRef = useRef<{ back: gsap.core.Timeline; front: gsap.core.Timeline } | null>(null);

  useEffect(() => {
    if (reduce) return;
    const root = manRef.current;
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll(s));
    const dude = root.querySelector(".dude");
    const legs = q(".leg");
    const arms = q(".arm");
    if (!dude || legs.length < 2 || arms.length < 2) return;

    const head = root.querySelector(".head");
    const armBottoms = q(".arm-bottom");

    // Joint pivots.
    gsap.set(arms, { svgOrigin: "180 58" });
    gsap.set(head, { svgOrigin: "180 45" });
    gsap.set(armBottoms, { svgOrigin: "178 118" });
    gsap.set(legs, { svgOrigin: "177 145" });
    gsap.set(root.querySelectorAll(".leg-bottom"), { svgOrigin: "171 220" });
    gsap.set(dude, { svgOrigin: "177 317" });

    // Fixed push pose: lean in; arms swung FORWARD so the hands lead and press
    // the panel (head stays behind them).
    gsap.set(dude, { rotation: 12 });
    gsap.set(head, { rotation: 14 });
    gsap.set(arms, { rotation: -78 });
    gsap.set(armBottoms, { rotation: 0 });

    // Per-leg stride cycle (from the reference walk cycle), paused for scrubbing.
    const makeLeg = (leg: Element) => {
      const legBottom = leg.querySelector(".leg-bottom");
      return gsap
        .timeline({ repeat: -1, paused: true })
        .fromTo(leg, { rotation: -25 }, { duration: 0.5, rotation: 15, ease: "sine.inOut" }, 0)
        .to(leg, { duration: 0.25, rotation: -25, ease: "sine.in" }, ">")
        .to(legBottom, { duration: 0.25, rotation: 15, ease: "sine.inOut" }, 0.25)
        .to(legBottom, { duration: 0.25, rotation: 80, ease: "sine.in" }, ">")
        .to(legBottom, { duration: 0.25, rotation: 0, ease: "sine.out" }, ">");
    };

    const back = makeLeg(legs[0]);
    const front = makeLeg(legs[1]);
    legTlRef.current = { back, front };

    return () => {
      back.kill();
      front.kill();
    };
  }, [reduce]);

  // Scroll scrubbing.
  useEffect(() => {
    if (reduce) return;
    const driver = driverRef.current;
    const intro = introRef.current;
    const gallery = galleryRef.current;
    const man = manRef.current;
    if (!driver || !intro || !gallery || !man) return;

    let raf = 0;
    let cur = 0;

    const tick = () => {
      const vw = gallery.clientWidth || window.innerWidth;
      const vh = window.innerHeight;
      const scrollable = Math.max(driver.offsetHeight - vh, 1);
      const target = clamp(-driver.getBoundingClientRect().top / scrollable, 0, 1);
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0002) cur = target;

      // Intro cover slides off to the left.
      const sx = easeInOut(clamp(cur / INTRO_OUT, 0, 1));
      intro.style.transform = `translate3d(${(-sx * vw).toFixed(1)}px,0,0)`;

      // Man position: revealed at the intro's trailing edge (body over the dark
      // gallery, arms reaching behind the panel), then carried off to the left.
      const manW = man.offsetWidth || vw * 0.16;
      const restX = manW * 0.15 + vw * 0.04; // reveal-end / exit-start position
      let manX: number;
      let opacity = 1;
      if (cur < INTRO_OUT) {
        // Hands meet the intro's receding right edge; whole figure stays visible.
        manX = vw * (1 - sx) + restX;
        opacity = clamp(cur / 0.05, 0, 1);
      } else {
        const e = clamp((cur - INTRO_OUT) / 0.1, 0, 1);
        manX = restX + (-manW * 1.7 - restX) * e;
        opacity = 1 - e;
      }
      man.style.transform = `translate3d(${manX.toFixed(1)}px,0,0)`;
      man.style.opacity = String(opacity);

      // Legs stride, scrubbed by scroll (offset phases for a natural gait).
      const L = legTlRef.current;
      if (L) {
        const t = cur * 9;
        L.back.time(0.7 + t);
        L.front.time(0.2 + t);
      }

      // Remaining sections scroll horizontally, continuously, after the intro.
      const gp = easeInOut(clamp((cur - INTRO_OUT) / (1 - INTRO_OUT), 0, 1));
      gallery.style.transform = `translate3d(${(-gp * (GALLERY - 1) * vw).toFixed(1)}px,0,0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Reduced-motion: plain horizontally-scrollable strip, no character.
  if (reduce) {
    return (
      <div className="flex h-screen w-screen snap-x snap-mandatory overflow-x-auto bg-[#141414]">
        <IntroPanel />
        <MetiersPanel />
        <FormationsPanel />
        <TemoignagesPanel />
      </div>
    );
  }

  return (
    <div
      ref={driverRef}
      className="relative w-full bg-[#141414]"
      style={{ height: `${(GALLERY + 2) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#141414]">
        {/* Shared roughen filter for the intro poster */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <filter id="cs-rough">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.011 0.014"
                numOctaves="2"
                seed="7"
                result="n"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="n"
                scale="10"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <style>{`
          @keyframes cs-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .cs-marquee-track { animation: cs-marquee 16s linear infinite; }
          .cs-pill:hover .cs-marquee-track { animation-play-state: paused; }
          .cs-pill { transition: transform .35s cubic-bezier(.22,1,.36,1); }
          .cs-pill:hover { transform: translateY(-2px); }
        `}</style>

        {/* Gallery — sections revealed behind the intro (z-10) */}
        <div
          ref={galleryRef}
          className="absolute inset-0 z-10 flex h-full will-change-transform"
        >
          <MetiersPanel />
          <FormationsPanel />
          <TemoignagesPanel />
        </div>

        {/* Man — behind the intro, in front of the gallery (z-20) */}
        <div
          ref={manRef}
          className="pointer-events-none absolute bottom-[1.5vh] left-0 z-40 h-[34vh] will-change-transform"
        >
          <div className="h-full" style={{ transform: "scaleX(-1)" }}>
            <PushingDude />
          </div>
        </div>

        {/* Intro cover (z-30) — slides off to reveal the man + gallery */}
        <div ref={introRef} className="absolute inset-0 z-30 will-change-transform">
          <IntroPanel />
        </div>

        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[60] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN, opacity: 0.5 }}
        />
      </div>
    </div>
  );
}

/** Articulated black-and-white figure (head, jointed arms + legs). Drawn facing right; flipped by the parent. */
function PushingDude() {
  return (
    <svg
      viewBox="120 -12 130 344"
      className="h-full w-auto"
      style={{ overflow: "visible" }}
      aria-label="Pushing figure"
    >
      <g
        className="dude"
        stroke="#f3f3f3"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <g className="leg">
          <path
            className="leg-bottom"
            d="M182,317l-10.4-2.8c-2.7-0.7-4.5-3.2-4.4-6c1.7-13,3-27,3.7-42.1c0.8-16.5,0.7-32,0.1-46.1"
          />
          <path d="M171,220l6-60" />
        </g>
        <g className="leg">
          <path
            className="leg-bottom"
            d="M182,317l-10.2-2.7c-2.8-0.8-4.7-3.4-4.6-6.3c-0.8-13.9-1-29.2-0.2-45.8c0.7-15.2,2.1-29.4,4-42.2"
          />
          <path d="M171,222c0.3-10,4.3-42,5.3-48" />
        </g>

        <g className="arm">
          <path d="M175,75c-0.6,8.7-0.6,18.9,0.8,30.1c0.6,4.6,1.3,8.9,2.2,12.9" />
          <path
            className="arm-bottom"
            d="M186,175c-0.2-3.1-0.4-6.2-0.7-9.3c-1.5-16.9-4.1-32.9-7.3-47.7"
          />
        </g>
        <g className="arm">
          <path d="M178.8,82.2c-1.9,13.1-1.8,25.2-0.8,35.8" />
          <path
            className="arm-bottom"
            d="M186,175c-2.4-7.6-4.7-16.8-6.3-27.2c-1.6-11.3-2-21.3-1.7-29.8"
          />
        </g>

        <path
          className="head"
          d="M195,14.8c-10.8-5.7-23.9,1.3-28.2,12.4c-4.9,13,6.3,28.4,17.8,29.1c13.2,0.8,22.2-16.1,19.5-26.7c-1.6-6.5-5.2-7.1-5.2-7.1"
        />
      </g>
    </svg>
  );
}
