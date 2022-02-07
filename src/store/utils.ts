import { FavoriteHeroesIDs, SessionStorage } from "types";

export const setFavoriteHeroesToSessionStorage = (
  heroes: FavoriteHeroesIDs
): void => {
  sessionStorage.setItem(SessionStorage.FavoriteHeroes, JSON.stringify(heroes));
};

export const getFavoriteHeroesFromSessionStorage = (): FavoriteHeroesIDs => {
  const storageData = sessionStorage.getItem(SessionStorage.FavoriteHeroes);

  const favoriteHeroes = storageData ? JSON.parse(storageData) : {};

  return favoriteHeroes;
};
