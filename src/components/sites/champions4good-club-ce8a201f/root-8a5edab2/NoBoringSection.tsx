"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ASSET_BASE, loadLottie, seekPercent, type ScrubbableAnimation } from "./lottie";
import { initStickers } from "./stickers";
import { StickerCursor } from "./StickerCursor";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Keyframes = ReadonlyArray<readonly [percent: number, value: number]>;

// Webflow IX2 action list a-59 ("volleyball"), keyed by scroll progress %.
const IX2 = {
  volleyball: [[15, 0], [60, 90]],
  layer2Opacity: [[44, 1], [46, 0]],
  layer3Opacity: [[50, 0], [60, 1]],
  horse: [[55, 0], [85, 100]],
} satisfies Record<string, Keyframes>;
const IX2_SMOOTHING = 0.86;

// Linear interpolation between keyframes; holds first/last value outside them.
function track(p: number, kfs: Keyframes) {
  if (p <= kfs[0][0]) return kfs[0][1];
  for (let i = 1; i < kfs.length; i++) {
    const [p1, v1] = kfs[i];
    if (p <= p1) {
      const [p0, v0] = kfs[i - 1];
      return v0 + ((v1 - v0) * (p - p0)) / (p1 - p0);
    }
  }
  return kfs[kfs.length - 1][1];
}

const STICKERS = [
  { name: "purple-1", w: 298, h: 160 },
  { name: "purple-2", w: 298, h: 279 },
  { name: "purple-3", w: 338, h: 338 },
  { name: "green-1", w: 300, h: 300 },
  { name: "green-2", w: 338, h: 338 },
  { name: "yellow-1", w: 277, h: 160 },
  { name: "yellow-2", w: 338, h: 338 },
] as const;
const MOBILE_STICKERS = STICKERS.filter((s) => s.name.startsWith("green"));

