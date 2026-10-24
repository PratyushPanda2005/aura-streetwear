"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS } from "../ekchitra-v5/shared";

/** Small "■ LABEL" marker used at the top of a cell. */
export function Label({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        CAPS,
        "flex items-center gap-x-2 self-start text-[10px]",
        light ? "text-white/70" : "text-(--k-ink)/70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5", light ? "bg-white" : "bg-(--k-ink)")}
      />
      {children}
    </p>
  );
}

/**
 * The section index that sits in columns 1–3 of every section: its number,
 * set a little larger, over its name in small capitals.
 */
export function Index({
  n,
  label,
  light = false,
}: {
  n: number;
  label: string;
  /** For dark sections: the name in translucent white. */
  light?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-x-3 self-start">
      <span className="text-[13px] tabular-nums">
        {String(n).padStart(2, "0")}
      </span>
      <span
        className={cn(
          CAPS,
          "text-[10px]",
          light ? "text-white/70" : "text-(--k-ink)/60",
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** A picture filling its cell, shown as it is. */
export function Picture({
  src,
  alt,
  position = "object-center",
  sizes = "(max-width: 1023px) 100vw, 50vw",
  className,
}: {
  src: string;
  alt: string;
  /** Where to crop the picture, as an `object-…` class. */
  position?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", position)}
      />
    </div>
  );
}

/** A number that counts up from zero the first time it is seen. */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(eased * value));
          if (t < 1) frame = window.requestAnimationFrame(step);
        };
        frame = window.requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {shown}
      {suffix}
    </span>
  );
}
