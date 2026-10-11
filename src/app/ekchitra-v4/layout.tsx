import {
  Fraunces,
  Instrument_Sans,
  Nothing_You_Could_Do,
} from "next/font/google";
import "./v4.css";

// Typefaces of this version, scoped to this route: a thin high-contrast serif for
// headings, a plain sans for text, and a pen script for the handwritten note.
const serif = Fraunces({
  variable: "--font-ek4-serif",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-ek4-sans",
  subsets: ["latin"],
  display: "swap",
});

const script = Nothing_You_Could_Do({
  variable: "--font-ek4-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function EkchitraV4Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`ek4 ${serif.variable} ${sans.variable} ${script.variable}`}
    >
      {children}
    </div>
  );
}
