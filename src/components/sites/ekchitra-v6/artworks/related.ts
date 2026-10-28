/**
 * Families of medium, so a work can show others made the same way. Mediums
 * are written in full on the gallery's records ("Mixed Media on Canvas",
 * "Acrylic on Plywood") and most appear only once, so works are matched by
 * family rather than by the exact words. Checked in this order: the first
 * that matches names the family (a sculpture with an acrylic finish is
 * still a sculpture).
 */
const FAMILIES: { name: string; test: RegExp }[] = [
  { name: "Mixed Media", test: /mixed media/i },
  { name: "Ceramics", test: /ceramic|porcelain|stoneware|clay/i },
  { name: "Sculpture", test: /steel|metal|iron|wood/i },
  { name: "Acrylic", test: /acrylic/i },
  { name: "Watercolour", test: /watercolou?r/i },
  { name: "Textile", test: /wool|silk|linen|cotton/i },
  { name: "Works on Paper", test: /paper/i },
];

/** The family a medium belongs to, or the medium itself if none fits. */
export function mediumFamily(medium: string) {
  return FAMILIES.find((family) => family.test.test(medium))?.name ?? medium;
}

/**
 * Other works related to one: those in the same family of medium, or — when
 * it is the only one of its kind — more by the same artist. Says which, so
 * the panel can label the row.
 */
export function relatedWorks<W extends { medium: string; image: string }>(
  work: W,
  all: W[],
  artistOf: (work: W) => string,
  limit = 8,
): { label: string; works: W[] } {
  const family = mediumFamily(work.medium);
  const others = all.filter((other) => other.image !== work.image);
  const sameMedium = others.filter(
    (other) => mediumFamily(other.medium) === family,
  );
  if (sameMedium.length > 0) {
    return { label: `More in ${family}`, works: sameMedium.slice(0, limit) };
  }
  return {
    label: `More by ${artistOf(work)}`,
    works: others
      .filter((other) => artistOf(other) === artistOf(work))
      .slice(0, limit),
  };
}
