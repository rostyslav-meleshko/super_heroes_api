import { RootState } from "./rootStore";
import { HeroData } from "types";

export const stateAllHeroes = (state: RootState): HeroData[] => state.allHeroes;
export const stateFavoriteHeroes = (state: RootState): HeroData[] =>
  state.favoriteHeroes;
