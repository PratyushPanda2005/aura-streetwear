// Downloads all assets from https://www.ekchitra.com/ (homepage) into ./ekchitra-assets/
// Wix images are fetched as full-resolution originals (transform suffix stripped).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.argv[2] ?? "ekchitra-assets");
const W = "https://static.wixstatic.com/media/";

// [folder, filename, sourceUrl, note]
const assets = [
  // Brand
  ["brand", "ekchitra-logo-black.png", W + "37b6d4_2ff4a44bf5be4423a531ff1eedc9cc93~mv2.png", "Header logo"],
  ["brand", "favicon.ico", "https://static.wixstatic.com/ficons/8de284_b5162eb5436740c48987aae7f10093a3~mv2.ico", "Favicon"],

  // Hero / banners / gallery
  ["images", "hero-hydart-2025-show-banner.jpg", W + "8de284_cd9cf7b7c78f4ceb9e5492276c4564da~mv2.jpg", "Hero slide: hydart 2025 Show Banner"],
  ["images", "hero-dsc01932.jpg", W + "ae9d87_36b182362796436d95ff63ab27d8b9a7~mv2.jpg", "Hero slide: DSC01932"],
  ["images", "hero-newindianexpress-2025-12-05.avif", W + "ae9d87_5ccef4d15a51442d900bbdf5fcd8173c~mv2.avif", "Hero slide: New Indian Express press photo"],
  ["images", "gallery-space-hyderabad.webp", W + "ae9d87_ebe70417ba424990bae8efe581ffe3d9~mv2.webp", "Ekchitra art gallery | Hyderabad"],

  // Exhibitions / events
  ["exhibitions", "hyd-art-2025.jpg", W + "8de284_6591d384bbdd43beae9f39c255f7fde7~mv2.jpg", "HYD ART | 2025"],
  ["exhibitions", "swadhatri-2025.jpg", W + "8de284_9c85a12368514fac86e819fe2f2ddd78~mv2.jpg", "SWADHATRI | 2025"],
  ["exhibitions", "living-temple-2025.jpg", W + "8de284_a52bfafb954d47b3a3994d14d107d2bc~mv2.jpg", "LIVING TEMPLE | 2025"],
  ["exhibitions", "living-temple-2026.jpg", W + "ae9d87_1b6d9e13719a4861854e70131e4876ee~mv2.jpg", "Living Temple 2026"],
  ["exhibitions", "hyd-art-logo.png", W + "ae9d87_a5a8f8e3af324f95b81a59aa758edbf4~mv2.png", "Hyd Art wordmark"],

  // Artworks (title | artist)
  ["artworks", "arthanareeswara--anupama-choudhary.png", W + "8de284_08c8d713fc6b4721bf4f3241e3a9aefb~mv2.png", "Arthanareeswara | Anupama Choudhary"],
  ["artworks", "untitled-1--ashok-juttu.png", W + "8de284_16b7dc9c70fe457499f3ff4082ede2d0~mv2.png", "Untitled - 1 | Ashok Juttu"],
  ["artworks", "untitled-1--chandrapal-panjre.png", W + "8de284_5a59598dee3042248773d0edeb1f5b42~mv2.png", "Untitled - 1 | Chandrapal Panjre"],
  ["artworks", "untitled-2--charanjeet-singh.png", W + "8de284_cd750421c1834049a8c409eb397e1c76~mv2.png", "Untitled - 2 | Charanjeet Singh"],
  ["artworks", "paths-1--dilip-kumar.png", W + "8de284_8ab042a38ea54bec8e28d42b3c7deb11~mv2.png", "Paths - 1 | Dilip Kumar"],
  ["artworks", "harmony-of-nature-and-mind--farhad-hussain.png", W + "8de284_b514e036af0b426c9a4af5637b45484c~mv2.png", "Harmony of Nature and Mind | Farhad Hussain"],
  ["artworks", "vernacular-house-2--kolipitchai-prabhakar.png", W + "8de284_520e2488e6064e009903458b7b17ebab~mv2.png", "Vernacular House | Kolipitchai Prabhakar"],
  ["artworks", "sites-of-remembering--manish-sharma.png", W + "8de284_7e1c01837bab4a31aba694a06abc0b0b~mv2.png", "Sites of Remembering | Manish Sharma"],
  ["artworks", "between-presence-and-absence-3--parul-kaur.png", W + "8de284_cf65c9a371de46fe8383d7d5911ddeee~mv2.png", "Between Presence and Absence 3 | Parul Kaur"],
  ["artworks", "finding-my-ground--rahul-and-gunjan.png", W + "8de284_9af886df80cd4094bae708342db02a1a~mv2.png", "Finding My Ground | Rahul & Gunjan"],
  ["artworks", "meri-maa-ki-dua--rajesh-naik.png", W + "8de284_0e0561efc2444f97a48825609ccc5fea~mv2.png", "Meri Maa Ki Dua | Rajesh Naik"],
  ["artworks", "modified-continuity--sarvanan-parasuraman.png", W + "8de284_8935754a03b34f2687a1d38f8468ecbd~mv2.png", "Modified Continuity | Sarvanan Parasuraman"],
  ["artworks", "embrace-of-light--selvakumar.png", W + "8de284_d6957eee25c54c93b078e9a80c5225fd~mv2.png", "Embrace of Light | SelvaKumar"],
  ["artworks", "head-1--subodh-kerkar.png", W + "8de284_e9fae437e2d947c2af5ad07b0d152de4~mv2.png", "Head 1 | Subodh Kerkar"],
  ["artworks", "sanctum-aikyam--vinod-daroz.png", W + "8de284_5de296dd10524fbaa0ed6c023bace99c~mv2.png", "Sanctum (From the series of Aikyam) | Vinod Daroz"],

  // Artist portraits
  ["artists", "anupama-choudary.jpg", W + "8de284_ee9203fe4bea4b5c8b903ae9f06d075f~mv2.jpg", "Anupama Choudary"],
  ["artists", "ashok-juttu.jpg", W + "ae9d87_eece866b76b94b5699b09ee25dc92256~mv2.jpg", "Ashok Juttu"],
  ["artists", "chandrapal-panjre.jpg", W + "8de284_ee6b078b5aec4094abd8882a6eb98069~mv2.jpg", "Chandrapal Panjre"],
  ["artists", "charanjeet-singh.jpg", W + "8de284_a1b275a7e0e443a5aaf5c0eb04712243~mv2.jpg", "Charanjeet Singh"],
  ["artists", "dilip-kumar.jpg", W + "8de284_19c9b980d4984f76b6f160d4da93939d~mv2.jpg", "Dilip Kumar"],
  ["artists", "farhad-hussain.png", W + "8de284_0aa7d29f929d47bba1ea7dbc43be90d8~mv2.png", "Farhad Hussain"],
  ["artists", "kolipitchai-prabhakar.jpg", W + "8de284_278fdd6fdb2041309398ceb54b3f2510~mv2.jpg", "Kolipitchai Prabhakar"],
  ["artists", "manish-sharma.jpg", W + "8de284_252f0f109c3e4b528bb0a5f27d61fc4c~mv2.jpg", "Manish Sharma"],

  // Icons
  ["icons", "instagram.png", W + "11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png", "Instagram social icon"],
  ["icons", "whatsapp.svg", "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", "WhatsApp floating button"],
  ["icons", "wix-shape-1d3a0b.svg", "https://static.wixstatic.com/shapes/1d3a0b_97d72ad4c8dc4903bfb02b2baa7763ae.svg", "Decorative shape SVG"],

  // Fonts
  ["fonts", "clear-sans-thin.woff2", "https://static.wixstatic.com/ufonts/08a6aa_eddba56762964185a3fea213a8458d38/woff2/file.woff2", "Clear Sans Thin (custom upload)"],
  ["fonts", "louis-george-cafe-light.woff2", "https://static.wixstatic.com/ufonts/9dd8d0_7be2b0a114e449beb470ff0097036c95/woff2/file.woff2", "Louis George Cafe Light (custom upload)"],
  ["fonts", "madefor-text.var.woff2", "https://static.parastorage.com/fonts/v2/f73e760d-c6b3-4659-9a8c-9ce1d76c1173/madefor-text.var.original.woff2", "Wix Madefor Text (variable)"],
];

