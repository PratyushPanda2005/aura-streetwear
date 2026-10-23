"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../ekchitra-v5/shared";
import { hyderabadTime } from "../ekchitra-v5/heroes/data";
import { CONTACT, V6_HOME, V6_NAV } from "./data";

/**
 * The thin bar that stays at the top of the page, as on aspensearch.com: the
 * live Hyderabad time on the homepage, or a "Home" link on every other page,
 * then the page links and a black contact cell on the right.
 */
export function TopBar() {
  const isHome = usePathname() === V6_HOME;
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isHome) return;
    const tick = () => setTime(hyderabadTime());
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, [isHome]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-11 bg-white text-(--k-ink)",
        SANS,
      )}
    >
      <a
        href={V6_HOME}
        className={cn(CAPS, "flex items-center px-4 text-[11px] lg:px-5")}
        suppressHydrationWarning
      >
        {isHome ? `${time} Hyderabad` : "Home"}
      </a>
      <nav
        aria-label="Primary navigation"
        className="ml-auto hidden items-center px-5 lg:flex"
      >
        <ul className="flex gap-x-5 text-[13px]">
          {V6_NAV.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href={CONTACT.href}
        target="_blank"
        rel="noreferrer"
        className="ml-auto flex items-center gap-x-6 bg-(--k-ink) px-5 text-[13px] text-white transition-opacity hover:opacity-85 lg:ml-0 lg:w-[208px] lg:justify-between"
      >
        Contact <span aria-hidden="true">→</span>
      </a>
    </header>
  );
}
