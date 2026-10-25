/**
 * Each artist's portrait, from their page on ekchitra.com, keyed by the v6
 * artist slug (see paths.ts). Sizes vary (377px to 3734px); several are
 * small, so they're shown no larger than a quarter of the page.
 */
const DIR = "/sites/ekchitra-redesign/artists/portraits";

export const PORTRAITS: Record<string, string> = {
  "anupama-choudhary": `${DIR}/anupama-choudhary.jpg`,
  "ashok-juttu": `${DIR}/ashok-juttu.jpg`,
  "chandrapal-panjre": `${DIR}/chandrapal-panjre.jpg`,
  "charanjeet-singh": `${DIR}/charanjeet-singh.jpg`,
  "dilip-kumar": `${DIR}/dilip-kumar.jpg`,
  "farhad-hussain": `${DIR}/farhad-hussain.png`,
  "kolipitchai-prabhakar": `${DIR}/kolipitchai-prabhakar.jpg`,
  "manish-sharma": `${DIR}/manish-sharma.jpg`,
  "parul-kaur": `${DIR}/parul-kaur.jpg`,
  "rahul-gunjan": `${DIR}/rahul-gunjan.jpg`,
  "rajesh-naik": `${DIR}/rajesh-naik.jpg`,
  "sarvanan-parasuraman": `${DIR}/sarvanan-parasuraman.jpg`,
  "selva-kumar": `${DIR}/selva-kumar.jpg`,
  "subodh-kerkar": `${DIR}/subodh-kerkar.jpg`,
  "vinod-daroz": `${DIR}/vinod-daroz.jpg`,
};
