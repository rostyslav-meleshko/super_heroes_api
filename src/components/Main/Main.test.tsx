import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Main from "components/Main/Main";
import { renderPipe, withStore, withMemoryRouter } from "__mock__/testUtils";

const ariaLabel = "heart A-Bomb";

test("changes icon of not favorite hero to favorite when clicking on it", async () => {
  renderPipe([withStore(), withMemoryRouter()], <Main />);

  const heroHeartButton = await screen.findByLabelText(ariaLabel);
  expect(heroHeartButton).toBeInTheDocument();

  const hero1favoriteIcon = await screen.findByTestId("icon-not-favorite-1");
  expect(hero1favoriteIcon).toBeInTheDocument();

  userEvent.click(heroHeartButton);

  expect(hero1favoriteIcon).not.toBeInTheDocument();
  expect(await screen.findByTestId("icon-favorite-1")).toBeInTheDocument();
});
