"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Shape } from "./Shapes";
import { SHAPES } from "./data";
import { cn } from "@/lib/utils";

const tapes = [
  { label: "The Collection", href: "#collection", cassette: "cassette-green" },
  { label: "About the artist", href: "#dalkhafine", cassette: "cassette-purple" },
  { label: "Behind the scene", href: "#og2k", cassette: "cassette-pink" },
  { label: "Lookbook", href: "#lookbook", cassette: "cassette-orange" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll(".menu-tape");
    const decos = el.querySelectorAll(".menu-deco");
    if (open) {
      gsap.fromTo(
        items,
        { y: 120, rotate: -6, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(1.6)", stagger: 0.08, delay: 0.15 },
      );
      gsap.fromTo(decos, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.04, delay: 0.1 });
    }
  }, [open]);

  return (
    <div
      ref={root}
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[95] overflow-hidden transition-[opacity,visibility] duration-500",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      style={{ backgroundColor: "#6eb5a2" }}
    >
      {/* sunset scene */}
      <img
        src={`${SHAPES}/sunset-lines.svg`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full object-cover object-bottom"
      />
      {/* boombox rising */}
      <Shape name="boombox" className="menu-deco absolute bottom-0 left-1/2 w-[30vw] max-w-[440px] -translate-x-1/2 translate-y-[18%]" />
      {/* palm */}
      <Shape name="palm-green" className="menu-deco absolute bottom-0 left-[8%] w-[12vw] max-w-[150px]" />

      {/* decorations */}
      <Shape name="arch-pink" className="menu-deco absolute top-[9%] left-[16%] w-[6vw] max-w-[90px] rotate-[135deg]" />
      <Shape name="arch-green" className="menu-deco absolute top-[6%] left-[56%] w-[7vw] max-w-[95px]" />
      <Shape name="lightning-orange" className="menu-deco absolute top-[12%] left-[36%] w-[5vw] max-w-[70px]" />
      <Shape name="ball-yellow" className="menu-deco absolute top-[12%] right-[10%] w-[7vw] max-w-[110px]" />
      <Shape name="arch-yellow" className="menu-deco absolute top-[28%] left-[3%] w-[6vw] max-w-[90px] rotate-[135deg]" />
      <Shape name="lightning-orange" className="menu-deco absolute top-[50%] right-[6%] w-[5vw] max-w-[70px]" />
      <Shape name="arch-blue" className="menu-deco absolute bottom-[16%] right-[16%] w-[6vw] max-w-[90px] rotate-[-135deg]" />

      {/* cassettes */}
      <nav className="absolute inset-0 flex items-center justify-center px-6">
        <ul className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-6 lg:flex-nowrap">
          {tapes.map((t) => (
            <li key={t.href} className="menu-tape w-[46%] shrink-0 lg:w-[23%]">
              <a
                href={t.href}
                onClick={onClose}
                className="group relative block transition-transform duration-300 hover:-translate-y-1"
              >
                <Shape name={t.cassette} className="w-full drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]" />
                <span
                  className="y-title absolute inset-x-0 top-[19%] text-center text-[3.2vw] leading-none text-white lg:text-[15px]"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {t.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
