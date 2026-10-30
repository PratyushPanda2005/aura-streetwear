import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { DETAILS } from "../contact/data";
import { CONTACT_PAGE } from "../data";
import { GRID } from "../styles";
import { FOOTER, GroupTitle, LinkList, V6_NAV } from "./shared";

/**
 * Behind the card: the brand-coloured silk from variation 05 (FooterSmoke) —
 * TEMPORARY PLACEHOLDER, Unsplash, free licence (unsplash.com/photos/7nG_h0I_Zwk).
 */
const SILK = "/sites/ekchitra-redesign/placeholders/footer-silk-brand.jpg";

/** The two facts set large on the card. */
const FACTS = [
  { label: "Location", value: "Hyderabad, India" },
  {
    label: "Open",
    value: `Mon – Sat, ${DETAILS.hours.time}`,
  },
];

/**
 * The small columns under the card. `wide` columns take the full width on
 * phones; the rest sit two to a row.
 */
const COLUMNS = [
  {
    title: "Gallery",
    links: [...V6_NAV, { label: "Contact", href: CONTACT_PAGE }],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: DETAILS.instagram.href, external: true },
      { label: "WhatsApp", href: DETAILS.whatsapp, external: true },
    ],
  },
  {
    title: "Get in touch",
    wide: true,
    links: [
      { label: DETAILS.email, href: `mailto:${DETAILS.email}` },
      { label: DETAILS.phone, href: `tel:${DETAILS.phone.replace(/\s/g, "")}` },
    ],
  },
  {
    title: "Visit",
    wide: true,
    lines: DETAILS.address,
    links: [{ label: "Directions", href: DETAILS.directions, external: true }],
  },
];

/**
 * Variation 07 — compact, after pizzapizza.io. A card hangs from the
 * footer's top edge — glossy silk in the brand colours, as on variation 05 —
 * with two facts set large over it, each under a small label on a
 * hairline rule. Below,
 * on brand black, small columns for the pages, socials, getting in touch
 * and the address; then the small print.
 * Only as tall as its content.
 */
export function FooterCard() {
  return (
    <footer
      id="contact"
      className="scroll-mt-11 bg-(--k-ink) px-4 pb-6 text-white lg:px-5"
    >
      <div className="relative isolate overflow-hidden bg-(--k-ink) px-4 pt-8 pb-14 lg:px-6 lg:pt-10 lg:pb-24">
        <Image
          src={SILK}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* A light shade at the top, where the facts sit, so they read. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-(--k-ink)/55 via-(--k-ink)/35 to-transparent"
        />
        <dl className="grid gap-y-8 md:grid-cols-[1fr_1.6fr] md:gap-x-6 md:pr-24">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="flex items-center gap-x-3">
                <span className={cn(CAPS, "shrink-0 text-[10px] text-white/80")}>
                  {fact.label}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/40" />
              </dt>
              <dd className="mt-3 text-[30px] leading-[1.05] tracking-[-0.035em] lg:text-[52px]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={cn(GRID, "gap-y-8 px-0 pt-12 lg:px-0 lg:pt-14")}>
        {COLUMNS.map((column) => (
          <div
            key={column.title}
            className={cn(
              "lg:col-span-3",
              "wide" in column ? "col-span-4" : "col-span-2",
            )}
          >
            <GroupTitle className="text-white/60">{column.title}</GroupTitle>
            {"lines" in column && column.lines && (
              <p className="mt-3 text-[14px] leading-[1.5] text-white/85">
                {column.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
            <LinkList
              links={column.links}
              className={cn(
                "text-[14px] text-white/85",
                "lines" in column ? "mt-2" : "mt-3",
              )}
            />
          </div>
        ))}
      </div>

      <GroupTitle className="mt-12 text-white/60 lg:mt-16">
        {`${FOOTER.copyright} · Hyderabad, India`}
      </GroupTitle>
    </footer>
  );
}
