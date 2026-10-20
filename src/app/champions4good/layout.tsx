import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import "./c4g.css";

// Druk Condensed Super (the source face) is a commercial font, so it is not
// bundled; League Gothic (closest free match in width and cap height) stands in.
const display = League_Gothic({
  variable: "--font-c4g-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finally — No boring networking",
};

export default function Champions4GoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`c4g ${display.variable}`}>{children}</div>;
}
