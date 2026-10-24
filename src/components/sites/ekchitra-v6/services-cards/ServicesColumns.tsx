import { cn } from "@/lib/utils";

import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { BUTTON, GRID } from "../styles";
import { CTA_SERVICES, Covers, INTRO, MUTED, pad, SCREEN } from "./shared";

/**
 * 05 — Columns: no pictures. The heading and line in columns 1–4,
 * then the two services in 5–8 and 9–12, each opening under a black rule
 * with its number, then the name, audience, line, what it covers and a
 * button — read across like a printed menu. Static.
 */
export function ServicesColumns() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink)", SCREEN, SANS)}
    >
      <div className={cn(GRID, "gap-y-12")}>
        <div className="col-span-4">
          <h2 className={TITLE}>{INTRO.title}</h2>
          <p className="mt-4 max-w-[360px] text-[16px] leading-[1.45] text-(--k-ink)/75">
            {INTRO.body}
          </p>
        </div>
        {CTA_SERVICES.map((service, index) => (
          <article
            key={service.key}
            className="col-span-4 flex flex-col border-t border-(--k-ink) pt-4"
          >
            <span className="text-[13px] tabular-nums">{pad(index + 1)}</span>
            <h3 className="mt-8 text-[28px] leading-[1.05] tracking-[-0.035em] lg:text-[34px]">
              {service.title}
            </h3>
            <p className={cn(CAPS, "mt-3 text-[11px]", MUTED)}>
              {service.eyebrow}
            </p>
            <p className="mt-5 text-[16px] leading-[1.45]">{service.body}</p>
            <Covers items={service.covers} className="mt-4" />
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(BUTTON, "mt-8")}
            >
              {service.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
