"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useShown } from "./useShown";

/** Delay between one letter and the next along a line, in milliseconds. */
const CHAR_MS = 18;

/** Extra delay for each line further down, in milliseconds. */
const LINE_MS = 50;

/** Gives every letter its delay from the line it is on and its place along it. */
function stagger(el: HTMLElement) {
  let line = -1;
  let column = 0;
  let lastTop: number | null = null;
  for (const char of el.querySelectorAll<HTMLElement>("[data-char]")) {
    const top = Math.round(char.getBoundingClientRect().top);
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      line += 1;
      column = 0;
      lastTop = top;
    }
    char.style.transitionDelay = `${line * LINE_MS + column * CHAR_MS}ms`;
    column += 1;
  }
}

/**
 * Text that fades in letter by letter each time it scrolls into view.
 *
 * Every rendered line starts almost together and fills in from left to right, so
 * a paragraph arrives as one soft wave rather than letter after letter from the
 * top. Lines are measured as the text is actually wrapped on screen. Pass an
 * array to force line breaks; `after` is placed at the end of the last line.
 * Screen readers get the plain text; the animated letters are hidden from them.
 */
export function Chars({
  text,
  after,
  className,
}: {
  text: string | string[];
  after?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const lines = Array.isArray(text) ? text : [text];

  useShown(ref, stagger);

  return (
    <span
      ref={ref}
      aria-label={lines.join(" ")}
      className={cn("ek5-chars block", className)}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} aria-hidden="true" className="block">
          {[...line].map((char, charIndex) =>
            char === " " ? (
              " "
            ) : (
              <span key={charIndex} data-char>
                {char}
              </span>
            ),
          )}
          {lineIndex === lines.length - 1 && after}
        </span>
      ))}
    </span>
  );
}