function Sticker({ name, w, h }: (typeof STICKERS)[number]) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ASSET_BASE}/stickers/${name}.svg`}
      width={w}
      height={h}
      alt=""
      loading="lazy"
      data-sticker-item=""
      className={`c4g-sticker is-${name}`}
    />
  );
}

const COPY =
  "Sportliche Events, echte Begegnungen und neue Chancen fuer alle Mitglieder. In einer familiaeren Atmosphaere.";

export function NoBoringSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const volleyballRef = useRef<HTMLDivElement>(null);
  const horseRef = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const stickerWrapRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mobileStickerWrapRef = useRef<HTMLDivElement>(null);
  const mobileHorseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      const wrap = wrapRef.current!;
      const layer2 = layer2Ref.current!;
      const layer3 = layer3Ref.current!;
      const stickerWrap = stickerWrapRef.current!;
      let cancelled = false;
      let volleyball: ScrubbableAnimation | null = null;
      let horse: ScrubbableAnimation | null = null;

      // --- IX2 continuous scroll action (smoothing 86) ---
      let pos = 0;
      let raf = 0;
      const tick = () => {
        const rect = wrap.getBoundingClientRect();
        const vh = document.documentElement.clientHeight;
        const span = vh + rect.height;
        const target = Math.min(Math.max(vh - rect.top, 0), span) / span;
        pos += (target - pos) * Math.max(1 - IX2_SMOOTHING, 0.01);
        if (Math.abs(target - pos) < 1e-5) pos = target;

        const p = pos * 100;
        layer2.style.opacity = String(track(p, IX2.layer2Opacity));
        layer3.style.opacity = String(track(p, IX2.layer3Opacity));
        seekPercent(volleyball, track(p, IX2.volleyball));
        seekPercent(horse, track(p, IX2.horse));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const scrubbable = (anim: ScrubbableAnimation) => {
        anim.stop();
        anim.setSubframe(true);
        return anim;
      };
      loadLottie(volleyballRef.current!, `${ASSET_BASE}/lottie/volleyball-desktop.json`, {
        loop: false,
        autoplay: false,
        preserveAspectRatio: "xMidYMid slice",
      }).then((anim) => {
        if (cancelled) return anim.destroy();
        volleyball = scrubbable(anim);
      });
      loadLottie(horseRef.current!, `${ASSET_BASE}/lottie/horse.json`, {
        loop: false,
        autoplay: false,
        preserveAspectRatio: "xMidYMid slice",
      }).then((anim) => {
        if (cancelled) return anim.destroy();
        horse = scrubbable(anim);
      });

      // --- Layer-3 pointer events flip at 48% of the full pass ---
      const pointerTrigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          layer3.style.pointerEvents = self.progress >= 0.48 ? "auto" : "none";
        },
      });

      // --- GSAP split headline, scrubbed (from the source bundle) ---
      const splits: SplitText[] = [];
      const charTweens: gsap.core.Tween[] = [];
      const animateLines = (split: SplitText, start: string, end: string, onProgress?: (p: number) => void) => {
        split.lines.forEach((line) => {
          const chars = line.querySelectorAll(".split-char");
          gsap.set(line, { display: "block" });
          gsap.set(chars, { display: "inline-block", x: 80, scaleY: 0.95, skewX: 14, opacity: 0 });
          charTweens.push(
            gsap.to(chars, {
              keyframes: { "40%": { opacity: 1 }, "90%": { x: 0, scaleY: 1 }, "100%": { skewX: 0 } },
              duration: 0.3,
              ease: "expo.out",
              stagger: { each: 0.016, from: "start" },
              scrollTrigger: {
                trigger: wrap,
                start,
                end,
                scrub: 0,
                onUpdate: onProgress ? (self) => onProgress(self.progress) : undefined,
              },
            }),
          );
        });
      };

      document.fonts.ready.then(() => {
        if (cancelled) return;
        const splitOpts = { type: "chars, lines", tag: "span", charsClass: "split-char", linesClass: "split-line" };
        const subline = new SplitText(sublineRef.current!, splitOpts);
        const title = new SplitText(titleRef.current!, splitOpts);
        splits.push(subline, title);
        animateLines(title, "15% bottom", "40% top", (p) => {
          if (p >= 0.46) stickerWrap.setAttribute("data-sticker-active", "");
          else stickerWrap.removeAttribute("data-sticker-active");
        });
        animateLines(subline, "12% bottom", "36% top");
        ScrollTrigger.refresh();
      });

      const cleanupStickers = initStickers(stickerWrap);

      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        pointerTrigger.kill();
        charTweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        splits.forEach((s) => s.revert());
        cleanupStickers();
        volleyball?.destroy();
        horse?.destroy();
        stickerWrap.removeAttribute("data-sticker-active");
        layer2.style.opacity = "";
        layer3.style.opacity = "";
        layer3.style.pointerEvents = "";
      };
    });

    mm.add("(max-width: 991px)", () => {
      let cancelled = false;
      let horse: ScrubbableAnimation | null = null;
      loadLottie(mobileHorseRef.current!, `${ASSET_BASE}/lottie/horse-mobile.json`, {
        loop: true,
        autoplay: true,
      }).then((anim) => {
        if (cancelled) return anim.destroy();
        horse = anim;
        // Webflow's data-duration (2.0354s) retimes the clip.
        const sync = () => anim.setSpeed(anim.getDuration() / 2.0353687020353686);
        if (anim.isLoaded) sync();
        else anim.addEventListener("data_ready", sync);
      });
      const cleanupStickers = initStickers(mobileStickerWrapRef.current!);
      return () => {
        cancelled = true;
        horse?.destroy();
        cleanupStickers();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="c4g-s2" data-volleyball-sound="">
      {/* ≥992px: 400vh pinned scene */}
      <div className="c4g-desktop">
        <div ref={wrapRef} className="c4g-anim-wrap" data-volleyball="">
          <div className="c4g-anim-stage">
            <div className="c4g-layer-div">
              <div className="c4g-layer-1">
                <div ref={volleyballRef} className="c4g-lottie" />
              </div>

              <div ref={layer2Ref} className="c4g-layer-2">
                <div className="c4g-wrapper">
                  <div className="c4g-content" data-volleyball-content="">
                    <div ref={stickerWrapRef} className="c4g-sticker-wrap" data-sticker="" data-sticker-white="">
                      <div className="c4g-align-to-headline">
                        <div ref={sublineRef} className="c4g-s" data-volleyball-subline="">
                          Finally
                        </div>
                      </div>
                      <div className="c4g-subline c4g-mt-05">
                        <div className="c4g-max-45">
                          <h2 ref={titleRef} className="c4g-xl is-left" data-volleyball-title="">
                            No boring
                            <br />
                            networking
                          </h2>
                        </div>
                      </div>
                      {STICKERS.map((s) => (
                        <Sticker key={s.name} {...s} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div ref={layer3Ref} className="c4g-layer-3">
                <div className="c4g-l3-align">
                  <div ref={horseRef} className="c4g-lottie" />
                  <div className="c4g-l3-pad">
                    <div className="c4g-subline c4g-mt-3">
                      <div className="c4g-grid">
                        <div className="c4g-grid-left">
                          <h2 className="c4g-xl is-left is-green">Sondern</h2>
                        </div>
                        <div className="c4g-grid-right c4g-s is-left is-green">{COPY}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ≤991px: static block, looping horse */}
      <div className="c4g-mobile" data-volleyball-sound-mobile="">
        <div className="c4g-m-section">
          <div className="c4g-layer-div">
            <div className="c4g-layer-1">
              <div className="c4g-m-bottom">
                <div ref={mobileHorseRef} className="c4g-lottie is-horse" />
              </div>
            </div>
            <div className="c4g-layer-2">
              <div className="c4g-wrapper c4g-m-wrapper">
                <div className="c4g-m-top">
                  <div
                    ref={mobileStickerWrapRef}
                    className="c4g-sticker-wrap"
                    data-sticker=""
                    data-sticker-active=""
                  >
                    <div className="c4g-s is-left">Finally</div>
                    <div className="c4g-subline c4g-mt-05 c4g-m-01">
                      <div className="c4g-max-45">
                        <h2 className="c4g-xl is-left">
                          No Boring
                          <br />
                          Networking
                        </h2>
                      </div>
                    </div>
                    {MOBILE_STICKERS.map((s) => (
                      <Sticker key={s.name} {...s} />
                    ))}
                  </div>
                  <div className="c4g-subline c4g-mt-1">
                    <p className="c4g-s is-left">{COPY}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickerCursor />
    </section>
  );
}
