import { cn } from "@/lib/utils";

import { FOOTER } from "../../ekchitra-redesign/data";
import { ABOUT_STORY } from "../../ekchitra-v5/about-data";
import { SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES } from "../cta-variants/shared";
import { CONTACT, SOCIAL, V6_HOME, V6_NAV } from "../data";
import { BUTTON, GRID } from "../styles";

/** A column's heading: the house size, a touch heavier than its links. */
const HEAD = "text-[14px] font-medium";

/** A footer link: plain, underlining on hover. */
const LINK = "hover:underline hover:underline-offset-4";

/** An underlined text link, as the location cells use. */
const UNDERLINED =
  "underline decoration-1 underline-offset-4 hover:no-underline";

/** One column of links under its heading. */
function LinkColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={HEAD}>{title}</p>
      <ul className="mt-4 space-y-2 text-[14px]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={LINK}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer, after the footer on goodman-gallery.com, in EkChitra's own words:
 * white with black type on the grid. At the left, the logo, a line
 * about the gallery and a button to get in touch, with the social links at
 * the foot of the column; at the right, two columns of links — the site's
 * pages and its services. Under a hairline, a row of cells — where the
 * gallery is and how to write — and a last line with the
 * copyright and the gallery in a phrase.
 */
export function FooterLedger() {
  return (
    <footer className={cn("bg-white text-(--k-ink)", SANS)}>
      <div className={cn(GRID, "gap-y-10 pt-16 lg:pt-20")}>
        {/* Left: logo, line and button; follow at the foot. */}
        <div className="col-span-4 flex flex-col justify-between gap-y-10 lg:col-span-6">
          <div>
            <a
              href={V6_HOME}
              aria-label="EkChitra, home"
              className="block w-[180px] lg:w-[220px]"
            >
              <span className="block aspect-[526/118] bg-(--k-ink) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]" />
            </a>
            <p className="mt-6 max-w-[380px] text-[14px] leading-[1.5] text-(--k-ink)/70">
              {ABOUT_STORY.lead}
            </p>
            <a
              href={CONTACT.href}
              target="_blank"
              rel="noreferrer"
              className={cn(BUTTON, "mt-6")}
            >
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div>
            <p className={HEAD}>Follow</p>
            <ul className="mt-4 flex gap-x-5 text-[14px]">
              {SOCIAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={LINK}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: two columns of links. */}
        <LinkColumn
          title="Explore"
          links={[{ label: "Home", href: V6_HOME }, ...V6_NAV]}
          className="col-span-2 lg:col-span-3 lg:col-start-7"
        />
        <LinkColumn
          title="Services"
          links={CTA_SERVICES.map((service) => ({
            label: service.title,
            href: service.cta.href,
            external: true,
          }))}
          className="col-span-2 lg:col-span-3"
        />
      </div>

      {/* Under a hairline: where the gallery is, and how to write. */}
      <div className={cn(GRID, "gap-y-8 pt-8 text-[14px] leading-[1.5]")}>
        <div className="col-span-4 sm:col-span-2 lg:col-span-3">
          <p className={HEAD}>{FOOTER.location.title}</p>
          <p className="mt-2 text-(--k-ink)/70">EkChitra Art Gallery</p>
          <p className="text-(--k-ink)/70">{FOOTER.location.note}</p>
        </div>
        <div className="col-span-4 sm:col-span-2 lg:col-span-3">
          <p className={HEAD}>Write to us</p>
          <p className="mt-2 text-(--k-ink)/70">
            Visits, enquiries and commissions.
          </p>
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className={cn(UNDERLINED, "mt-4 inline-block")}
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* The last line. */}
      <div
        className={cn(
          GRID,
          "gap-y-2 pt-12 pb-6 text-[13px] text-(--k-ink)/65 lg:pt-14",
        )}
      >
        <p className="col-span-4 lg:col-span-6">
          {FOOTER.copyright}. All rights reserved.
        </p>
        <p className="col-span-4 lg:col-span-6">{FOOTER.tagline}</p>
      </div>
    </footer>
  );
}
