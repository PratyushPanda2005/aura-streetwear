"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { SERIF } from "./shared";

const DURATION_MS = 1100;

/**
 * Loading screen: a black sheet with a count from 0 to 100 at the bottom left,
 * which lifts away to reveal the page.
 */
export function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setDone(true);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      data-done={done}
      onTransitionEnd={() => setGone(true)}
      className="ek3-loader fixed inset-0 z-[60] flex items-end bg-(--ek-ink) p-4 text-(--ek-paper) lg:p-6"
    >
      <span
        className={cn(
          "text-[96px] leading-[0.8] tabular-nums lg:text-[160px]",
          SERIF,
        )}
      >
        {count}
      </span>
    </div>
  );
}
