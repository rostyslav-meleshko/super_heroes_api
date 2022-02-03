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
        favoriteHeroesByID: action.favoriteHeroesIDs,
      };

    case ActionTypes.ADD_FAVORITE_HERO:
      return {
        ...state,
        favoriteHeroesByID: {
          ...state.favoriteHeroesByID,
          [action.favoriteHero.id]: true,
        },
      };

    case ActionTypes.REMOVE_FAVORITE_HERO:
      return {
        ...state,
        favoriteHeroesByID: {
          ...state.favoriteHeroesByID,
          [action.favoriteHero.id]: false,
        },
      };

    default:
      return state;
  }
};
