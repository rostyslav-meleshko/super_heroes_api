import { HeroData } from "types";

export enum ActionTypes {
  SET_ALL_HEROES = "SET_ALL_HEROES",
  TOGGLE_HERO_AS_FAVORITE = "TOGGLE_HERO_AS_FAVORITE",
}

type SetAllHeroes = {
  type: ActionTypes.SET_ALL_HEROES;
  allHeroes: HeroData[];
};

export type ToggleHeroAsFavorite = {
  type: ActionTypes.TOGGLE_HERO_AS_FAVORITE;
  hero: HeroData;
};

export type Actions = SetAllHeroes | ToggleHeroAsFavorite;

// Action creators - a function returning an action object
export const setAllHeroes = (allHeroes: HeroData[]): SetAllHeroes => ({
  type: ActionTypes.SET_ALL_HEROES,
  allHeroes: allHeroes,
});

export const toggleHeroAsFavorite = (hero: HeroData): ToggleHeroAsFavorite => ({
  type: ActionTypes.TOGGLE_HERO_AS_FAVORITE,
  hero: hero,
});
