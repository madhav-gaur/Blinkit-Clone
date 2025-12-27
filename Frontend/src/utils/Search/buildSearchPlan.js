export const buildSearchPlan = ({ intent, entities, raw }) => {
  return {
    queryText: raw,
    intent,
    filters: entities,
  };
};
