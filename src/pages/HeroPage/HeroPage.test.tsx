import { screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";

import { renderWithRouter } from "__mock__/testUtils";
import store from "store/rootStore";
import HeroPage from "pages/HeroPage/HeroPage";

const heroTestUrl = "/hero/Angel/id/24";

describe("HeroPage", () => {
  it("should load correct hero acc to url", async () => {
    renderWithRouter(
      <Provider store={store}>
        <Route path="/hero/:heroName/id/:heroId">
          <HeroPage />
        </Route>
      </Provider>,
      { route: heroTestUrl }
    );

    expect(await screen.findByTestId("header-hero-name")).toHaveTextContent(
      /Angel/i
    );
    expect(
      await screen.findByText(/Warren Kenneth Worthington III/i)
    ).toBeInTheDocument();
  });
});
