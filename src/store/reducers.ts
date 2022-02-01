import { initialState, RootState } from "store/rootStore";
import { Actions, ActionTypes } from "./actions";
import { toggleFavoriteHero, mergeAllHeroesWithFavorite } from "store/utils";

export const rootReducer = (
  state = initialState,
  action: Actions
): RootState => {
  switch (action.type) {
    case ActionTypes.SET_ALL_HEROES:
      return mergeAllHeroesWithFavorite(state, action.allHeroes);
    // return {
    //   ...state,
    //   allHeroes: action.allHeroes,
    // };

    case ActionTypes.TOGGLE_HERO_AS_FAVORITE:
      return toggleFavoriteHero(state, action.hero);

    default:
      return state;
  }
};
