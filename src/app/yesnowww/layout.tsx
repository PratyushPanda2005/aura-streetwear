import type { Metadata } from "next";
import { Chakra_Petch, Fraunces } from "next/font/google";
import "./yesnow.css";

// Chakra Petch 300 is the source site's UI face; Fraunces stands in for its
// (commercial) display face inside the emblem.
const chakraPetch = Chakra_Petch({
  variable: "--font-yn-sans",
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-yn-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curtain hero — scroll study",
  description:
    "A scroll-driven curtain entry and framed hero tableau, rebuilt with GSAP ScrollTrigger and Lenis.",
};

export default function YesNowLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${chakraPetch.variable} ${fraunces.variable} yesnow-site w-full`}>
      {children}
    </div>
  );
}
