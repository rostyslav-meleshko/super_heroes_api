import { initialState } from "store/rootStore";
import { Actions, ActionTypes } from "./actions";

export const rootReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_ALL_HEROES:
      return {
        ...state,
        allHeroes: action.allHeroes,
      };

    case ActionTypes.ADD_FAVORITE_HERO_ID:
      return {
        ...state,
        favoriteHeroesIds: { ...state.favoriteHeroesIds, [action.id]: true },
      };

    case ActionTypes.DELETE_FAVORITE_HERO_ID:
      return {
        ...state,
        favoriteHeroesIds: { ...state.favoriteHeroesIds, [action.id]: false },
      };

    case ActionTypes.TOGGLE_SHOW_FAVORITES_ONLY:
      return {
        ...state,
        isFavoriteHeroesOnly: !state.isFavoriteHeroesOnly,
      };

    default:
      return state;
  }
};
