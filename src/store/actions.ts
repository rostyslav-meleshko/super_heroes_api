import { HeroData } from "types";

export enum ActionTypes {
  SET_ALL_HEROES = "SET_ALL_HEROES",
  ADD_FAVORITE_HERO_ID = "ADD_FAVORITE_HERO_ID",
  DELETE_FAVORITE_HERO_ID = "DELETE_FAVORITE_HERO_ID",
}

type SetAllHeroes = {
  type: ActionTypes.SET_ALL_HEROES;
  allHeroes: HeroData[];
};

type AddFavoriteHeroId = {
  type: ActionTypes.ADD_FAVORITE_HERO_ID;
  id: number;
};

type DeleteFavoriteHeroId = {
  type: ActionTypes.DELETE_FAVORITE_HERO_ID;
  id: number;
};

export type Actions = SetAllHeroes | AddFavoriteHeroId | DeleteFavoriteHeroId;

// Action creators - a function returning an action object
export const setAllHeroes = (allHeroes: HeroData[]): SetAllHeroes => ({
  type: ActionTypes.SET_ALL_HEROES,
  allHeroes: allHeroes,
});

export const addFavoriteHeroID = (id: number): AddFavoriteHeroId => ({
  type: ActionTypes.ADD_FAVORITE_HERO_ID,
  id: id,
});

export const deleteFavoriteHeroID = (id: number): DeleteFavoriteHeroId => ({
  type: ActionTypes.DELETE_FAVORITE_HERO_ID,
  id: id,
});
