import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/sites/lumora-studio/footer/Footer";

const brandFont = Space_Grotesk({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumora — Footer",
  description: "Studio footer with an interactive ASCII wordmark that reacts to hover, scroll and click.",
};

export default function LumoraFooterPage() {
  return (
    <main className={brandFont.variable} style={{ background: "black", minHeight: "100vh" }}>
      {/* Spacer so the footer scrolls into view and the wordmark's reveal animation fires. */}
      <section
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffffa3",
          fontFamily: "Menlo, Monaco, monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Scroll down — hover the wordmark, click to interact
      </section>
      <Footer />
    </main>
  );
}
