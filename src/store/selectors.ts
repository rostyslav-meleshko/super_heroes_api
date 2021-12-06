import { RootState } from "./rootStore";

export const stateFavoriteHeroesIDs = (state: RootState) => state.ids;
export const stateIsFavoriteHeroesOnly = (state: RootState) =>
  state.isFavoriteHeroesOnly;
