import { preProcessQuery } from "./preProcessQuery.js";
import { extractIntent } from "./extractIntent.js";
import { extractEntities } from "./extractEntities.js";
import { buildSearchPlan } from "./buildSearchPlan.js";
import { executeSearch } from "./executeSearch.js";
export const smartSearch = (query, products, allCategory = []) => {
  if (!query.trim()) return [];

  const preprocessed = preProcessQuery(query);
  const intent = extractIntent(preprocessed);

  const entities = extractEntities(preprocessed, allCategory);

  const plan = buildSearchPlan({
    intent,
    entities,
    raw: preprocessed.raw,
  });

  let results = executeSearch({products, plan});

  // fallback
  if (!results.length) {
    results = products.filter((p) =>
      p.name.toLowerCase().includes(preprocessed.raw)
    );
  }

  return results;
};
