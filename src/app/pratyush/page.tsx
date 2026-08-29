import type { Metadata } from "next";
import { ScrollTransition } from "@/components/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/ScrollTransition";

export const metadata: Metadata = {
  title: "Pixel Panda — Pratyush Panda, Creative Developer",
  description:
    "Portfolio of Pratyush Panda (Pixel Panda), a creative developer based in India — featuring a WebGL water-splash ripple reveal hero.",
};

export default function PratyushPage() {
  return (
    <main className="bg-black">
      <ScrollTransition />
    </main>
  );
}
