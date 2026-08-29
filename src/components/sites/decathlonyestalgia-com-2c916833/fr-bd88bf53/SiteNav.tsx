"use client";

import { useState } from "react";
import { DecathlonLogo } from "./Shapes";
import { MenuOverlay } from "./MenuOverlay";
import { langOptions, SHOP_URL } from "./data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex h-[75px] w-full items-center justify-center p-5 lg:h-auto lg:px-30 lg:py-10">
        {/* Menu button (left) */}
        <div className="pointer-events-auto absolute top-1/2 left-5 z-10 -translate-y-1/2 lg:left-30">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="y-button flex items-center gap-2"
          >
            <span className="flex h-[10px] w-[13px] flex-col justify-between">
              <span className="block h-[1.5px] w-full bg-black" />
              <span className="block h-[1.5px] w-full bg-black" />
            </span>
            <span className="hidden lg:inline">{open ? "Close" : "Menu"}</span>
          </button>
        </div>

        {/* Logo (center) */}
        <a
          href="https://decathlon.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Decathlon Yestalgia"
          className="pointer-events-auto relative mx-auto block w-[40vw] lg:w-[232px]"
        >
          <DecathlonLogo className="h-auto w-full" />
        </a>

        {/* Lang + Boutique (right) */}
        <div className="pointer-events-auto absolute top-1/2 right-5 z-10 inline-flex -translate-y-1/2 items-center gap-x-3 lg:right-30">
          <div className="relative">
            <select
              aria-label="langswitcher"
              defaultValue={langOptions[1].href}
              onChange={(e) => {
                window.location.href = e.target.value;
              }}
              className="y-button cursor-pointer appearance-none pr-8"
            >
              {langOptions.map((o) => (
                <option key={o.code} value={o.href}>
                  {o.code}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[9px]">
              ▼
            </span>
          </div>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="y-button hidden lg:inline-block"
          >Shop</a>
        </div>
      </div>

      {/* Floating mobile Boutique */}
      <a
        href={SHOP_URL}
        target="_blank"
        rel="noreferrer"
        className="y-button fixed top-[85svh] left-1/2 z-[100] inline-block -translate-x-1/2 lg:hidden"
      >Shop</a>

      {/* Fullscreen cassette menu overlay */}
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
