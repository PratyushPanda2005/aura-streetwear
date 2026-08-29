"use client";

import { useEffect, useRef, useState } from "react";
import { HeroSection } from "./HeroSection";
import { ProjectsGrid } from "./ProjectsGrid";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-scrubbed "camera pull-away" transition. The white hero is left
 * completely intact and is treated as a single card: as the user scrolls it
 * scales down and drifts toward the lower-middle while a black canvas holding
 * the projects grid is revealed behind it. Fully reversible — scrolling back up
 * rewinds the hero to full-screen because every frame is derived from the
 * current scroll position (not a one-way trigger).
 */
export function ScrollTransition() {
  const wrapRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const projects = projectsRef.current;
    if (!wrap || !card || !projects) return;

    let raf = 0;
    let cur = 0;

    const tick = () => {
      const vh = window.innerHeight;
      const scrollable = Math.max(wrap.offsetHeight - vh, 1);
      const raw = clamp(-wrap.getBoundingClientRect().top / scrollable, 0, 1);
      // Transition resolves over the first 82% of scroll, then holds so the
      // final composition sits still for a beat.
      const target = clamp(raw / 0.82, 0, 1);
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0002) cur = target;

      const e = easeInOutCubic(cur);

      // Hero card — the webpage becoming a smaller object that docks at the
      // bottom-centre, roughly half visible, with the projects grid on top.
      const scale = 1 - 0.5 * e;
      const ty = e * vh * 0.42;
      const radius = e * 18;
      card.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      card.style.borderRadius = `${radius.toFixed(2)}px`;
      card.style.boxShadow =
        e > 0.001
          ? `0 ${(44 * e).toFixed(1)}px ${(130 * e).toFixed(1)}px -30px rgba(0,0,0,${Math.min(0.6, e * 1.1).toFixed(3)})`
          : "none";

      // Projects grid — emerges with a parallax lift + staggered cards.
      const gp = clamp((cur - 0.26) / 0.62, 0, 1);
      const ge = easeOutCubic(gp);
      projects.style.setProperty("--gp", ge.toFixed(4));
      projects.style.transform = `translate3d(0, ${((1 - ge) * 26).toFixed(2)}px, 0) scale(${(1 + (1 - ge) * 0.045).toFixed(4)})`;
      projects.style.pointerEvents = ge > 0.6 ? "auto" : "none";

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Reduced-motion / no-JS friendly fallback: hero, then projects stacked.
  if (reduce) {
    return (
      <>
        <HeroSection />
        <section className="min-h-screen w-full bg-black">
          <ProjectsGrid
            className="min-h-screen w-full"
            style={{ ["--gp" as string]: 1 }}
          />
        </section>
      </>
    );
  }

  return (
    <section ref={wrapRef} className="relative h-[220vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Projects canvas (revealed behind) */}
        <div
          ref={projectsRef}
          className="absolute inset-0 z-10 h-full w-full will-change-transform"
          style={{ ["--gp" as string]: 0 }}
        >
          <ProjectsGrid className="h-full w-full" />
        </div>

        {/* Hero card (unchanged design, scaled as one object) */}
        <div
          ref={cardRef}
          className="absolute inset-0 z-30 h-full w-full overflow-hidden bg-white will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          <HeroSection />
        </div>
      </div>
    </section>
  );
}
