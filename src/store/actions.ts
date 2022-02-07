import { FavoriteHeroesIDs } from "types";

export enum ActionTypes {
  SET_FAVORITE_HEROES = "SET_FAVORITE_HEROES",
  CLEAR_FAVORITE_HEROES = "CLEAR_FAVORITE_HEROES",
  ADD_FAVORITE_HERO = "ADD_FAVORITE_HERO",
  REMOVE_FAVORITE_HERO = "REMOVE_FAVORITE_HERO",
}

export type SetFavoriteHeroesHeroes = {
  type: ActionTypes.SET_FAVORITE_HEROES;
  favoriteHeroesIDs: FavoriteHeroesIDs;
};

export type AddFavoriteHero = {
  type: ActionTypes.ADD_FAVORITE_HERO;
  heroId: number;
};

export type RemoveFavoriteHero = {
  type: ActionTypes.REMOVE_FAVORITE_HERO;
  heroId: number;
};

export type Actions =
  | SetFavoriteHeroesHeroes
  | AddFavoriteHero
  | RemoveFavoriteHero;

// Action creators - a function returning an action object
export const setFavoriteHeroes = (
  favoriteHeroesIDs: FavoriteHeroesIDs
): Actions => ({
  type: ActionTypes.SET_FAVORITE_HEROES,
  favoriteHeroesIDs: favoriteHeroesIDs,
});

export const addFavoriteHero = (heroId: number): Actions => ({
  type: ActionTypes.ADD_FAVORITE_HERO,
  heroId: heroId,
});

export const removeFavoriteHero = (heroId: number): Actions => ({
  type: ActionTypes.REMOVE_FAVORITE_HERO,
  heroId: heroId,
});
