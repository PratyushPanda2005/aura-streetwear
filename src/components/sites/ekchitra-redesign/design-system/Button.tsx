import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { FONT } from "./tokens";

const BASE =
  "inline-block rounded-[2px] px-[28px] pt-[11px] pb-[13px] text-center text-[16px] leading-6 tracking-[0.16px] text-shadow-none transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ek-navy) min-[1200px]:py-[12px] min-[1200px]:text-[17px] min-[1200px]:tracking-[0.17px]";

const VARIANT = {
  /** Dark red ground, off-white label: for off-white sections. */
  solid: "bg-(--ek-maroon) text-(--ek-paper) hover:bg-(--ek-ink)",
  /** Off-white ground, dark red label: for dark panels and photographs. */
  light:
    "bg-(--ek-paper) text-(--ek-maroon) hover:bg-(--ek-maroon) hover:text-(--ek-paper)",
} as const;

type Variant = keyof typeof VARIANT;

type ButtonProps =
  | ({ href: string; variant?: Variant } & ComponentProps<"a">)
  | ({ href?: undefined; variant?: Variant } & ComponentProps<"button">);

/**
 * The site's button, in two borderless styles: `solid` (dark red ground,
 * off-white label) on off-white sections, and `light` (off-white ground, dark
 * red label) on dark panels and photographs. Renders a link when `href` is
 * given, otherwise a `<button>`.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { className, variant = "solid", ...rest } = props;
    return (
      <a
        className={cn(BASE, VARIANT[variant], FONT.sans, className)}
        {...rest}
      />
    );
  }
  const { className, variant = "solid", type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={cn(BASE, VARIANT[variant], FONT.sans, className)}
      {...rest}
    />
  );
}
