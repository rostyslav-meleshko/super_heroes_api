import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import Header from "components/Header/Header";
import userEvent from "@testing-library/user-event";
import React from "react";

test("button text changes from `Favorite Heroes` to `All Heroes`", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Header />
    </Router>
  );

  userEvent.click(screen.getByTestId("header-button-heroes"));

  expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
    "All Heroes"
  );
});
