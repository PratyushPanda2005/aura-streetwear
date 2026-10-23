"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** expo.out: a quick start that settles slowly. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * A one-screen-tall strip that scrolls sideways: vertical wheel and trackpad
 * gestures are turned into a smooth horizontal glide. Visitors who prefer
 * reduced motion get the same mapping without the easing. Touch keeps native
 * horizontal swiping.
 */
export function HorizontalScroll({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      wrapper,
      content,
      autoRaf: true,
      orientation: "horizontal",
      gestureOrientation: "both",
      smoothWheel: true,
      ...(reduceMotion ? { lerp: 1 } : { duration: 1.4, easing: easeOutExpo }),
      wheelMultiplier: 1,
    });
    return () => lenis.destroy();
  }, []);

  return (
    <main
      ref={wrapperRef}
      id={id}
      className={cn("overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none]", className)}
    >
      <div ref={contentRef} className="flex h-full w-max items-stretch">
        {children}
      </div>
    </main>
  );
}
