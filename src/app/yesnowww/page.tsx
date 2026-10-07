import { CurtainHero } from "@/components/sites/yesnowww-com-244340f9/root-8a5edab2/CurtainHero";

export default function YesNowPage() {
  return (
    <main className="relative w-full">
      {/* Scope: entry (curtain) + hero only. */}
      <CurtainHero />
      {/* Stand-in for the next section: one viewport of scroll so the timeline's last vh (hero fade, comet exit) is reachable. */}
      <div aria-hidden="true" className="h-screen w-full bg-black" />
    </main>
  );
}
