import { DM_Sans } from "next/font/google";
import "./v5.css";

// Same brand typeface and design tokens as v5: DM Sans, regular weight.
const sans = DM_Sans({
  variable: "--font-ek5-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Rebuild the pages hourly, so each exhibition's Upcoming / Ongoing / Past
 * follows the calendar (statusOf in exhibitions-home/shared).
 */
export const revalidate = 3600;

export default function EkchitraV6Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`ek5 ${sans.variable}`}>{children}</div>;
}
