const IMAGES = "/sites/ekchitra-redesign/images";

/** Routes of the redesign. Section links are absolute so they work from every page. */
export const ROUTES = {
  home: "/ekchitra-redesign",
  artists: "/ekchitra-redesign/artists",
  artworks: "/ekchitra-redesign/artworks",
};

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  src: string;
  alt: string;
}

export const LOGO = {
  src: `${IMAGES}/ekchitra-logo.png`,
  alt: "EkChitra",
  width: 526,
  height: 118,
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: `${ROUTES.home}#about` },
  { label: "Artists", href: ROUTES.artists },
  { label: "Artworks", href: ROUTES.artworks },
  { label: "Exhibitions", href: `${ROUTES.home}#exhibitions` },
  { label: "Services", href: `${ROUTES.home}#services` },
];

export const SECONDARY_NAV: NavLink[] = [
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  eyebrow: "EkChitra · Hyderabad",
  title: "Art is everywhere. We help you notice.",
  body: "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
  cta: { label: "Our Exhibitions", href: "#exhibitions" },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: `${IMAGES}/hero-dsc01932.jpg`,
    alt: "Lamp lighting at an EkChitra exhibition opening",
  },
  {
    src: `${IMAGES}/hero-newindianexpress-2025-12-05.avif`,
    alt: "Artists and visitors inside the EkChitra gallery",
  },
  {
    src: `${IMAGES}/gallery-space-hyderabad.webp`,
    alt: "Ribbon cutting at EkChitra, Hyderabad",
  },
];

export interface Artwork {
  artist: string;
  title: string;
  medium: string;
  size: string;
  image: string;
  width: number;
  height: number;
  /** Artist page on ekchitra.com, where one exists. */
  href: string;
  /** Shaped piece photographed on white: shown whole on a paper mount, not cropped. */
  cutout?: boolean;
}

const ARTWORKS_DIR = "/sites/ekchitra-redesign/artworks";
const ARTISTS_URL = "https://www.ekchitra.com/artists";

export const ARTISTS_SECTION = {
  label: "Artists",
  cta: { label: "Explore all artists", href: ROUTES.artists },
  slideCta: "View artist",
};

