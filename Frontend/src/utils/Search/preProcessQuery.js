export const preProcessQuery = (query = "") => {
  const normalized = query
    .toLowerCase()
    .replace(/[₹,]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    raw: normalized,
    tokens: normalized.split(" "),
  };
};
