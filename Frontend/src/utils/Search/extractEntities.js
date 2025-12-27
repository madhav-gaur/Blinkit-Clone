import CATEGORY_SYNONYMS from "./CATEGORY_SYNONYMS";

export const extractEntities = (
  { tokens },
  allCategory = [],
  allSubCategory = []
) => {
  let categoryId = null;
  let subCategoryId = null;

  for (const [categoryName, data] of Object.entries(CATEGORY_SYNONYMS)) {
    if (tokens.some((t) => data.synonyms.includes(t))) {
      categoryId = allCategory.find(
        (c) => c.name.toLowerCase() === categoryName
      )?._id;
    }

    for (const [subName, subSyns] of Object.entries(data.subCategories)) {
      if (tokens.some((t) => subSyns.includes(t))) {
        subCategoryId = allSubCategory.find(
          (s) => s.name.toLowerCase() === subName
        )?._id;

        categoryId ??= allCategory.find(
          (c) => c.name.toLowerCase() === categoryName
        )?._id;
      }
    }
  }

  return {
    categoryId,
    subCategoryId,
  };
};
