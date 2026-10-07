import Image from "next/image";

import {
  PROJECTS,
  PROJECTS_HEADING,
  PROJECTS_LINK,
  type Project,
} from "./data";

/**
 * Selected projects — the staggered 12-column grid from produx.design.
 *
 * Measured at 1440×900: section padding 5.55vw / 11.67vh, header `items-end`
 * with the link baseline-aligned to the second heading line, rows stacked with
 * a 13.67vh gap. Card footprints per row:
 *
 *   row 1  col-span-7            +  col-span-4 col-end-13 (mt-auto → bottoms align)
 *   row 2  col-span-10 col-start-2
 *   row 3  col-span-4            +  col-span-7 col-end-13
 *
 * The original animates everything in with GSAP and paints the heading into a
 * WebGL canvas; this is the resting layout in plain DOM.
 */

/** Media aspect ratios, taken from the rendered boxes on the live site. */
const MEDIA_ASPECT: Record<Project["span"], string> = {
  wide: "aspect-[738/586]",
  tall: "aspect-[413/430]",
  full: "aspect-[1067/583]",
};

/** Column footprint per card, keyed by position in the source order. */
const CARD_PLACEMENT = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-end-13 lg:mt-auto lg:h-fit",
  "lg:col-span-10 lg:col-start-2",
  "lg:col-span-4 lg:h-fit",
  "lg:col-span-7 lg:col-end-13",
];

function ProjectCard({
  project,
  placement,
}: {
  project: Project;
  placement: string;
}) {
  return (
    <article
      className={`flex flex-col gap-6 lg:gap-[1.67vw] ${placement}`}
    >
      <div
        className={`relative w-full overflow-hidden ${MEDIA_ASPECT[project.span]}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1023px) 92vw, 75vw"
          className="object-cover object-center"
        />

        {/* Discipline tags, tucked into the bottom-right of the media. */}
        <div className="pointer-events-none absolute right-0 bottom-0 m-4 hidden gap-[3px] sm:flex lg:m-[1.39vw] lg:gap-[0.41vw]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="-rotate-2 border border-white/5 bg-black/25 p-2 font-mono text-[9px] leading-[1.5] tracking-[0.02em] text-[#f2f2f2] uppercase backdrop-blur-md lg:p-[0.69vw] lg:text-[0.69vw]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex w-full flex-col sm:flex-row">
        <span
          aria-hidden="true"
          className="mb-3 hidden size-2 shrink-0 border border-[#303030] sm:mt-[1.5vh] sm:mb-0 sm:mr-3 sm:block lg:mr-[0.73vw] lg:size-[0.55vw]"
        />
        <div className="flex flex-col gap-2.5 lg:gap-[0.73vw]">
          <h3 className="text-[22px] leading-tight text-[#f2f2f2] lg:text-[1.67vw]">
            {project.title}
          </h3>
          <p className="max-w-[46ch] font-mono text-[12px] leading-[1.3] tracking-[0.01em] text-[#a9a9a9] uppercase lg:max-w-[24vw] lg:text-[0.97vw]">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="px-[4.1vw] pb-24 text-[#f2f2f2] lg:px-[5.55vw] lg:pb-[11.67vh]"
    >
      <header className="flex flex-col gap-8 pt-24 sm:flex-row sm:items-end sm:justify-between lg:pt-[16.6vh]">
        <h2 className="text-[clamp(2.5rem,5.83vw,5.25rem)] leading-[1.07] font-light tracking-[-0.02em]">
          {PROJECTS_HEADING.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <a
          href={PROJECTS_LINK.href}
          className="w-fit font-mono text-[13px] uppercase lg:mb-[1.17vh] lg:text-[1.38vw]"
        >
          <span className="flex items-center gap-[0.4vw]">
            {PROJECTS_LINK.label}
          </span>
          <span className="mt-1 block h-px w-full origin-left bg-[#f2f2f2] lg:mt-0 lg:translate-y-[0.39vh]" />
        </a>
      </header>

      <div className="flex flex-col gap-16 pt-16 lg:gap-[13.67vh] lg:pt-[11.7vh]">
        {/* Row 1 — large left card, shorter right card dropped to bottom-align. */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-[1.39vw]">
          <ProjectCard project={PROJECTS[0]} placement={CARD_PLACEMENT[0]} />
          <ProjectCard project={PROJECTS[1]} placement={CARD_PLACEMENT[1]} />
        </div>

        {/* Row 2 — single wide card, indented by one column, no grid gap. */}
        <div className="grid lg:grid-cols-12">
          <ProjectCard project={PROJECTS[2]} placement={CARD_PLACEMENT[2]} />
        </div>

        {/* Row 3 — mirror of row 1: narrow card left, large card right. */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-[1.39vw]">
          <ProjectCard project={PROJECTS[3]} placement={CARD_PLACEMENT[3]} />
          <ProjectCard project={PROJECTS[4]} placement={CARD_PLACEMENT[4]} />
        </div>
      </div>
    </section>
  );
}
