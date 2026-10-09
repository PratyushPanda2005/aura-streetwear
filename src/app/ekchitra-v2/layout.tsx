import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "../ekchitra-redesign/ekchitra.css";

// Typefaces of this version, scoped to this route: a display serif for headings
// and statements, and a sans for everything else.
const display = Instrument_Serif({
  variable: "--font-ek-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-ek-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function EkchitraV2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`ekchitra-site ${display.variable} ${sans.variable}`}>
      {children}
    </div>
  );
}
