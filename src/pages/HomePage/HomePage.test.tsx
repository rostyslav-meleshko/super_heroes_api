import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import {
  renderPipe,
  withMemoryRouter,
  withMyMockedStore,
  withStore,
} from "__mock__/testUtils";
import { hero3, heroesArray } from "__mock__/heroes";
import HomePage from "pages/HomePage/HomePage";

describe("HomePage", () => {
  beforeEach(cleanup); // console.error

  test("button text changes from `Favorite Heroes` to `All Heroes`", () => {
    renderPipe([withMemoryRouter(), withStore()], <HomePage />);

    userEvent.click(screen.getByRole("button", { name: /favorite heroes/i }));

    expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
      "All Heroes"
    );
  });

  test("when clicked on favourite button, favorite hero should be showed", async () => {
    renderPipe(
      [
        withMemoryRouter(),
        withMyMockedStore({ allHeroes: heroesArray, favoriteHeroes: [hero3] }),
      ],
      <HomePage />
    );

    userEvent.click(screen.getByRole("button", { name: /favorite heroes/i }));

    expect(
      await screen.findByTestId(`icon-favorite-${hero3.id}`)
    ).toBeInTheDocument();
  });
});
