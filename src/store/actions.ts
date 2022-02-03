import { favoriteID, HeroData } from "types";

export enum ActionTypes {
  SET_FAVORITE_HEROES = "SET_FAVORITE_HEROES",
  CLEAR_FAVORITE_HEROES = "CLEAR_FAVORITE_HEROES",
  ADD_FAVORITE_HERO = "ADD_FAVORITE_HERO",
  REMOVE_FAVORITE_HERO = "REMOVE_FAVORITE_HERO",
}

export type SetFavoriteHeroesHeroes = {
  type: ActionTypes.SET_FAVORITE_HEROES;
  favoriteHeroesIDs: favoriteID;
};

export type AddFavoriteHero = {
  type: ActionTypes.ADD_FAVORITE_HERO;
  favoriteHero: HeroData;
};

export type RemoveFavoriteHero = {
  type: ActionTypes.REMOVE_FAVORITE_HERO;
  favoriteHero: HeroData;
};

export type Actions =
  | SetFavoriteHeroesHeroes
  | AddFavoriteHero
  | RemoveFavoriteHero;

// Action creators - a function returning an action object
export const setFavoriteHeroes = (favoriteHeroesIDs: favoriteID): Actions => ({
  type: ActionTypes.SET_FAVORITE_HEROES,
  favoriteHeroesIDs: favoriteHeroesIDs,
});

export const addFavoriteHero = (favoriteHero: HeroData): Actions => ({
  type: ActionTypes.ADD_FAVORITE_HERO,
  favoriteHero: favoriteHero,
});

export const removeFavoriteHero = (favoriteHero: HeroData): Actions => ({
  type: ActionTypes.REMOVE_FAVORITE_HERO,
  favoriteHero: favoriteHero,
});
