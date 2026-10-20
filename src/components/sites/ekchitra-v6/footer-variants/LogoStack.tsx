import { cn } from "@/lib/utils";

/**
 * How faint each copy is, top to bottom: the first in full brand black, the
 * rest receding.
 */
const ROWS = ["text-(--k-ink)", "text-(--k-ink)/35", "text-(--k-ink)/12"];

/**
 * The name set as the logo is drawn — "Ek" heavy, "Chitra" light, both set
 * tight — repeated in a static stack: one copy under another, each fading
 * further, the last cut off by the foot of the page. Each copy spans the
 * full width between the gutters: the name measures 3.21em wide, so the
 * size is the width over 3.22.
 */
export function LogoStack({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "px-4 text-[calc((100vw-32px)/3.22)] leading-[0.8] whitespace-nowrap select-none lg:px-5 lg:text-[calc((100vw-40px)/3.22)]",
        className,
      )}
    >
      {ROWS.map((tone) => (
        <p key={tone} className={tone}>
          <span className="font-extrabold tracking-[-0.06em]">Ek</span>
          <span className="font-light tracking-[-0.045em]">Chitra</span>
        </p>
      ))}
    </div>
  );
}
