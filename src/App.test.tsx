import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/rootStore";
import { CssBaseline } from "@material-ui/core";

test("renders button `Favourite Heroes` in App component", () => {
  render(
    <Provider store={store}>
      <CssBaseline>
        <HashRouter>
          <App />
        </HashRouter>
      </CssBaseline>
    </Provider>
  );

  expect(screen.getByTestId("header-button-heroes").textContent).toEqual(
    "Favorite Heroes"
  );
});
