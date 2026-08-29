import Image from "next/image";

const FONT_STACK = '"Helvetica Neue", "Akzidenz Grotesk Pro", Arial, sans-serif';

const IMG_BASE = "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images";

type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
  alt: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Velor",
    category: "Product Design",
    year: "2025",
    image: `${IMG_BASE}/velor-app.avif`,
    alt: "Velor product design case study",
  },
  {
    index: "02",
    title: "Grabl",
    category: "Web App",
    year: "2024",
    image: `${IMG_BASE}/grabl-app.avif`,
    alt: "Grabl web application case study",
  },
  {
    index: "03",
    title: "Monogram",
    category: "Identity & Motion",
    year: "2025",
    image: `${IMG_BASE}/bleibtgleich-25.avif`,
    alt: "Monogram identity and motion case study",
  },
  {
    index: "04",
    title: "Ipsum",
    category: "Editorial System",
    year: "2024",
    image: `${IMG_BASE}/do-lorem-ipsum.avif`,
    alt: "Ipsum editorial system case study",
  },
];

/**
 * Black projects section revealed behind the shrinking hero card.
 * Per-card entrance is scrubbed by the parent via the inherited `--gp`
 * custom property (0 → 1) plus a per-card `--stag` offset for the stagger.
 */
export function ProjectsGrid({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ fontFamily: FONT_STACK, ...style }}
    >
      <div className="flex h-full w-full flex-col gap-8 px-4 pt-6 md:gap-10 md:px-6 md:pt-8">
        {/* Section label */}
        <div
          className="flex items-start justify-between text-[12px] font-medium uppercase tracking-tight text-white/60"
          style={{
            opacity: "var(--gp, 0)",
            transform: "translateY(calc((1 - var(--gp, 0)) * 16px))",
          }}
        >
          <span>Selected Work</span>
          <span>Projects (04)</span>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {PROJECTS.map((p, i) => (
            <article
              key={p.index}
              className="group"
              style={
                {
                  "--stag": `${44 + i * 22}px`,
                  opacity: "var(--gp, 0)",
                  transform:
                    "translateY(calc((1 - var(--gp, 0)) * var(--stag)))",
                } as React.CSSProperties
              }
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[3px] border border-white/12 bg-white/[0.03]">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-90 grayscale transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                />
                <span className="absolute left-3 top-3 text-[11px] font-medium tabular-nums text-white/70 mix-blend-difference">
                  {p.index}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-[15px] font-medium tracking-tight text-white">
                  {p.title}
                </h3>
                <span className="text-[11px] font-medium tabular-nums text-white/40">
                  {p.year}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] font-medium uppercase tracking-tight text-white/45">
                {p.category}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
