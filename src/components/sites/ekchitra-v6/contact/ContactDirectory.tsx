import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { HERO_SLIDES } from "../../ekchitra-redesign/data";
import { SANS } from "../../ekchitra-v5/shared";
import { CtaBanner } from "../CtaBanner";
import { GRID } from "../styles";
import { DETAILS } from "./data";

/** A small bold label over each block, as on goodman-gallery.com/contact. */
const LABEL = "text-[13px] font-medium";

/** Links in the blocks: plain text, underlined. */
const LINK =
  "underline decoration-(--k-ink)/40 underline-offset-[3px] transition-colors hover:decoration-(--k-ink)";

const MUTED = "text-(--k-ink)/65";

/**
 * Contact, after goodman-gallery.com/contact: a row per group under a thin
 * rule — its name in columns 1–3, small labelled blocks in two columns
 * across 4–9, a picture in 10–12 — then the shared closing banner. Every
 * detail is EkChitra's own, from ekchitra.com/contact.
 */
export function ContactDirectory() {
  return (
    <div className={SANS}>
      <Row
        name="General"
        picture={
          <div className="flex aspect-[4/3] items-center justify-center bg-(--k-ink)">
            <span className="text-[22px] tracking-[0.3em] text-white uppercase">
              EkChitra
            </span>
          </div>
        }
      >
        <Block label="Enquiries">
          <Who name="EkChitra" role="General enquiries" />
          <p className="mt-4 flex flex-col items-start gap-y-1">
            <a href={`mailto:${DETAILS.email}`} className={LINK}>
              {DETAILS.email}
            </a>
            <a
              href={DETAILS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              {DETAILS.phone}
              <span className="sr-only"> on WhatsApp</span>
            </a>
          </p>
        </Block>
        <Block label="Curation">
          <Who name={DETAILS.curator} role="Curator" />
        </Block>
        <Block label="Follow">
          <a
            href={DETAILS.instagram.href}
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            Instagram {DETAILS.instagram.handle}
          </a>
        </Block>
      </Row>

      <Row
        name={DETAILS.city}
        picture={
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={HERO_SLIDES[2].src}
              alt={HERO_SLIDES[2].alt}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <Block label="Hours">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6">
            <dt>{DETAILS.hours.days}</dt>
            <dd>{DETAILS.hours.time}</dd>
          </dl>
        </Block>
        <Block label="General">
          <p className="flex flex-col items-start gap-y-1">
            <a
              href={`tel:${DETAILS.phone.replace(/\s/g, "")}`}
              className={LINK}
            >
              {DETAILS.phone}
            </a>
            <a href={`mailto:${DETAILS.email}`} className={LINK}>
              {DETAILS.email}
            </a>
          </p>
        </Block>
        <Block label="Getting There">
          <address className="not-italic">
            {DETAILS.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={DETAILS.directions}
            target="_blank"
            rel="noreferrer"
            className={cn(LINK, "mt-4 inline-block")}
          >
            Get Directions
          </a>
        </Block>
      </Row>

      <CtaBanner
        href={DETAILS.whatsapp}
        title={DETAILS.banner.title}
        cta={DETAILS.banner.cta}
        image={DETAILS.banner.src}
      />
    </div>
  );
}

function Row({
  name,
  picture,
  children,
}: {
  name: string;
  picture: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={name}
      className={cn(GRID, "gap-y-8 border-t border-(--k-ink)/15 py-8 lg:py-10")}
    >
      <h2 className="col-span-4 text-[19px] tracking-[-0.01em] lg:col-span-3">
        {name}
      </h2>
      <div className="col-span-4 grid grid-cols-1 gap-x-5 gap-y-10 text-[13px] leading-[1.5] sm:grid-cols-2 lg:col-span-6">
        {children}
      </div>
      <div className="col-span-4 lg:col-span-3">{picture}</div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className={cn(LABEL, "mb-3")}>{label}</h3>
      {children}
    </div>
  );
}

function Who({ name, role }: { name: string; role: string }) {
  return (
    <p>
      <span className="block">{name}</span>
      <span className={cn("block", MUTED)}>{role}</span>
    </p>
  );
}
