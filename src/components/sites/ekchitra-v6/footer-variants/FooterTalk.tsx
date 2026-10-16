import Image from "next/image";

import { cn } from "@/lib/utils";

import { GRID } from "../styles";
import { CONTACT, FOOTER, LinkList, SCREEN, SOCIAL, V6_NAV } from "./shared";

/**
 * Variation 01 — after swissbrut. White, with the nav across the top, a huge
 * bold "Let's talk." across the middle with a small black-and-white gallery
 * photograph set into the gap between the words, and four plain columns of
 * contact details along the bottom.
 */
export function FooterTalk() {
  return (
    <footer className={cn(SCREEN, "bg-white text-(--k-ink)")}>
      <nav className={cn(GRID, "pt-5 text-[15px] font-medium")}>
        {V6_NAV.slice(0, 4).map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(
              "hidden hover:opacity-60 lg:block lg:col-span-2",
              index === 0 && "lg:col-start-5",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href={CONTACT.href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-x-[4vw] px-1 lg:justify-between lg:gap-x-[1.5vw]"
      >
        <span className="text-[19vw] leading-none font-bold tracking-[-0.07em] lg:text-[21vw]">
          Let’s
        </span>
        <span className="relative hidden aspect-[16/10] w-[13vw] shrink-0 overflow-hidden lg:block">
          <Image
            src="/sites/ekchitra-redesign/about/about-banner-hydart-2025.jpg"
            alt=""
            fill
            sizes="13vw"
            className="object-cover grayscale"
          />
        </span>
        <span className="text-[19vw] leading-none font-bold tracking-[-0.07em] lg:text-[21vw]">
          talk.
        </span>
      </a>

      <div
        className={cn(
          GRID,
          "gap-y-8 pb-5 text-[14px] font-medium leading-[1.3]",
        )}
      >
        <div className="col-span-2 flex flex-col justify-between gap-y-10 lg:col-span-2">
          <p>Contact</p>
          <LinkList links={[{ label: "WhatsApp", href: CONTACT.href }]} />
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-y-10 lg:col-span-2">
          <p>Follow</p>
          <LinkList links={SOCIAL} />
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-y-10 lg:col-span-2">
          <p>{FOOTER.copyright}</p>
          <p className="text-(--k-ink)/60">{FOOTER.location.note}</p>
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-y-10 lg:col-span-2 lg:col-start-11">
          <p>Hyderabad</p>
          <p>India</p>
        </div>
      </div>
    </footer>
  );
}
