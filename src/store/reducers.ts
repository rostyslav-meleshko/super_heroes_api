import { AnyAction } from "redux";

import { initialState } from "store/rootStore";
import { ActionTypes } from "./actions";

// rootReducer - this function is called after dispatching an action
export const rootReducer = (state = initialState, action: AnyAction) => {
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
