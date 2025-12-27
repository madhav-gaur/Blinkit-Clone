export const extractIntent = ({ raw, tokens }, entities) => {
  if (entities?.categoryId) return "CATEGORY";

  if (
    raw.includes("vs") ||
    raw.includes("compare") ||
    raw.includes("like") ||
    raw.includes("relate") ||
    raw.includes("analyze")
  )
    return "COMPARISON";
  if (raw.includes("top") || raw.includes("best")) return "EXPLORATION";
  if (
    [
      "top",
      "best",
      "under",
      "below",
      "less",
      "upto",
      "vs",
      "compare",
      "like",
      "relate",
      "analyze",
    ].some((w) => tokens.includes(w)) &&
    !tokens.some((t) => /^\d+$/.test(t))
  ) {
    return "FILTER_PENDING";
  }
  if (tokens.some((t) => !isNaN(t))) return "FILTER";
  return "PRODUCT";
};
