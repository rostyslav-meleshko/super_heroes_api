import { initialState, RootState } from "store/rootStore";
import { Actions, ActionTypes } from "./actions";

export const rootReducer = (
  state = initialState,
  action: Actions
): RootState => {
  switch (action.type) {
    case ActionTypes.SET_FAVORITE_HEROES:
      return {
        ...state,
        favoriteHeroesIDs: action.favoriteHeroesIDs,
      };

    case ActionTypes.ADD_FAVORITE_HERO:
      return {
        ...state,
        favoriteHeroesIDs: {
          ...state.favoriteHeroesIDs,
          [action.heroId]: true,
        },
      };

    case ActionTypes.REMOVE_FAVORITE_HERO:
      return {
        ...state,
        favoriteHeroesIDs: {
          ...state.favoriteHeroesIDs,
          [action.heroId]: false,
        },
      };

    default:
      return state;
  }
};
