"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll driving GSAP ScrollTrigger — mirrors the live site
 * (html.lenis + GSAP). Also wires the global fade-in + parallax observers.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fade-in-on-scroll for every .y-fade element
    const fades = gsap.utils.toArray<HTMLElement>(".y-fade");
    const fadeTriggers = fades.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => el.classList.add("is-in"),
      }),
    );

    // Scroll-scrubbed vertical parallax for [data-parallax] (value = px travel)
    const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    const parallaxTweens = parallax.map((el) => {
      const dist = parseFloat(el.dataset.parallax || "0");
      return gsap.fromTo(
        el,
        { y: dist },
        {
          y: -dist,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    ScrollTrigger.refresh();

    return () => {
      fadeTriggers.forEach((t) => t.kill());
      parallaxTweens.forEach((t) => t.scrollTrigger?.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
