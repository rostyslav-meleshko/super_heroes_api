import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

type favoriteID = {
  [key: number]: boolean;
};

type RootState = {
  ids: favoriteID;
  isFavoriteHeroesOnly: boolean;
};

// Initial state
const initialState: RootState = {
  ids: {},
  isFavoriteHeroesOnly: false,
};

// Action types - is just a constant. MUST have a unique value.
const ADD_FAVORITE_HERO_ID = "ADD_FAVORITE_HERO_ID";
const DELETE_FAVORITE_HERO_ID = "DELETE_FAVORITE_HERO_ID";
const TOGGLE_SHOW_FAVORITES_ONLY = "TOGGLE_SHOW_FAVORITES_ONLY";

// Action creators - a function returning an action object
export const addFavoriteHeroID = (id: number) => ({
  type: ADD_FAVORITE_HERO_ID,
  id: id,
});

export const deleteFavoriteHeroID = (id: number) => ({
  type: DELETE_FAVORITE_HERO_ID,
  id: id,
});

export const toggleShowFavoritesOnly = () => ({
  type: TOGGLE_SHOW_FAVORITES_ONLY,
});

// Selectors - a function receiving Redux state and returning some data from it
export const stateFavoriteHeroesIDs = (state: RootState) => state.ids;
export const stateIsFavoriteHeroesOnly = (state: RootState) =>
  state.isFavoriteHeroesOnly;

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_FAVORITE_HERO_ID:
      return {
        ...state,
        ids: { ...state.ids, [action.id]: true },
      };

    case DELETE_FAVORITE_HERO_ID:
      return {
        ...state,
        ids: { ...state.ids, [action.id]: false },
      };

    case TOGGLE_SHOW_FAVORITES_ONLY:
      return {
        ...state,
        isFavoriteHeroesOnly: !state.isFavoriteHeroesOnly,
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
