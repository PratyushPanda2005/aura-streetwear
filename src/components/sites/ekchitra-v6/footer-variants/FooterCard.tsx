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

/** The small columns under the card. */
const COLUMNS = [
  {
    title: "Get in touch",
    links: [
      { label: DETAILS.email, href: `mailto:${DETAILS.email}` },
      { label: DETAILS.phone, href: `tel:${DETAILS.phone.replace(/\s/g, "")}` },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: DETAILS.instagram.href, external: true },
      { label: "WhatsApp", href: DETAILS.whatsapp, external: true },
    ],
  },
  {
    title: "Visit",
    lines: DETAILS.address,
    links: [{ label: "Directions", href: DETAILS.directions, external: true }],
  },
];

/**
 * Variation 07 — compact, after pizzapizza.io. A card hangs from the
 * footer's top edge — glossy silk in the brand colours, as on variation 05 —
 * with two facts set large over it, each under a small label on a
 * hairline rule. Below,
 * on brand black, small columns for getting in touch, socials and the
 * address; then a last row with the small print on the left and the pages in
 * a white bar, Contact picked out in maroon. Only as tall as its content.
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
              "lines" in column ? "col-span-4" : "col-span-2",
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

      <div className="mt-12 flex flex-col-reverse gap-y-6 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
        <GroupTitle className="text-white/60">
          {`${FOOTER.copyright} · Hyderabad, India`}
        </GroupTitle>
        {/* Two rows of three on phones, one bar from lg. */}
        <nav aria-label="Footer">
          <ul className="grid grid-cols-3 bg-white text-[13px] text-(--k-ink) lg:flex">
            {V6_NAV.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex h-11 items-center px-4 transition-colors hover:bg-(--k-ink)/[0.06] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--k-navy)"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={CONTACT_PAGE}
                className="flex h-11 items-center justify-between gap-x-3 bg-(--k-maroon) px-4 text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
              >
                Contact <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