// Inline SVGs extracted from the DOM
const inlineSvgs = {
  "chevron-left.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12"><path d="M0 6L5.2 0 6 .7 1.3 6 6 11.3 5.2 12z"/></svg>`,
  "chevron-right.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12"><path d="M6 6L.8 0 0 .7 4.7 6 0 11.3l.8.7z"/></svg>`,
  "hamburger.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30" width="40" height="30"><path d="M40 2.903H0V0h40zm0 13.549H0v-2.904h40zM40 30H0v-2.903h40z" fill-rule="evenodd"/></svg>`,
  "send-arrow.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M169.996 34.048c.001-.064-.001-.128-.003-.192a4.05 4.05 0 0 0-.05-.527c-.009-.057-.015-.114-.027-.171a3.921 3.921 0 0 0-.191-.643c-.02-.05-.046-.097-.068-.147a3.889 3.889 0 0 0-.366-.656 3.941 3.941 0 0 0-.451-.552 3.925 3.925 0 0 0-.727-.563 3.988 3.988 0 0 0-.48-.252c-.05-.022-.098-.049-.149-.069a3.995 3.995 0 0 0-.641-.19c-.058-.012-.117-.018-.175-.027a3.975 3.975 0 0 0-.522-.05c-.065-.002-.13-.004-.195-.003a3.948 3.948 0 0 0-.648.062l-.036.004a3.835 3.835 0 0 0-.548.149L32.656 76.441a3.973 3.973 0 0 0-.302 7.378l58.033 25.792 25.793 58.033a3.97 3.97 0 0 0 3.792 2.356 3.971 3.971 0 0 0 3.587-2.656L169.78 35.28c.063-.181.113-.364.149-.549l.004-.033c.041-.216.059-.433.063-.65zm-19.08 9.419-58.399 58.399-47.78-21.236 106.179-37.163zM119.37 155.264l-21.237-47.781 58.4-58.4-37.163 106.181z"/></svg>`,
  "close-thick.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="65.35 65.35 69.3 69.3"><path d="M134.65 128.99L105.66 100l28.99-28.99-5.66-5.66L100 94.34 71.01 65.35l-5.66 5.66L94.34 100l-28.99 28.99 5.66 5.66L100 105.66l28.99 28.99 5.66-5.66z"/></svg>`,
  "close-thin.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M.293.293a1 1 0 0 1 1.414 0L16 14.586 30.293.293a1 1 0 1 1 1.414 1.414L17.414 16l14.293 14.293a1 1 0 0 1-1.414 1.414L16 17.414 1.707 31.707a1 1 0 0 1-1.414-1.414L14.586 16 .293 1.707a1 1 0 0 1 0-1.414" fill-rule="evenodd"/></svg>`,
  "document.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5h-13C4.67 20 4 19.33 4 18.5v-13Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 9h8M8 12h8M8 15h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  "scroll-down-cue.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="59.071 20 803.396 160"><g fill="#0C0B0B"><path d="m67.077 180-8.006-7.388 67.018-72.607-67.018-72.606L67.077 20l73.852 80.005L67.077 180z"/><path d="M344.595 180c-22.056 0-40-17.944-40-40V60c0-22.056 17.944-39.999 40-39.999s40 17.943 40 39.999v80c0 22.056-17.943 40-40 40zm0-158.4c-21.174 0-38.4 17.226-38.4 38.399v80c0 21.174 17.227 38.4 38.4 38.4 21.174 0 38.4-17.227 38.4-38.4v-80c0-21.173-17.226-38.399-38.4-38.399z"/><path d="M586.127 180c-24.207 0-43.902-19.695-43.902-43.902V63.902C542.225 39.694 561.92 20 586.127 20s43.902 19.694 43.902 43.902v72.195c0 24.208-19.695 43.903-43.902 43.903zm0-158.049c-23.133 0-41.951 18.82-41.951 41.951v72.195c0 23.133 18.819 41.951 41.951 41.951 23.133 0 41.951-18.819 41.951-41.951V63.902c0-23.131-18.819-41.951-41.951-41.951z"/><path d="M585.436 125.953a.976.976 0 0 0 1.38 0l6.209-6.209a.976.976 0 0 0-1.38-1.38l-5.519 5.519-5.519-5.519a.976.976 0 0 0-1.38 1.38l6.209 6.209zm-.286-51.216v50.526h1.951V74.737h-1.951z"/><path d="M842.467 30a10.003 10.003 0 0 1 10 10v120a10.003 10.003 0 0 1-10 10h-60a10.001 10.001 0 0 1-10-10V40a10.001 10.001 0 0 1 10-10h60zm-60-10a20 20 0 0 0-20 20v120a19.998 19.998 0 0 0 20 20h60a19.998 19.998 0 0 0 20-20V40a20 20 0 0 0-20-20h-60z"/><path d="M812.467 160a10.003 10.003 0 0 0 10-10 10.003 10.003 0 0 0-10-10 10.001 10.001 0 0 0 0 20z"/></g></svg>`,
};

