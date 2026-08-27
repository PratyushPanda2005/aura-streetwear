import { TaleCover } from "./TaleCover";
import { TaleHead } from "./TaleHead";
import { TaleLookbook } from "./TaleLookbook";
import { TaleProductOverview } from "./TaleProductOverview";
import { TaleProductStory } from "./TaleProductStory";
import { TaleProductGallery } from "./TaleProductGallery";
import { TaleOutro } from "./TaleOutro";
import type { IndigoChapter } from "@/types/indigo";

const ORDINALS = ["first", "second", "third", "fourth", "fifth"] as const;

/**
 * One tale chapter — composes the seven sub-sections in flow order. The section
 * carries `id={chapter.slug}` so the hero index anchors (`#rhythm`, ...) resolve
 * here, and it must not clip overflow so `TaleCover`'s sticky pin works.
 */
export function TaleChapter({
  chapter,
  index,
}: {
  chapter: IndigoChapter;
  index: number;
}) {
  return (
    <section id={chapter.slug} className="relative w-full">
      <TaleCover chapter={chapter} />
      <TaleHead head={chapter.head} ordinal={ORDINALS[index] ?? "first"} />
      <TaleLookbook lookbook={chapter.lookbook} />
      <TaleProductOverview overview={chapter.productOverview} />
      <TaleProductStory story={chapter.productStory} caption={chapter.caption} />
      <TaleProductGallery gallery={chapter.productGallery} />
      <TaleOutro outro={chapter.outro} />
    </section>
  );
}
