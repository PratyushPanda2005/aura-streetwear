import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { SERVICE_LIST } from "../data";

export const SERVICES = SERVICE_LIST;
export type Service = (typeof SERVICE_LIST)[number];

export const pad = (value: number) => String(value).padStart(2, "0");

/** Whether a service's link leaves the site (WhatsApp) or stays on it. */
export const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

/** A small-capitals text link with an arrow. */
export function ArrowLink({
  href,
  children,
  light = false,
  className,
}: {
  href: string;
  children: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...external(href)}
      className={cn(
        CAPS,
        "inline-flex items-center gap-x-2 pb-1 text-[11px] transition-opacity hover:opacity-60",
        light ? "text-white" : "text-(--k-ink)",
        className,
      )}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

/** What a service covers, as a plain list with fine rules between items. */
export function Covers({
  items,
  light = false,
  className,
}: {
  items: string[];
  light?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("text-[14px]", className)}>
      {items.map((item) => (
        <li key={item} className={cn("py-1.5 leading-[1.4]", light ? "" : "")}>
          {item}
        </li>
      ))}
    </ul>
  );
}
