import Image from "next/image";

import { cn } from "@/lib/utils";

import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { GRID } from "../styles";
import {
  CONTACT,
  FOOTER,
  GroupTitle,
  LinkList,
  SCREEN,
  SOCIAL,
  V6_NAV,
} from "./shared";

/**
 * TEMPORARY PLACEHOLDER — glossy silk (Unsplash, free licence —
 * unsplash.com/photos/7nG_h0I_Zwk), recoloured into the brand palette:
 * its warm folds mapped to maroon, its cool folds to navy, highlights
 * lifting towards sky and white.
 */
const SILK = "/sites/ekchitra-redesign/placeholders/footer-silk-brand.jpg";

/**
 * Variation 05 — after Evmos. The top part is white and full: the gallery's
 * line set large with its tagline and a button, then columns for the
 * pages, the socials, the visit and a newsletter; a row of small print with
 * the name — shown once — on the right. Below, a panel of glossy liquid
 * silk, its top edge stepping up with a diagonal notch.
 */
export function FooterSmoke() {
  return (
    <footer
      id="contact"
      className={cn(
        SCREEN,
        "h-auto min-h-svh scroll-mt-11 bg-white text-(--k-ink) lg:h-svh",
      )}
    >
      <div className={cn(GRID, "gap-y-10 pt-12 lg:pt-14")}>
        <div className="col-span-4 lg:col-span-4">
          <p className="text-[30px] leading-[1.05] tracking-[-0.03em] lg:text-[38px]">
            Art is everywhere. Come and notice.
          </p>
          <p className="mt-4 max-w-[320px] text-[14px] leading-[1.5] text-(--k-ink)/65">
            {FOOTER.tagline}
          </p>
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-x-3 bg-(--k-ink) px-4 py-2.5 text-[13px] text-white hover:opacity-85"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="col-span-2 lg:col-span-2 lg:col-start-6">
          <p className="text-[15px] font-medium">Gallery</p>
          <LinkList
            links={V6_NAV}
            className="mt-4 text-[14px] text-(--k-ink)/70"
          />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <p className="text-[15px] font-medium">Connect</p>
          <LinkList
            links={SOCIAL.map((link) => ({ ...link, external: true }))}
            className="mt-4 text-[14px] text-(--k-ink)/70"
          />
          <p className="mt-6 text-[15px] font-medium">Visit</p>
          <p className="mt-3 max-w-[200px] text-[14px] text-(--k-ink)/70">
            {FOOTER.location.note}
          </p>
        </div>
        <form className="col-span-4 lg:col-span-3 lg:col-start-10" action="#">
          <label htmlFor="ek6-f5-email" className="text-[15px] font-medium">
            Newsletter
          </label>
          <p className="mt-4 text-[14px] leading-[1.5] text-(--k-ink)/70">
            Openings, new artists and the occasional studio visit — a few times
            a year.
          </p>
          <div className="mt-4 flex items-center border-b border-(--k-ink)">
            <input
              id="ek6-f5-email"
              type="email"
              placeholder="Your email"
              className="h-10 min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-(--k-ink)/45"
            />
            <button type="submit" aria-label="Sign up" className="px-1">
              →
            </button>
          </div>
        </form>
      </div>

      <div className={cn(GRID, "mt-auto items-end pt-8 pb-6")}>
        <GroupTitle className="col-span-2 text-(--k-ink)/60">
          Terms of use
        </GroupTitle>
        <GroupTitle className="col-span-2 text-(--k-ink)/60 lg:col-span-2">
          Privacy
        </GroupTitle>
        <GroupTitle className="col-span-4 mt-4 text-(--k-ink)/60 lg:col-span-3 lg:col-start-6 lg:mt-0">
          {`${FOOTER.copyright} · Hyderabad, India`}
        </GroupTitle>
        <p className="col-span-4 mt-6 text-[48px] leading-[0.8] tracking-[-0.045em] lg:col-span-3 lg:col-start-10 lg:mt-0 lg:text-right lg:text-[56px]">
          EkChitra
        </p>
      </div>

      <div className="relative h-[320px] shrink-0 lg:h-[54%] [clip-path:polygon(0_56px,16%_56px,calc(16%+56px)_0,100%_0,100%_100%,0_100%)]">
        <Image
          src={SILK}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <Diamonds
          rows={24}
          shape="clusters"
          side="right"
          tint="sky"
          tintEvery={6}
          tintOpacity={0.7}
          className="absolute top-1/2 right-0 w-[44px] -translate-y-1/2 text-white/40 lg:w-[56px]"
        />
      </div>
    </footer>
  );
}
