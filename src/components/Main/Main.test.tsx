import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

import store from "store/rootStore";
import Main from "components/Main/Main";

const ariaLabel = "heart A-Bomb";

test("changes icon of not favorite hero to favorite when clicking on it", async () => {
  render(
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  );

  const heroHeartButton = await screen.findByLabelText(ariaLabel);
  expect(heroHeartButton).toBeInTheDocument();

  const hero1favoriteIcon = await screen.findByTestId("icon-not-favorite-1");
  expect(hero1favoriteIcon).toBeInTheDocument();

  userEvent.click(heroHeartButton);

  expect(hero1favoriteIcon).not.toBeInTheDocument();
  expect(await screen.findByTestId("icon-favorite-1")).toBeInTheDocument();
});
