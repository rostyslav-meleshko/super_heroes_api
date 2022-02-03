import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { favoriteID, HeroData } from "types";
import { rootReducer } from "./reducers";

export type RootState = {
  allHeroes: HeroData[];
  favoriteHeroes: HeroData[];
  favoriteHeroesByID: favoriteID;
};

// Initial state
export const initialState: RootState = {
  allHeroes: [],
  favoriteHeroes: [],
  favoriteHeroesByID: {},
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
