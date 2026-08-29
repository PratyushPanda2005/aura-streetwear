// Asset downloader for decathlonyestalgia.com/fr — site-key decathlonyestalgia-com-2c916833 / page-key fr-bd88bf53
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const BASE = "https://decathlonyestalgia.com";
const OUT = "public/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53";

// [remotePath, localRelativePath]
const ASSETS = [
  // hero / decorative
  ["/wp-content/themes/blueprint/theme/public/images/lines-1440.webp", "images/lines-1440.webp"],
  ["/wp-content/uploads/2026/05/Rectangle-7531-1.jpg", "images/intro-1.jpg"],
  ["/wp-content/uploads/2026/05/Rectangle-7532-1.jpg", "images/intro-2.jpg"],
  // products (jpg)
  ["/wp-content/uploads/2026/04/1%E2%80%94-Graphic-Tee.jpg", "images/p-graphic-tee-rose.jpg"],
  ["/wp-content/uploads/2026/05/1b%E2%80%94-Graphic-Tee.jpg", "images/p-graphic-tee-blanc.jpg"],
  ["/wp-content/uploads/2026/04/2a%E2%80%94-OG2K-%E2%80%94-Bleu-ciel.jpg", "images/p-og2k-violet.jpg"],
  ["/wp-content/uploads/2026/05/3b%E2%80%94-Tracksuit-Jacket-%E2%80%94-Grise.jpg", "images/p-jacket-gris.jpg"],
  ["/wp-content/uploads/2026/05/4%E2%80%94-Graphic-CrewneckFix.jpg", "images/p-crewneck-gris.jpg"],
  ["/wp-content/uploads/2026/05/5a%E2%80%94-Tracksuit-Pant-%E2%80%94-Bleu.jpg", "images/p-pant-violet.jpg"],
  ["/wp-content/uploads/2026/05/5b%E2%80%94-Tracksuit-Pant-%E2%80%94-Gris.jpg", "images/p-pant-gris.jpg"],
  ["/wp-content/uploads/2026/04/6a%E2%80%94-Tee-shirt-crop.jpg", "images/p-crop-violet.jpg"],
  ["/wp-content/uploads/2026/04/6b%E2%80%94-Tee-shirt-crop.jpg", "images/p-crop-blanc.jpg"],
  ["/wp-content/uploads/2026/04/7%E2%80%94-Legging-Flared.jpg", "images/p-legging-rose.jpg"],
  ["/wp-content/uploads/2026/04/8%E2%80%94-Bag.jpg", "images/p-bag.jpg"],
  ["/wp-content/uploads/2026/04/10%E2%80%94-Sunglasses.jpg", "images/p-sunglasses.jpg"],
  ["/wp-content/uploads/2026/04/11%E2%80%94-Cap.jpg", "images/p-cap.jpg"],
  ["/wp-content/uploads/2026/04/12%E2%80%94-Roller.jpg", "images/p-roller.jpg"],
  ["/wp-content/uploads/2026/05/13%E2%80%94-Socks.jpg", "images/p-socks.jpg"],
  // artist / og2k
  ["/wp-content/uploads/2026/05/dalkhafine-artist.png.webp", "images/dalkhafine-artist.webp"],
  ["/wp-content/uploads/2026/05/og2k.svg", "images/og2k-logo.svg"],
  ["/wp-content/uploads/2026/05/OG2K-Replacment.jpg", "images/og2k-replacement.jpg"],
  ["/wp-content/uploads/2026/05/Outline-White.jpg", "images/og2k-outline-white.jpg"],
  ["/wp-content/uploads/2026/05/shoe.jpg", "images/og2k-shoe.jpg"],
  ["/wp-content/uploads/2026/05/og2kvisual-2.jpg", "images/og2k-visual-2.jpg"],
  ["/wp-content/uploads/2026/05/yestalgia.jpg", "images/yestalgia-footer.jpg"],
  // favicons
  ["/wp-content/themes/blueprint/theme/public/favicons/favicon-96x96.png", "favicons/favicon-96x96.png"],
  ["/wp-content/themes/blueprint/theme/public/favicons/favicon.svg", "favicons/favicon.svg"],
  ["/wp-content/themes/blueprint/theme/public/favicons/favicon.ico", "favicons/favicon.ico"],
  ["/wp-content/themes/blueprint/theme/public/favicons/apple-touch-icon.png", "favicons/apple-touch-icon.png"],
  // videos
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-MASTER-16-9.mp4", "videos/hero-master-16-9.mp4"],
  ["/wp-content/uploads/2026/05/OG2K-Green-2.mp4", "videos/og2k-green.mp4"],
  ["/wp-content/uploads/2026/05/Jacket.mp4", "videos/jacket.mp4"],
  ["/wp-content/uploads/2026/05/Short.mp4", "videos/short.mp4"],
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-VIEUX-9-16-.mp4", "videos/famille-grands-parents.mp4"],
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-FILLE-9-16.mp4", "videos/famille-fille.mp4"],
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-GAMER-9-16.mp4", "videos/famille-fils.mp4"],
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-ROLLER-9-16.mp4", "videos/famille-roller.mp4"],
  ["/wp-content/uploads/2026/05/VDEF-FR-%E2%80%94-DARON-9-16.mp4", "videos/famille-pere.mp4"],
];

async function dl([remote, local]) {
  const url = BASE + remote;
  const dest = `${OUT}/${local}`;
  if (existsSync(dest)) return `skip ${local}`;
  await mkdir(dest.split("/").slice(0, -1).join("/"), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) return `FAIL ${res.status} ${local} <- ${url}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return `ok ${local} (${(buf.length / 1024).toFixed(0)}kb)`;
}

async function run() {
  for (let i = 0; i < ASSETS.length; i += 4) {
    const batch = ASSETS.slice(i, i + 4);
    const results = await Promise.all(batch.map(dl));
    results.forEach((r) => console.log(r));
  }
  console.log("done");
}
run();
