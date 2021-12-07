import { initialState, RootState } from "store/rootStore";
import { Actions, ActionTypes } from "./actions";
import { toggleFavoriteHero } from "store/utils";

export const rootReducer = (
  state = initialState,
  action: Actions
): RootState => {
  switch (action.type) {
    case ActionTypes.SET_ALL_HEROES:
      return {
        ...state,
        allHeroes: action.allHeroes,
      };

    case ActionTypes.SET_HERO_AS_FAVORITE:
      return toggleFavoriteHero(state, action.hero, "ADD");

    case ActionTypes.UNSET_HERO_AS_FAVORITE:
      return toggleFavoriteHero(state, action.hero, "DELETE");

    default:
      return state;
  }
};
