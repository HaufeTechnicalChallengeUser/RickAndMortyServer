export const addOrDeleteFavorites = (
  favorites: number[],
  favorite: number
): number[] => {
  const index = favorites.indexOf(favorite);
  index > -1 ? favorites.splice(index, 1) : favorites.push(favorite);
  return favorites;
};
