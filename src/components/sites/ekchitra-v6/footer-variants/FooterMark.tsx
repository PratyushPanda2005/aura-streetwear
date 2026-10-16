import { cn } from "@/lib/utils";

import { GRID } from "../styles";
import {
  CONTACT,
  FOOTER,
  LinkList,
  SCREEN,
  SOCIAL,
  V6_NAV,
  Wordmark,
} from "./shared";

/**
 * Variation 03 — after rejouice. Black. A short line set large on the left
 * with the contact and a newsletter field under it; the pages and socials
 * in two columns on the right, the place and copyright beneath them; and
 * the name in white across the full width at the bottom.
 */
export function FooterMark() {
  return (
    <footer className={cn(SCREEN, "bg-black text-white")}>
      <div className={cn(GRID, "gap-y-12 pt-14 lg:pt-16")}>
        <div className="col-span-4 lg:col-span-5">
          <p className="text-[34px] leading-[1.05] tracking-[-0.03em] lg:text-[44px]">
            Art is everywhere. Come and notice.
          </p>
          <div className="mt-12 text-[15px] leading-[1.35]">
            <p>New work, visits and commissions:</p>
            <a
              href={CONTACT.href}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60"
            >
              WhatsApp the gallery ↗
            </a>
          </div>
          <form className="mt-10 max-w-[330px]" action="#">
            <label htmlFor="ek6-f3-email" className="text-[15px]">
              Sign up for news of openings
            </label>
            <div className="mt-3 flex items-center border-b border-white">
              <input
                id="ek6-f3-email"
                type="email"
                placeholder="Email"
                className="h-9 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/40"
              />
              <button type="submit" aria-label="Sign up" className="px-1">
                →
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-2 flex flex-col justify-between gap-y-10 text-[15px] lg:col-span-2 lg:col-start-9">
          <LinkList links={V6_NAV} />
          <p className="leading-[1.35]">
            Hyderabad
            <br />
            India
          </p>
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-y-10 text-[15px] lg:col-span-2 lg:col-start-11">
          <LinkList
            links={SOCIAL.map((link) => ({ ...link, external: true }))}
          />
          <p className="leading-[1.35]">{FOOTER.copyright}</p>
        </div>
      </div>

      <div className="mt-auto px-4 lg:px-5">
        <Wordmark className="translate-y-[6%]" />
      </div>
    </footer>
  );
}
