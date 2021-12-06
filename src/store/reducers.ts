import { initialState } from "store/rootStore";
import { ActionTypes, Actions } from "./actions";

export const rootReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE_HERO_ID:
      return {
        ...state,
        ids: { ...state.ids, [action.id]: true },
      };

    case ActionTypes.DELETE_FAVORITE_HERO_ID:
      return {
        ...state,
        ids: { ...state.ids, [action.id]: false },
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
