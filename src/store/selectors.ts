import { RootState } from "./rootStore";
import { favoriteID, HeroData } from "types";

export const stateAllHeroes = (state: RootState): HeroData[] => state.allHeroes;
export const stateFavoriteHeroesByID = (state: RootState): favoriteID =>
  state.favoriteHeroesByID;
