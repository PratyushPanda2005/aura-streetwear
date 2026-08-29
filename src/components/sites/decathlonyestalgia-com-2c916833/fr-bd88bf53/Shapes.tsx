import { SHAPES } from "./data";
import { cn } from "@/lib/utils";

type ShapeProps = {
  name: string;
  alt?: string;
  className?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;

/** Memphis/Y2K decorative shape (extracted SVG served as a static asset). */
export function Shape({ name, alt = "", className, ...rest }: ShapeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${SHAPES}/${name}.svg`}
      alt={alt}
      aria-hidden={alt === ""}
      draggable={false}
      className={cn("pointer-events-none select-none", className)}
      {...rest}
    />
  );
}

export function DecathlonLogo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${SHAPES}/logo-decathlon.svg`} alt="Decathlon Yestalgia" className={className} />
  );
}
