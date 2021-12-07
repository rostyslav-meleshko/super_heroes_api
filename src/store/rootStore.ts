import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { HeroData } from "types";
import { rootReducer } from "./reducers";

type favoriteID = {
  [key: number]: boolean;
};

export type RootState = {
  allHeroes: HeroData[];
  favoriteHeroesIds: favoriteID;
};

// Initial state
export const initialState: RootState = {
  allHeroes: [],
  favoriteHeroesIds: {},
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
