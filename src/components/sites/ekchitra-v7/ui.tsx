"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { MONO } from "./styles";

/** "■ LABEL": the small square-bulleted label that opens each section. */
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
    <p className={cn(MONO, "flex items-center gap-x-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn("size-[7px]", light ? "bg-white" : "bg-(--e7-ink)")}
      />
      {children}
    </p>
  );
}

/** A thin arrow pointing right (or up-right, `rise`). */
export function Arrow({
  rise = false,
  className,
}: {
  rise?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("size-4 shrink-0", rise && "-rotate-45", className)}
    >
      <path
        d="M1 8h13M9 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** A small button in mono capitals with an arrow, dark or light. */
export function MonoButton({
  href,
  children,
  light = false,
  external = false,
  className,
}: {
  href: string;
  children: string;
  light?: boolean;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        MONO,
        "inline-flex h-9 items-center justify-between gap-x-8 px-3 transition-opacity hover:opacity-80",
        light ? "bg-white text-(--e7-ink)" : "bg-(--e7-ink) text-white",
        className,
      )}
    >
      {children}
      <Arrow />
    </a>
  );
}

/** Hyderabad time, ticking each half-minute: "09:41 AM". */
export function useHyderabadTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
    const tick = () => setTime(format());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return time;
}

/**
 * Marks itself `data-shown` the first time it scrolls into view, so `.e7-in`
 * children can rise into place; `delay` staggers neighbours.
 */
export function InView({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--delay", `${delay}ms`);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
