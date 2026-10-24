import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, MUTED, pad, TEXT_LINK, SCREEN } from "./shared";

/** Shared column layout for the header and every row. */
const COLS = "grid grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-5";

/**
 * 02 — Table: no pictures, the two services as rows of a ruled spec sheet on
 * the grid — number, name, who it's for, what it is, what it covers and the
 * way in, under a header row of small capitals. Static.
 */
export function ServicesTable() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white px-4 py-20 text-(--k-ink) lg:px-5", SCREEN, SANS)}
    >
      <div
        className={cn(
          COLS,
          CAPS,
          "hidden border-b border-(--k-ink) pb-3 text-[11px] lg:grid",
          MUTED,
        )}
      >
        <span className="col-span-1">No.</span>
        <span className="col-span-3">Service</span>
        <span className="col-span-2">For</span>
        <span className="col-span-3">What it is</span>
        <span className="col-span-3">Covers</span>
      </div>
      {CTA_SERVICES.map((service, index) => (
        <div
          key={service.key}
          className={cn(
            COLS,
            "items-baseline gap-y-3 border-b border-(--k-ink)/20 py-8 first:border-t first:border-(--k-ink) lg:first:border-t-0 lg:py-10",
          )}
        >
          <span className="col-span-1 text-[13px] tabular-nums">
            {pad(index + 1)}
          </span>
          <h3 className="col-span-3 text-[28px] leading-[1.05] tracking-[-0.035em] lg:text-[34px]">
            {service.title}
          </h3>
          <p className={cn("col-span-4 text-[14px] lg:col-span-2", MUTED)}>
            {service.eyebrow}
          </p>
          <div className="col-span-4 lg:col-span-3">
            <p className="text-[16px] leading-[1.45]">{service.body}</p>
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(TEXT_LINK, "mt-4 inline-block text-[14px]")}
            >
              {service.cta.label} →
            </a>
          </div>
          <ul className="col-span-4 space-y-1 text-[14px] leading-[1.45] text-(--k-ink)/75 lg:col-span-3">
            {service.covers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
