"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { CAPS } from "../ekchitra-v5/shared";

/**
 * A small tag that takes the place of the cursor over anything inside its
 * positioned parent carrying a `data-name`: the pointer is hidden there and
 * the tag follows it, showing that name. Elsewhere it hides and the normal
 * pointer returns. Devices without a pointer never see it.
 */
export function NameCursor() {
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = tag.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const move = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-name]",
      );
      if (!target) {
        el.style.opacity = "0";
        return;
      }
      target.style.cursor = "none";
      if (el.textContent !== target.dataset.name) {
        el.textContent = target.dataset.name ?? "";
      }
      const rect = host.getBoundingClientRect();
      el.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span
      ref={tag}
      aria-hidden="true"
      className={cn(
        CAPS,
        "pointer-events-none absolute top-0 left-0 z-10 -translate-x-1/2 -translate-y-1/2 bg-(--k-ink) px-3 py-1.5 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity duration-200",
      )}
    />
  );
}
