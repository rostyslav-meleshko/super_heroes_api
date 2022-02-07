import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { FavoriteHeroesIDs } from "types";
import { rootReducer } from "./reducers";

export type RootState = {
  favoriteHeroesIDs: FavoriteHeroesIDs;
};

// Initial state
export const initialState: RootState = {
  favoriteHeroesIDs: {},
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