export const ARTWORKS: Artwork[] = [
  {
    artist: "Anupama Choudhary",
    title: "Arthanareeswara",
    medium: "Mixed Media on Canvas",
    size: "36 x 36 Inches",
    image: `${ARTWORKS_DIR}/arthanareeswara--anupama-choudhary.png`,
    width: 1200,
    height: 1202,
    href: `${ARTISTS_URL}/anupama-choudhary`,
  },
  {
    artist: "Ashok Juttu",
    title: "Untitled - 1",
    medium: "Acrylic Ink & Acrylic Pens on Canvas",
    size: "60 x 66 Inches",
    image: `${ARTWORKS_DIR}/untitled-1--ashok-juttu.png`,
    width: 1200,
    height: 1300,
    href: `${ARTISTS_URL}/ashok-juttu`,
  },
  {
    artist: "Chandrapal Panjre",
    title: "Untitled - 1",
    medium: "Mixed Media",
    size: "24 x 30 Inches",
    image: `${ARTWORKS_DIR}/untitled-1--chandrapal-panjre.png`,
    width: 1200,
    height: 1438,
    cutout: true,
    href: `${ARTISTS_URL}/chandrapal-panjre`,
  },
  {
    artist: "Charanjeet Singh",
    title: "Untitled - 2",
    medium: "Acrylic on Paper",
    size: "16.5 x 12 Inches",
    image: `${ARTWORKS_DIR}/untitled-2--charanjeet-singh.png`,
    width: 1200,
    height: 1625,
    href: `${ARTISTS_URL}/charanjeet-singh`,
  },
  {
    artist: "Dilip Kumar",
    title: "Paths - 1",
    medium: "Acrylic on Plywood",
    size: "53 x 50 Inches",
    image: `${ARTWORKS_DIR}/paths-1--dilip-kumar.png`,
    width: 1200,
    height: 1408,
    cutout: true,
    href: `${ARTISTS_URL}/dilip-kumar`,
  },
  {
    artist: "Farhad Hussain",
    title: "Harmony of Nature and Mind",
    medium: "Acrylic on Canvas",
    size: "36 x 36 Inches",
    image: `${ARTWORKS_DIR}/harmony-of-nature-and-mind--farhad-hussain.png`,
    width: 1200,
    height: 1191,
    href: `${ARTISTS_URL}/farhad-hussain`,
  },
  {
    artist: "Kolipitchai Prabhakar",
    title: "Vernacular House",
    medium: "Acrylic on Canvas",
    size: "24 x 36 Inches",
    image: `${ARTWORKS_DIR}/vernacular-house-2--kolipitchai-prabhakar.png`,
    width: 1200,
    height: 1501,
    href: `${ARTISTS_URL}/kolipitchai-prabhakar`,
  },
  {
    artist: "Manish Sharma",
    title: "Sites of Remembering",
    medium: "Wood, Iron, Acrylic and PU",
    size: "36 x 65 x 7 Inches",
    image: `${ARTWORKS_DIR}/sites-of-remembering--manish-sharma.png`,
    width: 1200,
    height: 671,
    cutout: true,
    href: `${ARTISTS_URL}/manish-sharma`,
  },
  {
    artist: "Parul Kaur",
    title: "Between Presence and Absence 3",
    medium: "Watercolor on Stamp Papers",
    size: "14 x 20 Inches",
    image: `${ARTWORKS_DIR}/between-presence-and-absence-3--parul-kaur-trimmed.png`,
    width: 966,
    height: 1319,
    href: `${ARTISTS_URL}/parul-kaur`,
  },
  {
    artist: "Rahul & Gunjan",
    title: "Finding My Ground",
    medium: "Collected Wool Silk, Linen, Cotton & Steel",
    size: "64 x 84 Inches",
    image: `${ARTWORKS_DIR}/finding-my-ground--rahul-and-gunjan.png`,
    width: 1200,
    height: 919,
    cutout: true,
    href: `${ARTISTS_URL}/rahul-%26-gunjan`,
  },
  {
    artist: "Rajesh Naik",
    title: "Meri Maa Ki Dua",
    medium: "Metal",
    size: "30 x 30 Inches",
    image: `${ARTWORKS_DIR}/meri-maa-ki-dua--rajesh-naik.png`,
    width: 1200,
    height: 1258,
    href: `${ARTISTS_URL}/rajesh-naik`,
  },
  {
    artist: "Sarvanan Parasuraman",
    title: "Modified Continuity",
    medium: "Paper Board",
    size: "48 x 48 Inches",
    image: `${ARTWORKS_DIR}/modified-continuity--sarvanan-parasuraman.png`,
    width: 1200,
    height: 1382,
    cutout: true,
    href: `${ARTISTS_URL}/sarvanan-parasuraman`,
  },
  {
    artist: "Selva Kumar",
    title: "Embrace of Light",
    medium: "Stainless Steel and Corten Steel",
    size: "36 x 38 x 16 Inches",
    image: `${ARTWORKS_DIR}/embrace-of-light--selvakumar.png`,
    width: 1200,
    height: 911,
    href: `${ARTISTS_URL}/selva-kumar`,
  },
  {
    artist: "Subodh Kerkar",
    title: "Head 1",
    medium: "Ceramic Clay with Red Oxide",
    size: "18.5 x 11 Inches",
    image: `${ARTWORKS_DIR}/head-1--subodh-kerkar-trimmed.png`,
    width: 1044,
    height: 1613,
    href: `${ARTISTS_URL}/subodh-kekar`,
  },
  {
    artist: "Vinod Daroz",
    title: "Sanctum (From the series of Aikyam)",
    medium: "Porcealin and Stonewears with liquid Gold",
    size: "12 x 12 x 5.5 Inches Each",
    image: `${ARTWORKS_DIR}/sanctum-aikyam--vinod-daroz.png`,
    width: 1200,
    height: 811,
    href: `${ARTISTS_URL}/vinod-daroz`,
  },
];

