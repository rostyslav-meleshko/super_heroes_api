import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";

import Header from "components/Header/Header";
import store from "store/rootStore";
import { renderWithRedux } from "__mock__/testUtils";
import { hero3, heroesArray } from "__mock__/heroes";
import HomePage from "pages/HomePage/HomePage";

test("button text changes from `Favorite Heroes` to `All Heroes`", () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>
  );

  // possible ways to find the element
  // userEvent.click(screen.getByTestId("header-button-heroes")); //.closest
  // getByRole('button', {name: /submit/i}) // getByText, queryByText... .closest("button")
  userEvent.click(screen.getByRole("button", { name: /favorite heroes/i }));

  expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
    "All Heroes"
  );
});

// here new test, for testing mockedStore correctly, there is already favorite hero in the store
test("when clicked on favourite button, favorite hero should be showed", async () => {
  renderWithRedux(<HomePage />, {
    allHeroes: heroesArray,
    favoriteHeroes: [hero3],
  });

  userEvent.click(screen.getByRole("button", { name: /favorite heroes/i }));

  expect(
    await screen.findByTestId(`icon-favorite-${hero3.id}`)
  ).toBeInTheDocument();
});
