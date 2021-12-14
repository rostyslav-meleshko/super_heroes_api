import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";

import Header from "components/Header/Header";
import store from "store/rootStore";

test("button text changes from `Favorite Heroes` to `All Heroes`", () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>
  );

  // here is the question !!!
  // userEvent.click(screen.getByTestId("header-button-heroes")); //.closest

  // getByRole('button', {name: /submit/i}) // getByText, queryByText... .closest("button")
  userEvent.click(screen.getByRole("button", { name: /favorite heroes/i }));

  expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
    "All Heroes"
  );
});
