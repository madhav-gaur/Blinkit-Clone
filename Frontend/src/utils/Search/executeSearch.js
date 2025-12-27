export const executeSearch = ({ products = [], plan }) => {
  if (!plan || !products.length) return [];

  const q = plan.queryText.toLowerCase().trim();
  if (plan.intent === "CATEGORY") {
    let results = [...products];

    if (plan.filters.categoryId) {
      results = results.filter((p) =>
        p.category?.includes(plan.filters.categoryId)
      );
    }

    if (plan.filters.subCategoryId) {
      results = results.filter((p) =>
        p.subCategory?.includes(plan.filters.subCategoryId)
      );
    }

    if (plan.filters.price) {
      results = results.filter((p) => {
        const finalPrice = Math.round(p.price - (p.price * p.discount) / 100);
        return plan.filters.price.type === "MAX"
          ? finalPrice <= plan.filters.price.value
          : finalPrice >= plan.filters.price.value;
      });
    }

    return results;
  }
  let results = products.map((item) => {
    let score = 0;
    const name = item.name.toLowerCase();

    const wordStartMatch = name.split(/\s+/).some((w) => w.startsWith(q));

    if (wordStartMatch) score += 100;

    /* 🔥 Priority 2: Category relevance */
    if (
      plan.filters.categoryId &&
      item.category?.includes(plan.filters.categoryId)
    ) {
      score += 60;
    }
    if (
      plan.filters.subCategoryId &&
      item.subCategory?.includes(plan.filters.subCategoryId)
    ) {
      score += 40;
    }

    if (q.length > 4 && name.includes(q)) {
      score += 30;
    }

    return { ...item, score };
  });

  results = results.filter((item) => item.score > 0);

  if (plan.filters.price) {
    results = results.filter((p) => {
      const finalPrice = Math.round(p.price - (p.price * p.discount) / 100);

      return plan.filters.price.type === "MAX"
        ? finalPrice <= plan.filters.price.value
        : finalPrice >= plan.filters.price.value;
    });
  }
  results.sort((a, b) => b.score - a.score);

  return results;
};
