import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Palette_Mosaic } from "next/font/google";
import "./globals.css";

// Type scale of indigo-laboratory.it: Hanken Grotesk for everything, IBM Plex Mono
// for labels/captions, Palette Mosaic for the display logotype.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const paletteMosaic = Palette_Mosaic({
  variable: "--font-mosaic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-label.example.com"),
  title: "5 drops of the season — AURA",
  description:
    "AURA is a streetwear label built on sound — five drops turning noise, movement and street culture into clothing.",
  openGraph: {
    title: "5 drops of the season — AURA",
    description:
      "AURA is a streetwear label built on sound — five drops turning noise, movement and street culture into clothing.",
    url: "https://aura-label.example.com",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/favicon.svg", type: "image/svg+xml" },
      { url: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${hankenGrotesk.variable} ${ibmPlexMono.variable} ${paletteMosaic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