export interface GalleryEvent {
  status: string;
  title: string;
  dates: string;
  curator: string;
  venue: string;
  /** Poster or installation image; omitted until one is supplied. */
  image?: string;
  href: string;
}

const EXHIBITIONS_URL = "https://www.ekchitra.com/exhibitions";

export const EVENTS_SECTION = {
  label: "Events & Announcements",
  heading: "Current & upcoming",
  cta: { label: "View all", href: EXHIBITIONS_URL },
  imagePlaceholder: "Exhibition image to follow",
};

export const EVENTS: GalleryEvent[] = [
  {
    status: "Ongoing",
    title: "Living Temple 2026",
    dates: "12 Sep — 18 Nov 2026",
    curator: "Curated by Annapurna M",
    venue: "EkChitra, Hyderabad",
    image: "/sites/ekchitra-redesign/exhibitions/living-temple-2026.jpg",
    href: EXHIBITIONS_URL,
  },
  {
    status: "Upcoming",
    title: "Where Light Rests",
    dates: "05 Dec 2026 — 14 Feb 2027",
    curator: "Curated by Annapurna M",
    venue: "EkChitra, Hyderabad",
    href: EXHIBITIONS_URL,
  },
];

export const ABOUT_SECTION = {
  label: "Why we exist",
  heading: [
    "We’ve always lived around art.",
    "We’ve just forgotten to notice it.",
  ],
  paragraphs: [
    "From temple carvings and cinema posters to family photographs, textiles and handwritten signs, visual culture has always shaped how we understand identity, memory and belonging.",
    "Ek Chitra makes that conversation easier to enter. Every exhibition begins with an idea, and every visit begins with curiosity — you don’t need to know about art to feel at home here.",
  ],
  cta: { label: "About us", href: "https://www.ekchitra.com/about" },
  image: {
    src: `${IMAGES}/hero-newindianexpress-2025-12-05.avif`,
    alt: "Artists and visitors gathered in front of a painting inside the EkChitra gallery",
  },
};

/**
 * TEMPORARY PLACEHOLDER — this photograph belongs to The Noguchi Museum and is
 * here only to judge the layout. Replace it with an EkChitra image before the
 * site is published.
 */
export const PARALLAX_IMAGE: { src: string; alt: string; caption?: string } = {
  src: "/sites/ekchitra-redesign/placeholders/parallax-placeholder-noguchi.jpg",
  alt: "",
};

export interface ServicePanel {
  eyebrow: string;
  title: string;
  body: string;
  cta: NavLink;
  image: { src: string; alt: string };
}

const CONTACT_URL = "https://wa.me/919100118321";

export const SERVICES: ServicePanel[] = [
  {
    eyebrow: "For architects, designers & institutions",
    title: "Bespoke sourcing",
    body: "Art selection, curation and placement shaped around a particular space and brief.",
    cta: { label: "Source for a space", href: CONTACT_URL },
    image: {
      src: `${ARTWORKS_DIR}/sanctum-aikyam--vinod-daroz.png`,
      alt: "Sanctum (From the series of Aikyam) by Vinod Daroz — detail",
    },
  },
  {
    eyebrow: "For collectors",
    title: "Art advisory",
    body: "Contextual, considered guidance for starting, refining or growing a collection.",
    cta: { label: "Get in touch", href: CONTACT_URL },
    image: {
      src: `${ARTWORKS_DIR}/untitled-1--ashok-juttu.png`,
      alt: "Untitled - 1 by Ashok Juttu — detail",
    },
  },
];

