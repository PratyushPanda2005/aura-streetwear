/** The first sentence of a statement, for an intro line. */
export const firstSentence = (text: string) =>
  text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;
