import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { ROUTES } from "../ekchitra-redesign/data";

/** Sans of this version (loaded in `src/app/ekchitra-v3/layout.tsx`). */
export const SANS = "font-[family-name:var(--font-ek3-sans)]";

/** Serif accent of this version. */
export const SERIF = "font-[family-name:var(--font-ek3-serif)]";

/** The sans at its widest cut, for artist names. */
export const EXTENDED =
  "font-[family-name:var(--font-ek3-sans)] [font-stretch:125%]";

/** Small uppercase label: nav links, row headings, footer headings. */
export const LABEL =
  "text-[13px] leading-[18px] font-medium tracking-[0.65px] uppercase";

/** Large uppercase section heading. */
export const HEADING =
  "text-[26px] leading-none font-medium tracking-[-0.1px] uppercase lg:text-[34px]";

/** Page gutter. */
export const GUTTER = "px-4 lg:px-6";

export const V3_HOME = "/ekchitra-v3";

export const V3_NAV = [
  { label: "About", href: "#about" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Artists", href: ROUTES.artists },
  { label: "Artworks", href: ROUTES.artworks },
  { label: "Services", href: "#services" },
];

const BTN_VARIANT = {
  /** White, for photographs. */
  white:
    "bg-(--ek-paper) text-(--ek-ink) hover:bg-(--ek-maroon) hover:text-(--ek-paper)",
  /** White outline, for photographs. */
  ghost:
    "border border-(--ek-paper) text-(--ek-paper) hover:bg-(--ek-paper) hover:text-(--ek-ink)",
  /** Hairline outline, for white grounds. */
  outline:
    "border border-[#e9e9e9] text-(--ek-ink) hover:border-(--ek-ink) hover:bg-(--ek-ink) hover:text-(--ek-paper)",
  /** Black, for white grounds. */
  ink: "bg-(--ek-ink) text-(--ek-paper) hover:bg-(--ek-maroon)",
} as const;

/** Small squared-off button used across this version. */
export function Btn({
  variant = "ink",
  className,
  ...rest
}: ComponentProps<"a"> & { variant?: keyof typeof BTN_VARIANT }) {
  return (
    <a
      className={cn(
        "inline-flex h-8 items-center rounded-[2px] px-3 text-[12px] leading-none tracking-[0.1px] transition-colors duration-200",
        BTN_VARIANT[variant],
        SANS,
        className,
      )}
      {...rest}
    />
  );
}

/** Uppercase label link with an underline that draws in on hover. */
export function LabelLink({ className, ...rest }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        LABEL,
        "relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100",
        SANS,
        className,
      )}
      {...rest}
    />
  );
}
