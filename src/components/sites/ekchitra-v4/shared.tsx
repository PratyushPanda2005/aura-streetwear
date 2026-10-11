import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { ROUTES } from "../ekchitra-redesign/data";

/** Sans of this version (loaded in `src/app/ekchitra-v4/layout.tsx`). */
export const SANS = "font-[family-name:var(--font-ek4-sans)]";

/** Thin serif for headings. */
export const SERIF = "font-[family-name:var(--font-ek4-serif)] font-extralight";

/** Pen script for the handwritten note. */
export const SCRIPT = "font-[family-name:var(--font-ek4-script)]";

/** Section heading. */
export const H2 = cn(
  SERIF,
  "text-[38px] leading-[1] tracking-[-0.02em] lg:text-[60px]",
);

/** Larger section heading. */
export const H1 = cn(
  SERIF,
  "text-[44px] leading-[1] tracking-[-0.02em] lg:text-[80px]",
);

/** Running text. */
export const BODY = "text-[16px] leading-6";

/** Small uppercase label: nav links and buttons. */
export const CAPS = "text-[14px] leading-4 tracking-[0.04em] uppercase";

/** Page gutter. */
export const GUTTER = "px-4 lg:px-6";

export const V4_HOME = "/ekchitra-v4";

export const V4_NAV = [
  { label: "About", href: "#about" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Artists", href: ROUTES.artists },
  { label: "Artworks", href: ROUTES.artworks },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/** Text link led by a small square arrow tile. `light` is for photographs. */
export function ArrowLink({
  light = false,
  className,
  children,
  ...rest
}: ComponentProps<"a"> & { light?: boolean }) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-x-3 text-[16px] leading-4",
        light ? "text-white" : "text-(--v-ink)",
        SANS,
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-[4px] transition-colors duration-300",
          light
            ? "bg-white text-(--v-ink) group-hover:bg-(--v-maroon) group-hover:text-white"
            : "bg-(--v-ink)/10 group-hover:bg-(--v-maroon) group-hover:text-white",
        )}
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            d="M1.5 8h13M9.5 3l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </span>
      {children}
    </a>
  );
}
