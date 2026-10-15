import Image from "next/image";

import { cn } from "@/lib/utils";

import { LOGO } from "../../ekchitra-redesign/data";
import { CAPS, V5_HOME } from "../shared";
import { HERO_NAV } from "./data";

/**
 * A light top line for the hero studies: the logo, the page links and a
 * contact link. `compact` keeps only the logo and a menu label; `light` sets
 * it in white for dark backgrounds.
 */
export function HeroNav({
  compact = false,
  light = false,
  className,
}: {
  compact?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6",
        light ? "text-white" : "text-(--k-ink)",
        className,
      )}
    >
      <a href={V5_HOME} aria-label="EkChitra — home" className="shrink-0">
        {light ? (
          <span
            role="img"
            aria-label={LOGO.alt}
            className="block aspect-[526/118] h-[22px] bg-white [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat] lg:h-6"
          />
        ) : (
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            sizes="120px"
            className="h-[22px] w-auto lg:h-6"
          />
        )}
      </a>
      {compact ? (
        <span className={CAPS}>Menu</span>
      ) : (
        <>
          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex gap-x-6 text-[14px]">
              {HERO_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-opacity duration-300 hover:opacity-60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className={CAPS}>
            Contact
          </a>
        </>
      )}
    </div>
  );
}
