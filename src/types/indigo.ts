/**
 * Content contracts for the indigo-laboratory.it clone.
 * Shapes mirror the site's own Nuxt content payload
 * (docs/research/indigo-laboratory-it-f84b5a72/root-8a5edab2/CONTENT.json).
 */

export interface IndigoImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface IndigoResponsiveImage {
  alt?: string;
  desktop: IndigoImage;
  mobile: IndigoImage;
  thumbnail?: IndigoImage;
}

export interface IndigoVideoSource {
  src: string;
  poster: string;
}

export interface IndigoSplash {
  abstract: string;
  soundEnableLabel: string;
  soundDisableLabel: string;
}

export interface IndigoHero {
  pretitle: string;
  backgroundVideo: {
    desktop: IndigoVideoSource;
    mobile: IndigoVideoSource;
  };
  soundBg: { src: string };
}

export interface IndigoIntro {
  title: string;
  abstract: string;
  caption: string;
  sideImage1: IndigoImage;
  sideImage2: IndigoImage;
}

export interface IndigoHomepage {
  title: string;
  hero: IndigoHero;
  intro: IndigoIntro;
}

export interface IndigoTaleHead {
  abstract: string;
  heading1: string;
  heading2: string;
  sideImage1: IndigoImage;
  sideImage2: IndigoImage;
  mainImage: IndigoImage;
  cursorImage: IndigoImage;
}

export interface IndigoTaleLookbook {
  abstract: string;
  mainImage: IndigoImage;
  secondaryImage: IndigoImage;
  cursorImage: IndigoImage;
}

export interface IndigoProductOverview {
  title: string;
  price: number;
  mainImage: IndigoImage;
  tags: string[];
}

export interface IndigoProductStory {
  story: string;
  crafting: string;
}

export interface IndigoGalleryItem {
  title: string;
  image: IndigoImage;
  /** Absent on a few items (e.g. Pulse / "DELTA") - render as non-clickable. */
  shopLink?: string;
}

export interface IndigoProductGallery {
  title: string;
  gallery: IndigoGalleryItem[];
}

export interface IndigoTaleOutro {
  abstract: string;
  image: IndigoImage;
}

export interface IndigoChapterSounds {
  bg?: { src: string };
  song?: { src: string };
  [key: string]: { src: string } | undefined;
}

export interface IndigoChapter {
  slug: string;
  title: string;
  caption: string;
  cover: IndigoResponsiveImage;
  head: IndigoTaleHead;
  lookbook: IndigoTaleLookbook;
  productOverview: IndigoProductOverview;
  productStory: IndigoProductStory;
  productGallery: IndigoProductGallery;
  outro: IndigoTaleOutro;
  sounds?: IndigoChapterSounds;
}

export interface IndigoContactsModal {
  title: string;
  abstract: string;
  image: IndigoImage;
}

export interface IndigoSiteContent {
  splash: IndigoSplash;
  homepage: IndigoHomepage;
  chapters: IndigoChapter[];
  contactsModal: IndigoContactsModal;
}

/** Which curtains.js shader program a WebGL plane uses. */
export type IndigoShaderProgram =
  | "plane-deformation"
  | "mouse-ripple"
  | "transition-ripple";
