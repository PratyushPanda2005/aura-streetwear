import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { ROUTES } from "../ekchitra-redesign/data";

/** Display serif of this version (loaded in `src/app/ekchitra-v2/layout.tsx`). */
export const DISPLAY = "font-[family-name:var(--font-ek-display)]";

/** Sans of this version. */
export const SANS = "font-[family-name:var(--font-ek-sans)]";

export const V2_HOME = "/ekchitra-v2";

export const V2_NAV = [
  { label: "About", href: "#about" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Artists", href: ROUTES.artists },
  { label: "Artworks", href: ROUTES.artworks },
  { label: "Services", href: "#services" },
];

/** Map-pin icon for venue lines. */
export function Pin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path
        d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 0 0-9 0c0 3.8 4.5 8 4.5 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle
        cx="8"
        cy="6.5"
        r="1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

const CTA_VARIANT = {
  /** Dark red with white label: on white grounds. */
  solid: "bg-(--ek-maroon) text-(--ek-paper) hover:bg-(--ek-ink)",
  /** White with dark red label: on photographs and colour. */
  light:
    "bg-(--ek-paper) text-(--ek-maroon) hover:bg-(--ek-ink) hover:text-(--ek-paper)",
} as const;

/**
 * The call-to-action of this version: a block with its top-left and
 * bottom-right corners cut on the diagonal.
 */
export function CtaLink({
  variant = "solid",
  size = "md",
  className,
  ...rest
}: ComponentProps<"a"> & {
  variant?: keyof typeof CTA_VARIANT;
  size?: "sm" | "md";
}) {
  return (
    <a
      className={cn(
        "inline-flex items-center font-semibold transition-colors duration-200 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]",
        size === "sm" ? "h-10 px-6 text-[16px]" : "h-12 px-8 text-[18px]",
        CTA_VARIANT[variant],
        SANS,
        className,
      )}
      {...rest}
    />
  );
}

/**
 * Text link with a dark red underline. On hover the line slides out to the
 * right and draws back in from the left, and the text takes the line's colour.
 */
export function TextLink({
  light = false,
  className,
  children,
  ...rest
}: ComponentProps<"a"> & {
  /** White line and text, for coloured grounds. */
  light?: boolean;
}) {
  return (
    <a
      className={cn(
        "group relative inline-block pb-[7px] text-[17px] leading-6 font-semibold transition-colors duration-300",
        !light && "hover:text-(--ek-maroon)",
        SANS,
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-[2px] origin-left group-hover:animate-[ek-underline_0.7s_cubic-bezier(0.22,1,0.36,1)]",
          light ? "bg-(--ek-paper)" : "bg-(--ek-maroon)",
        )}
      />
    </a>
  );
}
