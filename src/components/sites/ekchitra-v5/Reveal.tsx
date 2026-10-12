"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useShown } from "./useShown";

/** Fades and lifts its children into place each time they scroll into view. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useShown(ref);

  return (
    <div ref={ref} className={cn("ek5-reveal", className)}>
      {children}
    </div>
  );
}
