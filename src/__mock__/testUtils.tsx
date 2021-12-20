import { RootState } from "store/rootStore";
import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";

export const renderWithRedux = (
  component: React.ReactElement,
  initialState: Partial<RootState> = {}
): RenderResult => {
  const mockedStore = createStore(() => {
    return initialState;
  }, initialState);

  return render(
    <Provider store={mockedStore}>
      <HashRouter>{component}</HashRouter>
    </Provider>
  );
};

export const renderWithRouter = (
  component: React.ReactElement,
  { route = "/" }
): RenderResult => {
  window.history.pushState({}, "Test hero page", route);

  return render(component, { wrapper: BrowserRouter });
};
