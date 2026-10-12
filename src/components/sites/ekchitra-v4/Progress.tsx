"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tracks how far its block has been scrolled and exposes it to CSS.
 *
 * - Writes the progress (0–1) to the `--p` custom property on the block.
 * - Any descendant with `data-step="0.4"` gets `data-on="true"` once the progress
 *   passes that value, and `false` again when scrolled back.
 *
 * `through` runs from the block entering the bottom of the screen to leaving the
 * top; `pinned` runs while a block taller than the screen is scrolled past (for
 * sticky content inside it).
 */
export function Progress({
  mode = "through",
  varName = "--p",
  id,
  className,
  children,
}: {
  mode?: "through" | "pinned";
  /** Custom property the progress is written to; change it when nesting. */
  varName?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = [...el.querySelectorAll<HTMLElement>("[data-step]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const raw =
        mode === "pinned"
          ? -rect.top / Math.max(1, rect.height - view)
          : (view - rect.top) / (rect.height + view);
      const progress = Math.min(1, Math.max(0, raw));
      el.style.setProperty(varName, progress.toFixed(4));
      for (const step of steps) {
        step.dataset.on = String(progress >= Number(step.dataset.step));
      }
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
  }, [mode, varName]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
