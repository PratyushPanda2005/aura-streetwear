import { cn } from "@/lib/utils";

import { FOOTER } from "../../ekchitra-redesign/data";
import { CAPS } from "../../ekchitra-v5/shared";
import { CONTACT, SOCIAL, V6_NAV } from "../data";

export { CONTACT, FOOTER, SOCIAL, V6_NAV };

/** Every footer variation fills one screen. */
export const SCREEN =
  "relative flex h-svh min-h-[640px] flex-col overflow-hidden";

/** Grouped links shared by the variations. */
export const LINK_GROUPS = [
  { title: "Gallery", links: V6_NAV },
  {
    title: "Connect",
    links: SOCIAL.map((link) => ({ ...link, external: true })),
  },
  {
    title: "Visit",
    links: [] as { label: string; href: string }[],
    note: FOOTER.location.note,
  },
];

/** A plain list of links; external ones open in a new tab with an arrow. */
export function LinkList({
  links,
  className,
}: {
  links: { label: string; href: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
            {link.external && <span aria-hidden="true"> ↗</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Small capitals heading over a group of links. */
export function GroupTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={cn(CAPS, "text-[10px]", className)}>{children}</p>;
}

/**
 * The name set as one line across the full width — a text wordmark standing
 * in for the logo. Sized in viewport units so it always spans the page.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "text-[27.6vw] leading-[0.78] font-medium tracking-[-0.065em] whitespace-nowrap",
        className,
      )}
    >
      EkChitra
    </p>
  );
}
