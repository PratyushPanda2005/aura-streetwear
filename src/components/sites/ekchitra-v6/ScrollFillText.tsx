"use client";

import { useEffect, useRef } from "react";

/** How faint a letter is before the fill reaches it. */
const FAINT = 0.18;

/**
 * Text that fills from grey to black, letter by letter, as it scrolls up the
 * screen: it starts once its top passes 85% of the screen and is full by the
 * time its bottom reaches 45%. Words never break across lines. Shown
 * fully black for visitors who prefer reduced motion.
 */
export function ScrollFillText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = [...el.querySelectorAll<HTMLElement>("[data-char]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((char) => (char.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.85;
      const end = view * 0.45 - rect.height;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end)),
      );
      const filled = progress * chars.length;
      chars.forEach((char, index) => {
        const amount = Math.min(1, Math.max(0, filled - index));
        char.style.opacity = (FAINT + (1 - FAINT) * amount).toFixed(3);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {[...word].map((char, c) => (
              <span key={c} data-char="" className="opacity-[0.18]">
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
