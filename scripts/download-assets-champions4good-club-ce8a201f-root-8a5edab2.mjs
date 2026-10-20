// Downloads the "Finally / No boring networking" section assets (Lottie JSON + sticker SVGs).
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const CDN = "https://cdn.prod.website-files.com/68d958ba50e5b8ce718345d4/";
const OUT = "public/sites/champions4good-club-ce8a201f/root-8a5edab2";
const assets = [
  ["lottie/volleyball-desktop.json", "699cbf57a3baf554905772e8_volleyball_desktop.json"],
  ["lottie/horse.json", "69b860a75dc06d6daafcd1ba_horse.json"],
  ["lottie/horse-mobile.json", "69b1e768a04dcf41aacfa94b_horse_mobile.json"],
  ["stickers/purple-1.svg", "697ce693d8a479dedfed0022_purple-sticker-01.svg"],
  ["stickers/purple-2.svg", "697ce69093b28088106fe3e8_pink-three-circle-sticker.svg"],
  ["stickers/purple-3.svg", "697ce690a0f2466325bac831_dark-purple-sticker.svg"],
  ["stickers/green-1.svg", "697cdf9ff4eeb0e43c792091_blue-sticker-01.svg"],
  ["stickers/green-2.svg", "697cdf9fd93512fce94a121d_light-green-sticker.svg"],
  ["stickers/yellow-1.svg", "697ce9e5e0dcd643f21f0278_yellow-sticker-01.svg"],
  ["stickers/yellow-2.svg", "697ce9e505089fdd1be80650_dark-brown-sitcker.svg"],
];

async function download([dest, file]) {
  const res = await fetch(CDN + file);
  if (!res.ok) throw new Error(`${res.status} ${file}`);
  const target = path.join(OUT, dest);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log("ok", dest);
}

for (let i = 0; i < assets.length; i += 4) {
  const results = await Promise.allSettled(assets.slice(i, i + 4).map(download));
  results.filter((r) => r.status === "rejected").forEach((r) => console.error("FAIL", r.reason.message));
}
