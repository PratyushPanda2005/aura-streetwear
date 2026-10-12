import { DM_Sans } from "next/font/google";
import "./v5.css";

// Brand typeface, scoped to this route: DM Sans sets everything, at regular weight.
const sans = DM_Sans({
  variable: "--font-ek5-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function EkchitraV5Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`ek5 ${sans.variable}`}>{children}</div>;
}
