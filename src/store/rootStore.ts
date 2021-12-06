import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";

type favoriteID = {
  [key: number]: boolean;
};

export type RootState = {
  ids: favoriteID;
  isFavoriteHeroesOnly: boolean;
};

// Initial state
export const initialState: RootState = {
  ids: {},
  isFavoriteHeroesOnly: false,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