async function fetchOne([dir, name, url]) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.ekchitra.com/" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.join(OUT, dir), { recursive: true });
  await writeFile(path.join(OUT, dir, name), buf);
  return buf.length;
}

const results = [];
for (let i = 0; i < assets.length; i += 4) {
  const batch = assets.slice(i, i + 4);
  const settled = await Promise.allSettled(batch.map(fetchOne));
  settled.forEach((r, j) => {
    const [dir, name, url, note] = batch[j];
    const ok = r.status === "fulfilled";
    results.push({ path: `${dir}/${name}`, url, note, ok, bytes: ok ? r.value : 0, error: ok ? undefined : String(r.reason) });
    console.log(`${ok ? "✓" : "✗"} ${dir}/${name}${ok ? ` (${(r.value / 1024).toFixed(0)} KB)` : ` — ${r.reason}`}`);
  });
}

await mkdir(path.join(OUT, "svg"), { recursive: true });
for (const [name, svg] of Object.entries(inlineSvgs)) {
  await writeFile(path.join(OUT, "svg", name), svg + "\n");
  results.push({ path: `svg/${name}`, url: "inline DOM", note: "Inline SVG", ok: true });
}

await writeFile(path.join(OUT, "manifest.json"), JSON.stringify({ source: "https://www.ekchitra.com/", downloadedAt: new Date().toISOString(), assets: results }, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\nDone: ${results.length - failed.length}/${results.length} saved to ${OUT}`);
if (failed.length) process.exitCode = 1;
