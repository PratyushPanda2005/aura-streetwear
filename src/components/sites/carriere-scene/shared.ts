import { Anton, Archivo_Black } from "next/font/google";

export const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
export const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const BODY_STACK = '"Helvetica Neue", Arial, sans-serif';
export const PINK = "#f24fc4";
export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";
