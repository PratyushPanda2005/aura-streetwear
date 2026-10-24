import { cn } from "@/lib/utils";

import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, INTRO, MUTED, pad, ServicePhoto } from "./shared";

/** Each service cell's ground, top to bottom: white, then brand black. */
const CELLS = [
  {
    ground: "border-b border-(--k-ink)/15 bg-white text-(--k-ink)",
    muted: MUTED,
  },
  { ground: "bg-(--k-ink) text-white", muted: "text-white/70" },
];

/**
 * 07 — Three panels, edge to edge and exactly one screen tall below the top
 * bar: a narrow white column with "Services" at the top and, at its foot,
 * the heading, the line and a small second photograph; one large photograph
 * filling the middle; and at the right the two services as stacked cells —
 * white, then black — each with its name large, its audience in small
 * capitals, its line and an underlined way in. Static.
 */
export function ServicesPanels() {
  const [first, second] = CTA_SERVICES;

  return (
    <section
      aria-label="Services"
      className={cn(
        "grid grid-cols-1 bg-white text-(--k-ink) lg:h-[calc(100svh-44px)] lg:min-h-[640px] lg:grid-cols-12",
        SANS,
      )}
    >
      {/* Left: label at the top, heading, line and a small photo at the foot. */}
      <div className="flex flex-col justify-between gap-y-10 px-4 py-10 lg:col-span-3 lg:px-5 lg:py-8">
        <p className={cn(CAPS, "text-[11px]", MUTED)}>Services</p>
        <div>
          <h2 className={TITLE}>{INTRO.title}</h2>
          <p className="mt-4 text-[15px] leading-[1.45] text-(--k-ink)/75">
            {INTRO.body}
          </p>
          <ServicePhoto
            service={second}
            sizes="200px"
            className="mt-8 hidden aspect-[4/3] w-[180px] lg:block"
          />
        </div>
      </div>

      {/* Middle: one photograph, full height. */}
      <ServicePhoto
        service={first}
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-full"
      />

      {/* Right: the two services, stacked. */}
      <div className="grid grid-rows-2 border-(--k-ink)/15 lg:col-span-4 lg:border-l">
        {CTA_SERVICES.map((service, index) => {
          const cell = CELLS[index % CELLS.length];
          return (
            <article
              key={service.key}
              className={cn(
                "flex flex-col justify-between gap-y-8 px-4 py-8 lg:px-8",
                cell.ground,
              )}
            >
              <div className="flex items-baseline justify-between gap-x-4">
                <h3 className="text-[34px] leading-[1] tracking-[-0.04em] lg:text-[2.8vw]">
                  {service.title}
                </h3>
                <span className="text-[13px] tabular-nums">
                  {pad(index + 1)}
                </span>
              </div>
              <div>
                <p className={cn(CAPS, "text-[11px]", cell.muted)}>
                  {service.eyebrow}
                </p>
                <p className="mt-4 max-w-[380px] text-[16px] leading-[1.45]">
                  {service.body}
                </p>
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-[14px] underline decoration-1 underline-offset-4 hover:no-underline"
                >
                  {service.cta.label} →
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
