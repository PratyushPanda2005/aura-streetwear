import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/SmoothScrollProvider";
import { SiteNav } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/SiteNav";
import { HeroSection } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/HeroSection";
import { IntroSection } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/IntroSection";
import { ProductGrid } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/ProductGrid";
import { ArtistSection } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/ArtistSection";
import { FamilyCarousel } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/FamilyCarousel";
import { OG2KSection } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/OG2KSection";
import { ProductIndex } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/ProductIndex";
import { SiteFooter } from "@/components/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53/SiteFooter";

const ASSET_BASE = "/sites/decathlonyestalgia-com-2c916833/fr-bd88bf53";

export const metadata: Metadata = {
  title: "Decathlon Yestalgia",
  description:
    "Decathlon Yestalgia — into the heart of the most vibrant decade ever. A capsule collection by Dalkhafine.",
  icons: {
    icon: [
      { url: `${ASSET_BASE}/favicons/favicon.svg`, type: "image/svg+xml" },
      { url: `${ASSET_BASE}/favicons/favicon-96x96.png`, sizes: "96x96", type: "image/png" },
    ],
    apple: `${ASSET_BASE}/favicons/apple-touch-icon.png`,
  },
};

export default function DecathlonYestalgiaFrPage() {
  return (
    <div className="yestalgia-site min-h-svh w-full overflow-x-clip">
      <SmoothScrollProvider>
        <SiteNav />
        <main>
          <HeroSection />
          <IntroSection />
          <ProductGrid />
          <ArtistSection />
          <FamilyCarousel />
          <OG2KSection />
          <ProductIndex />
          <SiteFooter />
        </main>
      </SmoothScrollProvider>
    </div>
  );
}
