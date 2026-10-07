/**
 * Content for the Studio redesign hero. Kept in one place so the copy can be
 * swapped without touching layout.
 */

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Method", href: "#studio" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  wordmark: "STUDIO",
  headline: ["Architecture that sculpts", "light & physical form"],
  headlineMark: "®",
  intro:
    "Studio is an architectural & spatial design practice crafting monolithic structures, refined interiors, and enduring physical spaces worldwide.",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
} as const;

/** Card footprint on the 12-column grid — mirrors the source site's stagger. */
export type ProjectSpan = "wide" | "tall" | "full";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: string;
  span: ProjectSpan;
};

/**
 * Five selected projects, with curated high-resolution Unsplash photography.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "kaze-pavilion",
    title: "Kaze Pavilion",
    description: "Minimalist concrete sanctuary integrated into the mountain cliffside of Kyoto.",
    tags: ["architecture", "interior design", "spatial curation", "kyoto"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    span: "wide",
  },
  {
    slug: "horizon-atelier",
    title: "Horizon Atelier",
    description:
      "Monolithic glass and raw steel art gallery overlooking the fjords of Reykjavik.",
    tags: ["cultural architecture", "facade engineering", "reykjavik"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    span: "tall",
  },
  {
    slug: "lumen-complex",
    title: "Lumen Complex",
    description:
      "Sustainable net-zero urban landmark engineered with intelligent glass facades and atrium spaces.",
    tags: ["urban masterplanning", "sustainable design", "zurich"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85",
    span: "full",
  },
  {
    slug: "solis-residence",
    title: "Solis Residence",
    description:
      "Subterranean desert sanctuary combining rammed earth walls with sculpted natural skylighting.",
    tags: ["residential architecture", "material research", "palm springs"],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
    span: "tall",
  },
  {
    slug: "vortex-hub",
    title: "Vortex Innovation Hub",
    description: "Dynamic spatial environment designed for fluid collaboration and acoustic harmony.",
    tags: ["workplace experience", "interior architecture", "berlin"],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
    span: "wide",
  },
] as const;

export const PROJECTS_HEADING = ["Selected", "works"] as const;
export const PROJECTS_LINK = { label: "view all projects", href: "#work" } as const;

/** One stage of the studio method — list row plus its paired image. */
export type MethodStage = {
  number: string;
  label: string;
  image: string;
};

export const METHOD_STAGES: readonly MethodStage[] = [
  {
    number: "01",
    label: "Schematic Design & Volumetric Studies",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    label: "Urban Masterplanning & Zoning Applications",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    label: "Material Engineering & Tactile Prototyping",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "04",
    label: "Facade Systems & Sustainable Integration",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "05",
    label: "Bespoke Interior & Lighting Curation",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85",
  },

] as const;

export const METHOD = {
  sectionNumber: "04",
  sectionLabel: "Method",
  body: "Our practice covers all stages within Architecture, Spatial Curation, and Interior Design. We offer end-to-end services from initial conceptual visioning to practical completion.",
} as const;

/** One customer story slide in the voices carousel. */
export type Voice = {
  stat: string;
  quote: string;
  name: string;
  role: string;
  image: string;
};

export const VOICES: readonly Voice[] = [
  {
    stat: "40% reduction in carbon footprint",
    quote:
      "Studio transformed our urban campus into a living, breathing landmark that inspires our global team every single day.",
    name: "Helena Vance",
    role: "Chief Executive Officer at Apex Global",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    stat: "3 International Architectural Awards",
    quote:
      "Their relentless pursuit of material purity and structural elegance turned our vision into an iconic cultural sanctuary.",
    name: "Soren Lindqvist",
    role: "Design Director at Nordic Art Foundation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    stat: "Seamless execution across 3 continents",
    quote:
      "Working with Studio felt like a masterclass in spatial choreography. Every detail was executed with surgical precision.",
    name: "Aria Chen",
    role: "Managing Partner at Horizon Developments",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    stat: "100% net-zero energy certification",
    quote:
      "Studio elevated our residential estate beyond luxury into an enduring sanctuary that honors its natural landscape.",
    name: "Matteo Rossi",
    role: "Founder at Villa San Lorenzo",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    stat: "25,000 sq meter landmark delivered",
    quote:
      "The spatial flow and light manipulation in our flagship headquarters have redefined how our community interacts.",
    name: "Dr. Evelyn Thorne",
    role: "Principal Curator at Institute for Spatial Future",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85",
  },
] as const;

export const VOICES_HEADER = {
  overline: "Client Narratives",
  heading: "Transformative spaces. Lasting impact.",
} as const;

/** Dwell per slide before the carousel advances. */
export const VOICES_INTERVAL_MS = 6000;

/** One client item in the "Collaborators & Clients" grid. */
export type Client = { name: string; tag: string };

export const CLIENTS: readonly Client[] = [
  { name: "VITA Spatial", tag: "Kyoto / Tokyo" },
  { name: "KRONOS Form", tag: "Zurich" },
  { name: "NORDIK Living", tag: "Oslo / Stockholm" },
  { name: "ARCUS Studio", tag: "London" },
  { name: "LUMEN Light", tag: "Berlin" },
  { name: "FORMA Works", tag: "New York" },
  { name: "MONO Atelier", tag: "Reykjavik" },
  { name: "APEX Arch", tag: "Singapore" },
] as const;

export const CLIENTS_EYEBROW = "Global Partners & Collaborators";

export const CLIENTS_NUMBER = "05";
export const CLIENTS_LABEL = "Clients";

/** One footer link column. */
export type FooterColumn = {
  heading: string;
  links: readonly { label: string; href: string }[];
};

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "#top" },
      { label: "Selected Work", href: "#work" },
      { label: "Studio Method", href: "#studio" },
      { label: "Narratives", href: "#voices" },
      { label: "Clients", href: "#clients" },
    ],
  },
  {
    heading: "Inquiries",
    links: [
      { label: "New Projects", href: "mailto:hello@studio.com" },
      { label: "Press & Publications", href: "mailto:press@studio.com" },
      { label: "Careers & Internships", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export const FOOTER = {
  wordmark: "STUDIO",
  tagline: "STUDIO — Architecture, Interior Design & Spatial Environments",
  newsletterHeading: "Join our journal",
  newsletterLabel: "Subscribe to spatial notes",
  placeholder: "Enter your email address",
  cta: "Subscribe",
} as const;

