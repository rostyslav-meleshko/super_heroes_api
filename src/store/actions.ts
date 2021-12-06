// Action types - is just a constant. MUST have a unique value.
export enum ActionTypes {
  ADD_FAVORITE_HERO_ID = "ADD_FAVORITE_HERO_ID",
  DELETE_FAVORITE_HERO_ID = "DELETE_FAVORITE_HERO_ID",
  TOGGLE_SHOW_FAVORITES_ONLY = "TOGGLE_SHOW_FAVORITES_ONLY",
}

// Action creators - a function returning an action object
export const addFavoriteHeroID = (id: number) => ({
  type: ActionTypes.ADD_FAVORITE_HERO_ID,
  id: id,
});

export const deleteFavoriteHeroID = (id: number) => ({
  type: ActionTypes.DELETE_FAVORITE_HERO_ID,
  id: id,
});

export const toggleShowFavoritesOnly = () => ({
  type: ActionTypes.TOGGLE_SHOW_FAVORITES_ONLY,
});
