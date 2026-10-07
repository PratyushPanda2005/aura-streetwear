import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CarouselArrowProps = { direction: "prev" | "next" } & Omit<
  ComponentProps<"button">,
  "type"
>;

/** Round previous/next control that sits on top of a carousel. */
export function CarouselArrow({
  direction,
  className,
  ...rest
}: CarouselArrowProps) {
  return (
    <button
      type="button"
      className={cn(
        "pointer-events-auto flex size-[38px] items-center justify-center rounded-full border border-[#e1e1e1] bg-white text-black transition-[color,border-color,opacity] duration-150 ease-in-out hover:border-black disabled:opacity-0",
        className,
      )}
      {...rest}
    >
      <svg
        viewBox="0 0 6 10"
        aria-hidden="true"
        className={cn(
          "h-[10px] w-[6px]",
          direction === "next" && "-scale-x-100",
        )}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m4.646.648.708.707-3.647 3.65 3.64 3.643-.707.707-4.347-4.35z"
        />
      </svg>
    </button>
  );
}
