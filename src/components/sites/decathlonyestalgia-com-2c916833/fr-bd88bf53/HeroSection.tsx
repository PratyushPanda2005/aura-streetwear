"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shape } from "./Shapes";
import { VID } from "./data";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: the centred video frame grows to fill the viewport as you
    // scroll through the 200svh section.
    mm.add("(min-width: 1024px)", () => {
      const tween = gsap.fromTo(
        frame,
        { width: "35vw", height: "72vh", borderRadius: "6px" },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // grow completes within the first viewport, then the sticky frame
            // holds full-bleed for the rest of the 200svh section (as on the live site)
            end: "+=100%",
            scrub: true,
          },
        },
      );
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="c-hero relative h-svh w-full lg:h-[200svh]"
      aria-label="Decathlon Yestalgia"
    >
      <h1 className="sr-only">Decathlon Yestalgia</h1>
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {/* Decorative Memphis shapes — positions/rotations matched to the live hero */}
        <Shape name="triangle-teal" data-parallax="40" className="absolute top-[-3vh] right-0 w-[10%]" />
        <Shape name="arch-pink" data-parallax="60" className="absolute top-[20%] left-[16%] w-[8%] rotate-[135deg]" />
        <Shape name="ball-orange" data-parallax="-55" className="absolute top-[26%] right-[16%] w-[7%]" />
        <Shape name="arch-blue" data-parallax="70" className="absolute bottom-[14%] right-[6%] w-[10%] rotate-[-135deg]" />
        <Shape
          name="lightning-yellow"
          data-parallax="-70"
          className="absolute bottom-[8%] left-[8%] w-[13%]"
        />

        {/* Growing video frame */}
        <div
          ref={frameRef}
          className="relative aspect-[9/16] w-[70vw] overflow-hidden lg:aspect-auto lg:h-[70vh] lg:w-[34vw]"
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src={`${VID}/hero-master-16-9.mp4`}
              type="video/mp4"
              media="(min-width: 1024px)"
            />
            <source src={`${VID}/hero-master-16-9.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
