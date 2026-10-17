import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./v7.css";

// Inter and IBM Plex Mono stand in for the reference's grotesque and its
// monospace companion.
const sans = Inter({
  variable: "--font-e7-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-e7-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function EkchitraV7Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`ek7 ${sans.variable} ${mono.variable}`}>{children}</div>
  );
}
