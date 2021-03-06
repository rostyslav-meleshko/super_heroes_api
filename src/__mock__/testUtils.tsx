import { render, RenderResult } from "@testing-library/react";
import { HashRouter, MemoryRouter, Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  createStore,
  DeepPartial,
  Observable,
  Store,
  StoreEnhancer,
} from "redux";
import { Provider } from "react-redux";
import React from "react";

import store, { RootState, initialState } from "store/rootStore";
import { rootReducer } from "store/reducers";

interface Renderer<T = any> {
  render: React.ReactElement;
  data: T; // for what we holding data?
}

type WithFunction<T = any> = (ui: React.ReactNode) => Renderer<T>;

type PassedData = DeepPartial<Store>;
type Data = Store;

export interface RenderPipe extends RenderResult {
  data: Data;
}

const createMockStore = (override: Partial<Store> = {}): Store => ({
  subscribe: () => () => {},
  dispatch: (action) => action,
  getState: () => {
    return initialState;
  },
  replaceReducer: () => {},
  [Symbol.observable]: (): Observable<any> => ({
    subscribe: () => ({
      unsubscribe: () => {},
    }),
    [Symbol.observable]() {
      return this;
    },
  }),
});

// here some troubles
export const withMockedStore =
  (props: DeepPartial<RootState>): WithFunction<Store> =>
  (ui: React.ReactNode): Renderer<Store> => {
    const { getState } = createStore(
      () => ({
        ...initialState,
        ...props,
      }),
      props as StoreEnhancer<RootState>
    );
    const mockedStore: Store = createMockStore({
      getState,
    });

    return {
      render: <Provider store={mockedStore}>{ui}</Provider>,
      data: mockedStore,
    };
  };

export const withMyMockedStore =
  (initialState: Partial<RootState> = {}): WithFunction =>
  (ui: React.ReactNode): Renderer => {
    const mockedStore = createStore(() => {
      return initialState;
    }, initialState);

    return {
      render: (
        <Provider store={mockedStore}>
          <HashRouter>{ui}</HashRouter>
        </Provider>
      ),
      data: {},
    };
  };

export const withStore =
  (props?: DeepPartial<RootState>): WithFunction =>
  (ui: React.ReactNode): Renderer => {
    const store = createStore(rootReducer, props as StoreEnhancer<RootState>);
    return {
      render: <Provider store={store}>{ui}</Provider>,
      data: {},
    };
  };

export const withMemoryRouter =
  (): WithFunction =>
  (ui: React.ReactNode): Renderer => ({
    render: <MemoryRouter>{ui}</MemoryRouter>,
    data: {},
  });

export const withRouterAndPath =
  ({ route = "/", path = "/" }): WithFunction =>
  (ui: any): Renderer => {
    const history = createMemoryHistory();
    history.push(route);

    return {
      render: (
        <Router history={history}>
          <Route path={path}>{ui}</Route>
        </Router>
      ),
      data: {},
    };
  };

export const renderPipe = (
  args: Array<WithFunction<PassedData>>,
  ui: React.ReactElement
): RenderPipe => {
  const startValue: Renderer = {
    render: ui,
    data: {},
  };

  const mergeRenderer: Renderer<Data> = args.reduce(
    (prev: Renderer<Data>, fn: WithFunction<PassedData>) => {
      const { render, data } = fn(prev.render);

      return {
        render,
        data: {
          ...prev.data,
          ...data,
        },
      } as Renderer<Data>;
    },
    startValue as Renderer<Data>
  );

  return {
    ...render(mergeRenderer.render),
    data: mergeRenderer.data,
  };
};

// separated method for testing alone, methods which was created before
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
