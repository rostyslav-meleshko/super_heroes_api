import { render, screen, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

import store from "store/rootStore";
import HeroesList from "components/Main/HeroesList";
import { heroesArray, hero1, hero3 } from "__mock__/heroes";

const heroesListProps = {
  isMobile: false,
  showedHeroes: heroesArray,
};

describe("HeroesList", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <HashRouter>
          <HeroesList {...heroesListProps} />
        </HashRouter>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("should render heroes accordingly", () => {
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
