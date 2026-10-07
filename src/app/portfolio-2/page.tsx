import type { Metadata } from "next";
import { HorizontalScene } from "@/components/sites/carriere-scene/HorizontalScene";

export const metadata: Metadata = {
  title: "Vibrer Scène — Carrières de la scène indé",
  description:
    "Les métiers et formations qui font briller la scène indépendante d'ici.",
};

export default function Portfolio2Page() {
  return <HorizontalScene />;
}
