import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { FONT } from "./tokens";

const BUTTON =
  "inline-block rounded-[2px] border border-[#ccc] bg-white px-[27px] pt-[10px] pb-[12px] text-center text-[16px] leading-6 tracking-[0.16px] text-[#b50938] text-shadow-none transition-colors duration-150 ease-in-out hover:border-[#949494] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b50938] min-[1200px]:py-[11px] min-[1200px]:text-[17px] min-[1200px]:tracking-[0.17px]";

type ButtonProps =
  | ({ href: string } & ComponentProps<"a">)
  | ({ href?: undefined } & ComponentProps<"button">);

/**
 * The one button style of the site: white ground, crimson label, hairline border.
 * Renders a link when `href` is given, otherwise a `<button>`.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { className, ...rest } = props;
    return <a className={cn(BUTTON, FONT.sans, className)} {...rest} />;
  }
  const { className, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={cn(BUTTON, FONT.sans, className)}
      {...rest}
    />
  );
}
