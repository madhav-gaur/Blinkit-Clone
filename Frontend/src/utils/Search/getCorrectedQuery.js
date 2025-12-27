// export const getCorrectedQuery = (query, fuse) => {
//   const matches = fuse.search(query);

//   if (!matches.length) return null;

//   const bestName = matches[0].item.name.toLowerCase();

//   const closestWord = bestName.split(" ").find((w) => w.startsWith(query[0]));

//   return closestWord || bestName;
// };
