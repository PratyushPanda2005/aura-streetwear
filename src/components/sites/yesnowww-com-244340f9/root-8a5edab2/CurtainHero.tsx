"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CurtainPanelArt, FlyerLeftArt, FlyerRightArt, LampArt } from "./art/EntryArt";
import {
  BloomArt,
  EmblemArt,
  FlagArt,
  HandArt,
  MeteorBallArt,
  MeteorTrailArt,
  PillarArt,
  SeatedFigureArt,
  StandingFigureArt,
} from "./art/FigureArt";
import {
  BackdropArt,
  BushArt,
  CloudArt,
  FrondArt,
  MoonArt,
  StarArt,
  SunArt,
  TreeArt,
} from "./art/SceneArt";
import { HeroFrame } from "./HeroFrame";

/**
 * Entry curtain + hero tableau.
 *
 * A 500vh section holds a sticky 100vh stage. One scrubbed timeline spans the
 * whole section; its time axis is in viewport heights (0–5), so every tween
 * position below reads directly as "scroll distance in vh". All tweens are
 * linear — the source applies no easing, Lenis supplies the smoothing.
 */
const SECTION_VH = 5;
const BALL_SPIN_AT_VH = 2.8;
const HERO_FADE_AT_VH = 4;

export function CurtainHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lenis drives the scroll; GSAP's ticker drives Lenis so both share a frame.
    const lenis = reduceMotion ? null : new Lenis({ lerp: 0.1, smoothWheel: true });
    const onTick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const linear = { ease: "none" } as const;

      const tl = gsap.timeline({
        defaults: linear,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // 0–1vh: curtains part, lamps sink and fade.
      tl.to(q('[data-yn="curtain-l"]'), { x: -856, duration: 1 }, 0)
        .to(q('[data-yn="curtain-r"]'), { x: 856, duration: 1 }, 0)
        .to(q('[data-yn="lamp"]'), { y: 210, autoAlpha: 0, duration: 1 }, 0)

        // 1–2vh: curtains drift off and fade; hands open; figures step outward.
        .to(q('[data-yn="curtain-l"]'), { x: -1206, autoAlpha: 0, duration: 1 }, 1)
        .to(q('[data-yn="curtain-r"]'), { x: 1206, autoAlpha: 0, duration: 1 }, 1)
        .to(q('[data-yn="hand-l"]'), { scale: 1.4, x: -170, y: -115, duration: 1 }, 1)
        .to(q('[data-yn="hand-r"]'), { scale: 1.4, x: 170, y: -115, duration: 1 }, 1)
        .to(q('[data-yn="standing-l"]'), { x: -110, duration: 1 }, 1)
        .to(q('[data-yn="standing-r"]'), { x: 110, duration: 1 }, 1)
        .to(q('[data-yn="seated-l"]'), { x: -50, duration: 1 }, 1)
        .to(q('[data-yn="seated-r"]'), { x: 50, duration: 1 }, 1)

        // 1.5–2.5vh: flags shrink upward and move apart.
        .to(q('[data-yn="flag-l"]'), { scale: 0.7, x: -80, transformOrigin: "50% 0%", duration: 1 }, 1.5)
        .to(q('[data-yn="flag-r"]'), { scale: 0.7, x: 80, transformOrigin: "50% 0%", duration: 1 }, 1.5)

        // 2–3vh: canopy swells from its base; clouds and side pillars slide out.
        .to(q('[data-yn="tree"]'), { scale: 1.4, transformOrigin: "50% 100%", duration: 1 }, 2)
        .to(q('[data-yn="cloud-l"]'), { x: -110, duration: 1 }, 2)
        .to(q('[data-yn="cloud-r"]'), { x: 110, duration: 1 }, 2)
        .to(q('[data-yn="side-l"]'), { x: -110, duration: 1 }, 2)
        .to(q('[data-yn="side-r"]'), { x: 110, duration: 1 }, 2)

        // 3–5vh: side pillars keep drifting and fade out.
        .to(q('[data-yn="side-l"]'), { x: -150, autoAlpha: 0, duration: 2 }, 3)
        .to(q('[data-yn="side-r"]'), { x: 150, autoAlpha: 0, duration: 2 }, 3)

        // 2.5–4.5vh: comet sweeps across at a constant 6°, halving in size.
        .fromTo(
          q('[data-yn="meteor"]'),
          { x: 0, y: -300, scale: 1, rotation: 6 },
          { x: 4200, y: 0, scale: 0.5, rotation: 6, duration: 2 },
          2.5,
        )
        // Pad the timeline to the full section length.
        .set({}, {}, SECTION_VH);

      // Time-based, scroll-triggered: the comet's core spins once (≈52°/s).
      const ball = q('[data-yn="ball"]');
      gsap.set(ball, { rotation: 13 });
      ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${window.innerHeight * BALL_SPIN_AT_VH} top`,
        onEnter: () =>
          gsap.fromTo(ball, { rotation: 13 }, { rotation: 373, duration: 7, ease: "none", overwrite: true }),
        onLeaveBack: () => gsap.set(ball, { rotation: 13, overwrite: true }),
      });

      // Time-based, scroll-triggered: hero layer cuts out as the stage unpins.
      const hero = q('[data-yn="hero"]');
      ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${window.innerHeight * HERO_FADE_AT_VH} top`,
        onEnter: () => gsap.to(hero, { autoAlpha: 0, duration: 0.3, overwrite: true }),
        onLeaveBack: () => gsap.to(hero, { autoAlpha: 1, duration: 0.3, overwrite: true }),
      });

      // Time loop: both flyers bob in sync, 2s each way.
      if (!reduceMotion) {
        gsap.to(q("[data-yn-bob]"), { y: -20, duration: 2, ease: "none", yoyo: true, repeat: -1 });
      }
    }, section);

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis?.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[4] h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero layer (under the curtain) */}
        <div data-yn="hero" className="absolute inset-0 z-[1] bg-[#001482]">
          <BackdropArt className="absolute inset-x-0 top-[50px] h-[calc(100%-100px)] w-full" />
          <BushArt className="absolute inset-x-0 bottom-0 h-[15.3vw] w-full" />

          <SunArt className="absolute left-[calc(50%-38px)] top-[67px] z-0 w-[76px]" />
          <MoonArt className="absolute left-[calc(50%-90px)] top-[110px] z-0 w-9" />
          <MoonArt className="absolute left-[calc(50%+54px)] top-[110px] z-0 w-9 -scale-x-100" />
          <StarArt className="absolute left-[calc(50%-82px)] top-[70px] w-5" />
          <StarArt className="absolute left-[calc(50%+62px)] top-[70px] w-5" />

          <div className="absolute left-1/2 top-[10px] z-[1] w-[max(calc(100%-32px),1126px)] -translate-x-1/2">
            <div data-yn="tree">
              <TreeArt className="block w-full" />
            </div>
          </div>

          <div
            data-yn="flag-l"
            className="absolute left-[calc(50%-228px)] top-[120px] z-[2] w-[61px] md:left-[calc(50%-350px)] md:w-[71px] lg:left-[calc(50%-329px)] lg:w-[110px]"
          >
            <FlagArt variant="left" className="block w-full" />
          </div>
          <div
            data-yn="flag-r"
            className="absolute left-[calc(50%+166px)] top-[120px] z-[2] w-[61px] md:left-[calc(50%+279px)] md:w-[71px] lg:left-[calc(50%+219px)] lg:w-[110px]"
          >
            <FlagArt variant="right" className="block w-full" />
          </div>

          <div className="absolute left-1/2 top-[75px] z-[3] w-[468px] -translate-x-1/2 lg:top-[55px] lg:w-[600px]">
            <EmblemArt className="block w-full" />
          </div>

          <div data-yn="standing-l" className="absolute bottom-[36px] left-[-95px] z-[3] w-[313px] lg:left-[135px]">
            <StandingFigureArt className="block w-full -scale-x-100" />
          </div>
          <div data-yn="standing-r" className="absolute bottom-[36px] right-[-95px] z-[4] w-[313px] lg:right-[135px]">
            <StandingFigureArt className="block w-full" />
          </div>
          <div data-yn="seated-l" className="absolute bottom-[55px] left-[-150px] z-[4] w-[281px] lg:left-[-13px]">
            <SeatedFigureArt className="block w-full -scale-x-100" />
          </div>
          <div data-yn="seated-r" className="absolute bottom-[55px] right-[-150px] z-[4] w-[281px] lg:right-[-13px]">
            <SeatedFigureArt className="block w-full" />
          </div>

          <div data-yn="cloud-l" className="absolute left-[-211px] top-[45px] z-[4] w-[305px] lg:left-[-90px] lg:w-[544px]">
            <CloudArt className="block w-full -scale-x-100" />
          </div>
          <div data-yn="cloud-r" className="absolute right-[-211px] top-[45px] z-[4] w-[305px] lg:right-[-90px] lg:w-[544px]">
            <CloudArt className="block w-full" />
          </div>

          <FrondArt className="absolute left-[calc(50%-244px)] top-[58px] z-[4] w-[171px] -scale-x-100" />
          <FrondArt className="absolute left-[calc(50%+73px)] top-[58px] z-[4] w-[171px]" />

          <div data-yn="hand-l" className="absolute left-[calc(50%-557px)] top-[493px] z-[5] hidden w-[539px] lg:block">
            <HandArt className="block w-full -scale-x-100" />
          </div>
          <div data-yn="hand-r" className="absolute left-[calc(50%+19px)] top-[493px] z-[5] hidden w-[539px] lg:block">
            <HandArt className="block w-full" />
          </div>

          <div data-yn="side-l" className="absolute inset-y-0 left-0 z-[5] hidden w-[420px] lg:block">
            <BloomArt className="absolute left-[76px] top-[125px] w-[325px] -scale-x-100" />
            <PillarArt className="absolute left-[10px] top-[115px] w-[178px] -scale-x-100" />
          </div>
          <div data-yn="side-r" className="absolute inset-y-0 right-0 z-[5] hidden w-[420px] lg:block">
            <BloomArt className="absolute right-[76px] top-[125px] w-[325px]" />
            <PillarArt className="absolute right-[10px] top-[115px] w-[178px]" />
          </div>

          <HeroFrame className="z-10" />
        </div>

        {/* Comet strip: parked off-screen left, outside the hero layer so it survives the hero fade */}
        <div data-yn="meteor" className="absolute left-[-3400px] top-[198px] z-[7] h-[600px] w-[3000px]">
          <MeteorTrailArt className="absolute inset-0 size-full" />
          <div data-yn="ball" className="absolute left-[2396px] top-[95px] w-[414px]">
            <MeteorBallArt className="block w-full" />
          </div>
        </div>

        {/* Curtain halves: 52% wide each, overlapping 12px at the centre */}
        <div data-yn="curtain-l" className="absolute inset-y-0 right-[calc(50%-6px)] z-[9] w-[52%]">
          <CurtainPanelArt className="block size-full" />
          <div className="absolute right-[-30px] top-[19%] w-[250px] md:w-[400px] lg:w-[346px]">
            <div data-yn-bob>
              <FlyerLeftArt className="block w-full" />
            </div>
          </div>
        </div>
        <div data-yn="curtain-r" className="absolute inset-y-0 left-[calc(50%-6px)] z-[9] w-[52%]">
          <CurtainPanelArt className="block size-full -scale-x-100" />
          <div className="absolute left-0 top-[22%] w-[250px] md:w-[400px] lg:w-[346px]">
            <div data-yn-bob>
              <FlyerRightArt className="block w-full" />
            </div>
          </div>
        </div>

        <div data-yn="lamp" className="absolute bottom-0 left-0 z-10 w-[140px] lg:left-[80px] lg:w-[200px]">
          <LampArt className="block w-full" />
        </div>
        <div data-yn="lamp" className="absolute bottom-0 right-0 z-10 w-[140px] lg:right-[80px] lg:w-[200px]">
          <LampArt className="block w-full" />
        </div>
      </div>
    </section>
  );
}
