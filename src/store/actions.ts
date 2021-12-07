import { HeroData } from "types";

export enum ActionTypes {
  SET_ALL_HEROES = "SET_ALL_HEROES",
  SET_HERO_AS_FAVORITE = "SET_HERO_AS_FAVORITE",
  UNSET_HERO_AS_FAVORITE = "UNSET_HERO_AS_FAVORITE",
}

type SetAllHeroes = {
  type: ActionTypes.SET_ALL_HEROES;
  allHeroes: HeroData[];
};

export type SetHeroAsFavorite = {
  type: ActionTypes.SET_HERO_AS_FAVORITE;
  hero: HeroData;
};

export type UnsetHeroAsFavorite = {
  type: ActionTypes.UNSET_HERO_AS_FAVORITE;
  hero: HeroData;
};

export type Actions = SetAllHeroes | SetHeroAsFavorite | UnsetHeroAsFavorite;

// Action creators - a function returning an action object
export const setAllHeroes = (allHeroes: HeroData[]): SetAllHeroes => ({
  type: ActionTypes.SET_ALL_HEROES,
  allHeroes: allHeroes,
});

export const setHeroAsFavorite = (hero: HeroData): SetHeroAsFavorite => ({
  type: ActionTypes.SET_HERO_AS_FAVORITE,
  hero: hero,
});

export const unsetHeroAsFavorite = (hero: HeroData): UnsetHeroAsFavorite => ({
  type: ActionTypes.UNSET_HERO_AS_FAVORITE,
  hero: hero,
});
