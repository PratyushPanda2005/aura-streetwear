import { Marcellus } from "next/font/google";

// Display serif for artist names in the artists carousel. Scoped to this route.
const marcellus = Marcellus({
  variable: "--font-ekchitra-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function EkchitraRedesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`ekchitra-site ${marcellus.variable}`}>{children}</div>
  );
}
