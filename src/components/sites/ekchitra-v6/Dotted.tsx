import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A picture that can be shown as a halftone (see .ek6-dots in v5.css) which
 * clears when its `group` is hovered or focused. The picture is drawn twice:
 * clear underneath, dotted on top, and only the top copy's opacity changes —
 * so the whole picture clears evenly at once, instead of the dots dissolving
 * from its mid-tones outwards as they would if the filter itself were eased.
 * The top copy is hidden from assistive tech. Off, the picture is drawn once.
 * `dark` keeps a dark picture dark under white type.
 */
export function Dotted({
  on = true,
  dark = false,
  className,
  children,
}: {
  on?: boolean;
  dark?: boolean;
  /** Sizes the frame; it fills its parent (`absolute inset-0`) by default. */
  className?: string;
  children: ReactNode;
}) {
  const frame = cn("absolute inset-0", className);
  if (!on) return <div className={frame}>{children}</div>;
  return (
    <div className={frame}>
      {/* Each copy is its own stacking context, so a raised layer inside
          (the carousel's current slide is z-10) stays within its copy
          instead of rising over the dotted one. */}
      <div className="absolute inset-0 isolate">{children}</div>
      <div
        aria-hidden="true"
        className={cn(
          "ek6-dots absolute inset-0 isolate",
          dark && "ek6-dots-dark",
        )}
      >
        {children}
      </div>
    </div>
  );
}
