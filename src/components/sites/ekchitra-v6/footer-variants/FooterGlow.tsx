import Image from "next/image";

import { cn } from "@/lib/utils";

import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { DETAILS } from "../contact/data";
import { CTA_SERVICES } from "../cta-variants/shared";
import { CONTACT_PAGE, SOCIAL, V6_HOME, V6_NAV } from "../data";
import { Dotted } from "../Dotted";
import { BUTTON } from "../styles";
import { FOOTER } from "./shared";

/**
 * TEMPORARY PLACEHOLDERS — the glowing card's own layers from arrakis.tech,
 * kept exact for now: the orange nebula (/images/glow-card-bg.jpg), the
 * light leak (/images/glow-card-leak.jpg), and one frame of the dot streams
 * their canvas draws (exported from the page). Replace before going live.
 */
const GLOW = {
  nebula: "/sites/ekchitra-redesign/placeholders/footer-ref-arrakis-glow.jpg",
  leak: "/sites/ekchitra-redesign/placeholders/footer-ref-arrakis-leak.jpg",
  stars: "/sites/ekchitra-redesign/placeholders/footer-ref-arrakis-stars.png",
};

/** A column's small label: spaced capitals, dimmed. */
const LABEL = cn(CAPS, "text-[11px] text-white/60");

const LINK = "hover:underline hover:underline-offset-4";

/**
 * Variation 06 — after the footer on arrakis.tech, made compact: one
 * screen under the top bar on desktop. Warm near-black throughout. At the
 * top, a band edge to edge glowing orange, taking the height the rest leaves: a
 * slowly drifting nebula, a light leak screened over its left edge and
 * streams of dots, darkened at the edges, with the gallery's line at the
 * lower left and a white button at the right. Then three columns of links
 * under small labels, and the last line framed between two dotted rules
 * with their ends turned in: the copyright, the wordmark and the socials,
 * with the tagline beneath. The diamond motif shows twice, faint and still:
 * resting on the dotted rule, and on the footer's bottom edge. The card's
 * picture is dotted like the hero's, clearing on hover.
 */
export function FooterGlow() {
  return (
    <footer
      className={cn(
        "relative flex flex-col bg-[#1a1714] pb-12 text-white lg:pb-5 lg:h-[calc(100svh-44px)] lg:min-h-[600px]",
        SANS,
      )}
    >
      {/* The glowing card, edge to edge; on desktop it takes whatever height
          the rest leaves, so the footer is one screen under the top bar. */}
      <div className="group @container relative isolate flex min-h-[260px] items-end overflow-hidden bg-[#1b1613] lg:min-h-[240px] lg:flex-1">
        {/* The picture, all its layers dotted as one (see Dotted, dark): a
            dark halftone that clears to the glow when the card is hovered. */}
        <Dotted dark className="z-0">
          <div className="absolute inset-0 z-0">
            <div className="ek6-nebula-a absolute -inset-x-[6%] -inset-y-[12%]">
              <Image
                src={GLOW.nebula}
                alt=""
                fill
                sizes="110vw"
                className="object-cover"
              />
            </div>
            <div className="ek6-nebula-b absolute -inset-x-[6%] -inset-y-[12%]">
              <Image
                src={GLOW.nebula}
                alt=""
                fill
                sizes="110vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(75%_95%_at_50%_50%,transparent,rgba(10,8,6,0.8))]" />
          </div>
          <div
            aria-hidden="true"
            className="ek6-star-twinkle pointer-events-none absolute inset-0 z-[1]"
          >
            <div className="ek6-star-drift absolute -inset-[4%]">
              <Image
                src={GLOW.stars}
                alt=""
                fill
                sizes="110vw"
                className="object-fill"
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[calc(50%-13.1cqw)] -left-[15.9cqw] z-[1] aspect-[4/5] w-[49.2cqw] origin-top-left -rotate-45 opacity-[0.26] mix-blend-screen"
          >
            <div className="ek6-leak-drift absolute inset-0 blur-[2.8cqw]">
              <Image
                src={GLOW.leak}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Dotted>

        <div className="relative z-[2] flex w-full flex-col gap-y-5 px-4 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-5 lg:py-8">
          <p className="max-w-[16ch] text-[30px] leading-[1.05] font-light tracking-[-0.03em] text-balance lg:text-[48px]">
            Art is everywhere. Come and notice.
          </p>
          <a
            href={CONTACT_PAGE}
            className={cn(BUTTON, "bg-white text-(--k-ink)")}
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Three columns of links. */}
      <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 px-4 pt-8 pb-8 sm:grid-cols-3 lg:grid-cols-12 lg:gap-x-5 lg:px-5 lg:pt-10 lg:pb-10">
        <nav aria-label="Explore" className="lg:col-span-3">
          <p className={LABEL}>Explore</p>
          <ul className="mt-4 space-y-1.5 text-[15px]">
            {[{ label: "Home", href: V6_HOME }, ...V6_NAV].map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Services" className="lg:col-span-3">
          <p className={LABEL}>Services</p>
          <ul className="mt-4 space-y-1.5 text-[15px]">
            {CTA_SERVICES.map((service) => (
              <li key={service.key}>
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {/* Link labels are set in title case, like every link on the site. */}
                  {service.title.replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* The motif again, resting on the dotted rule at the right, in the
            empty space under the address (it is shorter than the links):
            sand with a little maroon. Desktop only — on phones the address
            spans the width and there is no room for it. */}
        <div
          aria-hidden="true"
          className="relative -mb-8 hidden overflow-hidden lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:-mb-10 lg:block"
        >
          <Diamonds
            rows={44}
            shape="steps"
            horizontal
            tint="maroon"
            tintEvery={6}
            tintOpacity={0.45}
            side="right"
            className="absolute right-0 bottom-0 h-[56px] -scale-y-100 text-(--k-sand)/[0.12]"
          />
        </div>
        <div className="col-span-2 sm:col-span-1 lg:col-span-3 lg:col-start-10 lg:row-start-1">
          <p className={LABEL}>{FOOTER.location.title}</p>
          <address className="mt-4 text-[15px] leading-[1.45] not-italic">
            {DETAILS.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-2 text-[13px] text-white/60">
            {DETAILS.hours.days}, {DETAILS.hours.time}
          </p>
          <a
            href={DETAILS.directions}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[15px] underline decoration-1 underline-offset-4 hover:no-underline"
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* The last line, between two dotted rules. */}
      <div className="px-4 text-[#54504e] lg:px-5">
        <div aria-hidden="true" className="ek6-bracket-t" />
        <div
          className={cn(
            CAPS,
            "flex flex-col items-center gap-y-3 px-3 py-3 text-[11px] text-white/60 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-x-4 sm:py-1.5 lg:px-4",
          )}
        >
          <p>{FOOTER.copyright}</p>
          <a
            href={V6_HOME}
            aria-label="EkChitra, home"
            className="block w-[84px]"
          >
            <span className="block aspect-[526/118] bg-white [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]" />
          </a>
          <ul className="flex gap-x-5 sm:justify-end">
            {SOCIAL.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="ek6-bracket-b" />
      </div>
      <p className="mt-4 px-4 text-center text-[13px] text-white/60">
        {FOOTER.tagline}
      </p>

      {/* The motif on the footer's bottom edge at the right, in one pale tone,
          below the tagline (the footer leaves room for it on phones). */}
      <Diamonds
        rows={31}
        shape="clusters"
        horizontal
        side="right"
        className="absolute right-0 bottom-0 h-[28px] -scale-y-100 text-white/[0.12] lg:h-[40px]"
      />
    </footer>
  );
}
