import { cn } from "@/lib/utils";

import { GRID } from "../styles";
import {
  CONTACT,
  FOOTER,
  GroupTitle,
  LINK_GROUPS,
  LinkList,
  SCREEN,
  Wordmark,
} from "./shared";

/**
 * Variation 02 — after ideogram. White, the name and a line about the
 * gallery on the left and three columns of links on the right, a hairline,
 * the copyright — then a soft grey gradient rising from the bottom with the
 * name set enormous and faint across it.
 */
export function FooterFade() {
  return (
    <footer className={cn(SCREEN, "bg-white text-(--k-ink)")}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-white via-neutral-100 to-neutral-400" />

      <div className={cn(GRID, "relative gap-y-10 pt-20 lg:pt-28")}>
        <div className="col-span-4">
          <p className="text-[28px] leading-none tracking-[-0.03em]">
            EkChitra
          </p>
          <p className="mt-4 max-w-[280px] text-[15px] leading-[1.5] text-(--k-ink)/65">
            {FOOTER.tagline}
          </p>
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-x-2 bg-(--k-ink) px-4 py-2.5 text-[13px] text-white hover:opacity-85"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
        {LINK_GROUPS.map((group, index) => (
          <div
            key={group.title}
            className={cn("col-span-2", index === 0 && "lg:col-start-7")}
          >
            <p className="text-[15px] font-medium">{group.title}</p>
            <LinkList
              links={group.links}
              className="mt-4 text-[15px] text-(--k-ink)/65"
            />
            {group.note && (
              <p className="mt-4 text-[15px] leading-[1.5] text-(--k-ink)/65">
                {group.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className={cn(GRID, "relative mt-16")}>
        <div className="col-span-4 border-t border-(--k-ink)/15 pt-8 text-[14px] text-(--k-ink)/65 lg:col-span-12">
          {FOOTER.copyright} · Hyderabad, India
        </div>
      </div>

      <div className="relative mt-auto overflow-hidden px-4 lg:px-5">
        <Wordmark className="translate-y-[18%] text-(--k-ink)/10" />
      </div>
      <GroupTitle className="sr-only">EkChitra</GroupTitle>
    </footer>
  );
}
