import { RootState } from "store/rootStore";
import { render, RenderResult } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
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