export const FOOTER = {
  name: "EkChitra",
  tagline: "Contemporary Indian art gallery and cultural platform, Hyderabad.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Artists", href: ROUTES.artists },
        { label: "Artworks", href: ROUTES.artworks },
        { label: "Exhibitions", href: `${ROUTES.home}#exhibitions` },
        { label: "Services", href: `${ROUTES.home}#services` },
      ],
    },
    {
      title: "Gallery",
      links: [
        { label: "About", href: `${ROUTES.home}#about` },
        { label: "Contact", href: CONTACT_URL },
      ],
    },
  ],
  location: {
    title: "Hyderabad",
    note: "Address and opening hours to be confirmed.",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/ek_chitra/" },
    { label: "WhatsApp", href: CONTACT_URL },
  ],
  copyright: "© 2026 EkChitra",
};

export const ARTISTS_PAGE = {
  label: "Artists",
  intro:
    "Artists shaping contemporary India, exclusively represented by EkChitra.",
  searchPlaceholder: "Search artist / medium / artwork",
  cardCta: "View artist",
  /** Background of the page banner — a detail of one of the gallery's artworks. */
  banner: {
    src: `${ARTWORKS_DIR}/untitled-1--ashok-juttu.png`,
    alt: "",
    caption: "Ashok Juttu, Untitled - 1 (detail)",
  },
};

/** Opening lines of each artist's statement, verbatim from their page on ekchitra.com. */
export const ARTIST_BIOS: Record<string, string> = {
  "Anupama Choudhary":
    "This artist explores the vibrant intersection of pop art and Indian mythology, employing a comic-book style to bring their vision to life.",
  "Ashok Juttu":
    "Their works are postmodernist explorations, lightly touched by notions of deconstructionism, where the artist unravels surfaces that bear the scars and whispers of time’s passage.",
  "Chandrapal Panjre":
    "Artwork-making is an enjoyable and meditative process for him. The elements of his artwork represent rural lifestyle and rural culture.",
  "Charanjeet Singh":
    "Charanjeet Singh is a contemporary artist whose creations echo the whispers of history and advocate for water conservation.",
  "Dilip Kumar":
    "Dilipkumar Kesavan is an artist based in Chennai whose work is deeply rooted in the textures and stories of his surroundings.",
  "Farhad Hussain":
    "The painting presents a surreal scene where the woman appears in quiet harmony with the birds around her.",
  "Kolipitchai Prabhakar":
    "The artist believes that many visual artists naturally return to their native landscapes, drawing inspiration from cultural roots and childhood memories etched deep within their consciousness.",
  "Manish Sharma":
    "His art poignantly explores themes of nostalgia and cultural preservation.",
  "Parul Kaur":
    "Parul Kaur is a Baroda-based artist currently working in Surat. Watercolour is her primary medium.",
  "Rahul & Gunjan":
    "Threadarte, which began as an experiment in 2004 to deal with textile waste became the artist Rahul and Gunjan’s unique language.",
  "Rajesh Naik":
    "Born in the suburbs of Hyderabad, the artist began supporting his family from an early age, driving an autorickshaw at night.",
  "Sarvanan Parasuraman":
    "They work toward their living with an ongoing attempt to live better than the previous day.",
  "Selva Kumar":
    "He has over 22 years of experience in traditional and digital sculpting.",
  "Subodh Kerkar":
    "Subodh states that his convictions find their expression in his creations.",
  "Vinod Daroz":
    "Vinod Daroz, an Indian artist born into a family of traditional jewellers, carries forward a heritage of refined craftsmanship, meticulous attention to detail, and an unwavering commitment to perfection.",
};

export const ARTWORKS_PAGE = {
  label: "Artworks",
  intro:
    "A living collection of contemporary expressions across various media.",
  searchPlaceholder: "Search artwork title / medium / artist",
  cardCta: "View artist",
  /** Background of the page banner — a detail of one of the gallery's artworks. */
  banner: {
    src: `${ARTWORKS_DIR}/untitled-1--chandrapal-panjre.png`,
    alt: "",
    caption: "Chandrapal Panjre, Untitled - 1 (detail)",
  },
  /** One-tap searches shown under the search field; each matches text in the medium. */
  quickSearches: [
    "Acrylic",
    "Mixed Media",
    "Canvas",
    "Paper",
    "Steel",
    "Ceramic",
    "Watercolor",
  ],
};
