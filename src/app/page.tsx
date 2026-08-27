import { CurtainsProvider } from "@/components/sites/indigo-laboratory-it-f84b5a72/shared/CurtainsProvider";
import { SmoothScrollProvider } from "@/components/sites/indigo-laboratory-it-f84b5a72/shared/SmoothScrollProvider";
import { TheHeader } from "@/components/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/TheHeader";
import { HeroSection } from "@/components/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/HeroSection";
import { IntroSection } from "@/components/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/IntroSection";
import { TaleChapter } from "@/components/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/TaleChapter";
import { indigoContent } from "@/lib/sites/indigo-laboratory-it-f84b5a72/root-8a5edab2/content";

export default function Home() {
  const { homepage, chapters } = indigoContent;

  return (
    <div className="indigo-site relative w-full overflow-x-hidden">
      <SmoothScrollProvider>
        <CurtainsProvider>
          <TheHeader />
          <main>
            <HeroSection hero={homepage.hero} chapters={chapters} />
            <IntroSection intro={homepage.intro} />
            {/* Scope: built through the first tale (Rhythm) only. */}
            <TaleChapter chapter={chapters[0]} index={0} />
          </main>
        </CurtainsProvider>
      </SmoothScrollProvider>
    </div>
  );
}
