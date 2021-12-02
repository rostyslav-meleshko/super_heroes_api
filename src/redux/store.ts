import { createStore, AnyAction, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Dispatch } from "redux";

import { heroData } from "../types";

type RootState = {
  favoriteHeroes: heroData[];
};

// Initial state
const initialState: RootState = {
  favoriteHeroes: [],
};

// Action types - is just a constant. MUST have a unique value.
const ADD_FAVORITE_HERO = "ADD_FAVORITE_HERO";
const DELETE_FAVORITE_HERO = "DELETE_FAVORITE_HERO";

// Action creators - a function returning an action object
export const addFavouriteHero = (favoriteHero: heroData) => ({
  type: ADD_FAVORITE_HERO,
  favouriteHero: favoriteHero,
});

export const deleteFavouriteHero = (id: number) => ({
  type: DELETE_FAVORITE_HERO,
  id,
});

// Selectors - a function receiving Redux state and returning some data from it
export const stateFavouriteHeroes = (state: RootState) => state.favoriteHeroes;

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_FAVORITE_HERO:
      return {
        ...state,
        favouriteHeroes: [...state.favoriteHeroes, action.favouriteHero],
      };

    case DELETE_FAVORITE_HERO:
      return {
        ...state,
        favouriteHeroes: [...state.favoriteHeroes].filter(
          (hero) => hero.id !== action.id
        ),
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
