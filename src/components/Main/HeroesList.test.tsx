import { render, screen, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

import HeroesList from "components/Main/HeroesList";
import { heroesArray, hero1, hero3 } from "__mock__/heroes";
// import { createStore } from "redux";
// import { rootReducer } from "store/reducers";
import { Store } from "redux";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const heroesListProps = {
  isMobile: false,
  showedHeroes: heroesArray,
};

// shows error ` ● Test suite failed to run
// Expected the root reducer to be a function. Instead, received: 'undefined'`

// const renderWithRedux = (
//   component,
//   { initialState, store = createStore(rootReducer, initialState) } = {}
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

describe("HeroesList test", () => {
  let store: Store;
  beforeEach(() => {
    store = mockStore({ allHeroes: heroesArray, favoriteHeroes: [] });

    render(
      <Provider store={store}>
        <HashRouter>
          <HeroesList {...heroesListProps} />
        </HashRouter>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("renders component with mocked heroes quantity", () => {
    heroesArray.forEach((hero) =>
      expect(screen.getByText(hero.name)).toBeTruthy()
    );
  });

  it("should show empty heart icon at not favourite hero, when isFavorite:false", () => {
    expect(
      screen.getByTestId(`icon-not-favorite-${hero1.id}`)
    ).toBeInTheDocument();
  });

  it("should show filled heart icon at favourite hero, when isFavorite:true", () => {
    expect(screen.getByTestId(`icon-favorite-${hero3.id}`)).toBeInTheDocument();
  });
});
