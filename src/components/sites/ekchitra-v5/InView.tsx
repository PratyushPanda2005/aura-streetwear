"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useShown } from "./useShown";

/**
 * Marks itself `data-shown="true"` each time it scrolls into view, so CSS
 * can run an entry animation on its children. `delay` (ms) is passed to them as
 * `--delay`, for staggering neighbours.
 */
export function InView({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useShown(ref);

  useEffect(() => {
    ref.current?.style.setProperty("--delay", `${delay}ms`);
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
