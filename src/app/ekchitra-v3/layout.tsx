import { Archivo, Newsreader } from "next/font/google";
import "../ekchitra-redesign/ekchitra.css";
import "./v3.css";

// Typefaces of this version, scoped to this route: a grotesque sans with a width
// axis (the extended cut sets the artist names) and a serif for accents.
const sans = Archivo({
  variable: "--font-ek3-sans",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-ek3-serif",
  subsets: ["latin"],
  display: "swap",
});

export default function EkchitraV3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`ekchitra-site ${sans.variable} ${serif.variable}`}>
      {children}
    </div>
  );
}
