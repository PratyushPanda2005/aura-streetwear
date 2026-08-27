"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BracketCloseIcon, BracketOpenIcon } from "./icons";

/**
 * The site's `.btn` primitive.
 *
 * Measured base (all variants): `display: inline-flex; align-items: center;
 * gap: 4px; padding: 0 2px; cursor: pointer;`
 * `transition: background-color .4s cubic-bezier(.16,1,.3,1)`.
 *
 * Text metrics per variant, read from the live site:
 *   small : 16px / 20px, letter-spacing -0.96px, uppercase, weight 400
 *   big   : 14px / 20px, letter-spacing -0.84px, weight 600 (the sound toggle)
 *
 * Colour is inherited — every current usage sits inside a
 * `mix-blend-mode: difference` region, so the button never sets its own.
 */

export interface BtnProps {
  children?: ReactNode;
  /** Wrapped in the site's `[ ]` bracket pair, e.g. the sound / video toggles. */
  icon?: ReactNode;
  iconPosition?: "before" | "after";
  size?: "small" | "big";
  href?: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  "aria-label"?: string;
}

/**
 * `[ icon ]` — bracket-open, glyph, bracket-close. 34x16, gap 3px.
 *
 * Hover, measured from the live site: `.btn__icon::before` / `::after` are two
 * white bars pinned to the left and right edges that grow from `width: 0` to
 * `52%` (`transition: width .4s cubic-bezier(.16,1,.3,1)`), filling the box.
 * `.btn__icon-elem` — the centre glyph only — flips to the black token with a
 * `.15s` delay. The bracket marks themselves are left white, so they disappear
 * into the fill.
 */
function BracketIcon({ children }: { children: ReactNode }) {
  const wipe =
    "pointer-events-none absolute top-0 h-4 w-0 bg-white " +
    "transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[52%]";

  return (
    <span className="relative flex h-4 w-[34px] items-center justify-between gap-[3px]">
      <span aria-hidden className={cn(wipe, "left-0")} />
      <span aria-hidden className={cn(wipe, "right-0")} />
      <BracketOpenIcon className="relative z-2 block h-4 w-1 shrink-0" />
      <span className="relative z-2 flex h-4 w-4 items-center justify-center transition-colors delay-150 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#030303]">
        {children}
      </span>
      <BracketCloseIcon className="relative z-2 block h-4 w-1 shrink-0" />
    </span>
  );
}

export function Btn({
  children,
  icon,
  iconPosition = "before",
  size = "small",
  href,
  onClick,
  className,
  textClassName,
  "aria-label": ariaLabel,
}: BtnProps) {
  const text = children ? (
    <span
      className={cn(
        "block whitespace-nowrap",
        size === "small"
          ? "text-[16px] leading-5 tracking-[-0.96px] uppercase font-normal"
          : "text-[14px] leading-5 tracking-[-0.84px] font-semibold",
        textClassName,
      )}
    >
      {children}
    </span>
  ) : null;

  const inner = (
    <>
      {icon && iconPosition === "before" ? <BracketIcon>{icon}</BracketIcon> : null}
      {text}
      {icon && iconPosition === "after" ? <BracketIcon>{icon}</BracketIcon> : null}
    </>
  );

  const classes = cn(
    "group relative inline-flex shrink-0 items-center gap-1 px-0.5 cursor-pointer",
    "transition-[background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
