"use client";

import { useRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "./shared";
import { useShown } from "./useShown";

/**
 * Capitals link whose underline draws in from the left each time it scrolls
 * into view. `light` is for dark grounds and photographs; `arrow` adds a small
 * arrow that nudges forward on hover.
 */
export function CapsLink({
  light = false,
  arrow = false,
  className,
  children,
  ...rest
}: ComponentProps<"a"> & { light?: boolean; arrow?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useShown(ref);

  return (
    <a
      ref={ref}
      className={cn(
        CAPS,
        "ek5-underline group relative inline-flex items-center gap-x-2 pb-1 transition-colors duration-300",
        light ? "text-white hover:text-white/60" : "hover:text-(--k-maroon)",
        SANS,
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-3 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M1 8h14M9.5 2.5 15 8l-5.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
    </a>
  );
}
