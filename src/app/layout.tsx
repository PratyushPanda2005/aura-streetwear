import type { Metadata } from "next";
import "./globals.css";

// Each route loads its own typefaces (see ekchitra-v6/layout.tsx, pratik/page.tsx).
export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
