// Content extracted verbatim from decathlonyestalgia.com/fr — product names,
// prices, colour variants and shop links.

export const ASSET_BASE = "/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53";
export const IMG = `${ASSET_BASE}/images`;
export const VID = `${ASSET_BASE}/videos`;
export const SHAPES = `${ASSET_BASE}/shapes`;

export type Media =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string };

export interface Product {
  index: string; // "01".."13"
  name: string;
  price: string; // "20 €"
  href: string;
  media: Media[]; // one per colour variant (image or looping video)
  colors: string[]; // hex swatch dots
}

const SHOP = "https://www.decathlon.fr/p/*/_/R-";

export const products: Product[] = [
  {
    index: "01",
    name: "Graphic T-Shirt",
    price: "20 €",
    href: `${SHOP}p-379166?mc=8993674?opeco=opeco:__drop-yestelgia_p5&type=opeco`,
    media: [
      { kind: "image", src: `${IMG}/p-graphic-tee-rose.jpg` },
      { kind: "image", src: `${IMG}/p-graphic-tee-blanc.jpg` },
    ],
    colors: ["#eaa0cd", "#f1f3ed"],
  },
  {
    index: "02",
    name: "OG2K",
    price: "45 €",
    href: `${SHOP}p-379394?mc=8994345?opeco=opeco:__drop-yestelgia_p15&type=opeco`,
    media: [
      { kind: "image", src: `${IMG}/p-og2k-violet.jpg` },
      { kind: "video", src: `${VID}/og2k-green.mp4` },
    ],
    colors: ["#8f7fc4", "#00966e"],
  },
  {
    index: "03",
    name: "Tracksuit Jacket",
    price: "35 €",
    href: `${SHOP}p-382689?mc=9007209?opeco=opeco:__drop-yestelgia_p1&type=opeco`,
    media: [
      { kind: "video", src: `${VID}/jacket.mp4` },
      { kind: "image", src: `${IMG}/p-jacket-gris.jpg` },
    ],
    colors: ["#8f7fc4", "#b9bcc1"],
  },
  {
    index: "04",
    name: "Graphic Crewneck",
    price: "30 €",
    href: `${SHOP}p-379346?mc=8994349?opeco=opeco:__drop-yestelgia_p7&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-crewneck-gris.jpg` }],
    colors: ["#b9bcc1"],
  },
  {
    index: "05",
    name: "Tracksuit Pant",
    price: "30 €",
    href: `${SHOP}p-382770?mc=9009453?opeco=opeco:__drop-yestelgia_p3&type=opeco`,
    media: [
      { kind: "image", src: `${IMG}/p-pant-violet.jpg` },
      { kind: "image", src: `${IMG}/p-pant-gris.jpg` },
    ],
    colors: ["#8f7fc4", "#b9bcc1"],
  },
  {
    index: "06",
    name: "T-Shirt Ringer",
    price: "15 €",
    href: `${SHOP}p-379218?mc=8993678?opeco=opeco:__drop-yestelgia_p8&type=opeco`,
    media: [
      { kind: "image", src: `${IMG}/p-crop-violet.jpg` },
      { kind: "image", src: `${IMG}/p-crop-blanc.jpg` },
    ],
    colors: ["#8f7fc4", "#f1f3ed"],
  },
  {
    index: "07",
    name: "Legging Flared",
    price: "25 €",
    href: `${SHOP}p-379298?mc=8994343?opeco=opeco:__drop-yestelgia_p10&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-legging-rose.jpg` }],
    colors: ["#eaa0cd"],
  },
  {
    index: "08",
    name: "Bag",
    price: "30 €",
    href: `${SHOP}p-379167?mc=8993680?opeco=opeco:__drop-yestelgia_p12&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-bag.jpg` }],
    colors: ["#00966e", "#eaa0cd"],
  },
  {
    index: "09",
    name: "Short",
    price: "18 €",
    href: `${SHOP}p-379400?mc=8994344?opeco=opeco:__drop-yestelgia_p11&type=opeco`,
    media: [{ kind: "video", src: `${VID}/short.mp4` }],
    colors: ["#00966e"],
  },
  {
    index: "10",
    name: "Sunglasses",
    price: "20 €",
    href: `${SHOP}p-383425?mc=9010787?opeco=opeco:__drop-yestelgia_p13&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-sunglasses.jpg` }],
    colors: ["#f1f3ed", "#f09341"],
  },
  {
    index: "11",
    name: "Cap",
    price: "12 €",
    href: `${SHOP}p-379366?mc=8994571?opeco=opeco:__drop-yestelgia_p14&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-cap.jpg` }],
    colors: ["#f1f3ed", "#00966e"],
  },
  {
    index: "12",
    name: "Roller",
    price: "90 €",
    href: `${SHOP}p-384500?mc=9017621?opeco=opeco:__drop-yestelgia_p17&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-roller.jpg` }],
    colors: ["#8f7fc4"],
  },
  {
    index: "13",
    name: "Socks",
    price: "15 €",
    href: `${SHOP}p-379404?mc=9006246?opeco=opeco:__drop-yestelgia_p18&type=opeco`,
    media: [{ kind: "image", src: `${IMG}/p-socks.jpg` }],
    colors: ["#f1f3ed", "#00966e"],
  },
];

export interface FamilyMember {
  name: string;
  video: string;
  card: string; // frame colour svg
}

export const family: FamilyMember[] = [
  { name: "The grandparents", video: `${VID}/famille-grands-parents.mp4`, card: `${SHAPES}/famcard-green.svg` },
  { name: "The daughter", video: `${VID}/famille-fille.mp4`, card: `${SHAPES}/famcard-pink.svg` },
  { name: "The son", video: `${VID}/famille-fils.mp4`, card: `${SHAPES}/famcard-purple.svg` },
  { name: "The mother", video: `${VID}/famille-roller.mp4`, card: `${SHAPES}/famcard-orange.svg` },
  { name: "The father", video: `${VID}/famille-pere.mp4`, card: `${SHAPES}/famcard-green.svg` },
];

export const langOptions = [
  { code: "FR", href: "https://decathlonyestalgia.com/fr/" },
  { code: "EN", href: "https://decathlonyestalgia.com/en/" },
  { code: "IT", href: "https://decathlonyestalgia.com/it/" },
  { code: "ES", href: "https://decathlonyestalgia.com/es/" },
  { code: "DE", href: "https://decathlonyestalgia.com/de/" },
  { code: "BE-NL", href: "https://decathlonyestalgia.com/be-nl/" },
  { code: "BE-FR", href: "https://decathlonyestalgia.com/be-fr/" },
];

export const SHOP_URL =
  "https://www.decathlon.fr/sportswear/decathlon-yestalgia?opeco=opeco:__drop-yestalgia&type=opeco";
