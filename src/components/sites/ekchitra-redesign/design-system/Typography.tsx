import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

import { FONT } from "./tokens";

type PolymorphicProps<T extends ElementType> = { as?: T } & Omit<
  ComponentProps<T>,
  "as"
>;

/**
 * Display heading: uppercase serif. Colour is inherited from the parent.
 * `size="sm"` is the card-title size used under carousel images.
 */
export function Heading<T extends ElementType = "h2">({
  as,
  size = "lg",
  className,
  ...rest
}: PolymorphicProps<T> & { size?: "sm" | "lg" }) {
  const Tag: ElementType = as ?? "h2";
  return (
    <Tag
      className={cn(
        FONT.serif,
        "font-normal uppercase",
        size === "sm"
          ? "text-[15px] leading-5 tracking-[0.6px]"
          : "text-[27px] leading-9 lg:text-[36.6px] lg:leading-[48px]",
        className,
      )}
      {...rest}
    />
  );
}

/** Small uppercase sans label: section titles and eyebrows. */
export function Label<T extends ElementType = "p">({
  as,
  className,
  ...rest
}: PolymorphicProps<T>) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag
      className={cn(
        FONT.sans,
        "text-[16px] leading-6 tracking-[0.8px] uppercase lg:text-[18.3px] lg:leading-[27.5px] lg:tracking-[0.9px]",
        className,
      )}
      {...rest}
    />
  );
}

/** Body copy in the sans. `size="sm"` is the caption size used for artwork details. */
export function Text<T extends ElementType = "p">({
  as,
  size = "md",
  className,
  ...rest
}: PolymorphicProps<T> & { size?: "sm" | "md" }) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag
      className={cn(
        FONT.sans,
        size === "sm"
          ? "text-[13.7px] leading-[20.6px] tracking-[0.55px]"
          : "text-[16px] leading-6 tracking-[0.16px] min-[1200px]:text-[17px] min-[1200px]:leading-7 min-[1200px]:tracking-[0.17px]",
        className,
      )}
      {...rest}
    />
  );
}
