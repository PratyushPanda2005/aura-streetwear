import { cn } from "@/lib/utils";

/**
 * Thin band of the four brand colours, used as a divider between sections —
 * the one decorative motif of the site.
 */
export function BrandStripe({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid h-[6px] grid-cols-4", className)}
    >
      <span className="bg-(--ek-red)" />
      <span className="bg-(--ek-maroon)" />
      <span className="bg-(--ek-sky)" />
      <span className="bg-(--ek-navy)" />
    </div>
  );
}
