import { NoBoringSection } from "@/components/sites/champions4good-club-ce8a201f/root-8a5edab2/NoBoringSection";
import { SmoothScroll } from "@/components/sites/champions4good-club-ce8a201f/root-8a5edab2/SmoothScroll";

export default function Champions4GoodPage() {
  return (
    <main className="relative w-full">
      <SmoothScroll />
      {/* Scope: section 2 only. Stand-in for the purple hero so the scene's
          scroll progress starts where it does on the source (section enters
          from the bottom of the viewport). */}
      <div aria-hidden="true" className="c4g-standin is-hero" />
      <NoBoringSection />
      {/* Stand-in for the following (off-white) video section. */}
      <div aria-hidden="true" className="c4g-standin" />
    </main>
  );
}
