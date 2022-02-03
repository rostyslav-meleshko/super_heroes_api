import { favoriteID, SessionStorage } from "types";

export const setFavoriteHeroesToSessionStorage = (heroes: favoriteID): void => {
  console.log("setFavoriteHeroesToSessionStorage");
  sessionStorage.setItem(SessionStorage.FavoriteHeroes, JSON.stringify(heroes));
};

export const getFavoriteHeroesFromSessionStorage = (): favoriteID => {
  const storageData = sessionStorage.getItem(SessionStorage.FavoriteHeroes);

  const favoriteHeroes = storageData ? JSON.parse(storageData) : [];

  return favoriteHeroes;
};
