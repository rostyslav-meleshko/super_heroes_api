import React from "react";
import { screen } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App";
import store from "store/rootStore";
import { renderPipe, withMemoryRouter } from "__mock__/testUtils";

test("renders button `Favourite Heroes` in App component", () => {
  renderPipe(
    [withMemoryRouter()],
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
    "Favorite Heroes"
  );
});
