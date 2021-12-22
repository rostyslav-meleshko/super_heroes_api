import { screen, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import React from "react";

import HeroesList from "components/Main/HeroesList";
import { heroesArray, hero1, hero3 } from "__mock__/heroes";
import {
  renderWithRedux,
  renderPipe,
  withMockedStore,
  withMemoryRouter,
} from "__mock__/testUtils";

const heroesListProps = {
  isMobile: false,
  showedHeroes: heroesArray,
};

describe("HeroesList with mockedStore", () => {
  afterEach(cleanup);

  it("Should work", () => {
    const { debug } = renderPipe(
      [withMockedStore({}), withMemoryRouter()],
      // <HashRouter>
      <HeroesList {...heroesListProps} />
      // </HashRouter>
    );

    debug(undefined, 9999);
  });

  it("renders component with mocked heroes quantity", () => {
    renderWithRedux(<HeroesList {...heroesListProps} />, {
      allHeroes: heroesArray,
      favoriteHeroes: [],
    });

    heroesArray.forEach((hero) =>
      expect(screen.getByText(hero.name)).toBeTruthy()
    );
  });

  it("should show empty heart icon at not favourite hero, when isFavorite:false", () => {
    renderWithRedux(<HeroesList {...heroesListProps} />, {
      allHeroes: heroesArray,
      favoriteHeroes: [],
    });

    expect(
      screen.getByTestId(`icon-not-favorite-${hero1.id}`)
    ).toBeInTheDocument();
  });

  it("should show filled heart icon at favourite hero, when isFavorite:true", () => {
    renderWithRedux(<HeroesList {...heroesListProps} />, {
      allHeroes: heroesArray,
      favoriteHeroes: [],
    });

    expect(screen.getByTestId(`icon-favorite-${hero3.id}`)).toBeInTheDocument();
  });
});
