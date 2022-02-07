import { RootState } from "./rootStore";
import { FavoriteHeroesIDs } from "types";

export const stateFavoriteHeroesByID = (state: RootState): FavoriteHeroesIDs =>
  state.favoriteHeroesIDs;

//todo reselect? memoisation?
