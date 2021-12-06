import { RootState } from "./rootStore";

export const stateFavoriteHeroesIDs = (state: RootState) =>
  state.favoriteHeroesIds;
export const stateIsFavoriteHeroesOnly = (state: RootState) =>
  state.isFavoriteHeroesOnly;
export const stateAllHeroes = (state: RootState) => state.allHeroes;
