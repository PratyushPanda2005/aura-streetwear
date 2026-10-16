import Image from "next/image";

import { cn } from "@/lib/utils";

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
 * Variation 04 — after Social Impact Capital. A painting fills the top half
 * in black and white, set hard and high in contrast like an etching; the
 * bottom half is black, with the name stacked large on the left, an email
 * field under it, and the pages, the place and the socials to the right.
 */
export function FooterEtching() {
  return (
    <footer className={cn(SCREEN, "bg-black text-white")}>
      <div className="relative h-[48%] shrink-0">
        <Image
          src="/sites/ekchitra-redesign/artists/anupama-choudhary-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%] contrast-150 grayscale"
        />
      </div>

      <div className={cn(GRID, "flex-1 gap-y-10 py-10 lg:py-12")}>
        <div className="col-span-4 flex flex-col justify-between gap-y-10 lg:col-span-5">
          <p className="text-[44px] leading-[0.92] font-light tracking-[-0.03em] uppercase lg:text-[64px]">
            Ek
            <br />
            &nbsp;&nbsp;Chitra
          </p>
          <form className="flex max-w-[460px] items-end gap-x-4" action="#">
            <label className="flex-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="h-10 w-full border-b border-white bg-transparent text-[13px] tracking-[0.06em] outline-none placeholder:text-white"
              />
            </label>
            <button
              type="submit"
              className="h-10 bg-white px-4 text-[12px] tracking-[0.08em] text-black uppercase hover:opacity-85"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="col-span-2 flex flex-col justify-between gap-y-8 lg:col-span-2 lg:col-start-8">
          <LinkList links={V6_NAV} className="text-[14px]" />
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] hover:opacity-60"
          >
            Contact ↗
          </a>
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-y-8 lg:col-span-3 lg:col-start-10">
          <p className="text-[14px]">A contemporary art gallery in Hyderabad</p>
          <div>
            <GroupTitle className="text-white/60">Socials</GroupTitle>
            <LinkList
              links={SOCIAL.map((link) => ({ ...link, external: true }))}
              className="mt-3 text-[14px]"
            />
          </div>
        </div>
        <p className="col-span-4 text-[12px] text-white/60 lg:col-span-12">
          {FOOTER.copyright} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
