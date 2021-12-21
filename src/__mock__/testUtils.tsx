import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import {
  createStore,
  DeepPartial,
  Observable,
  Store,
  StoreEnhancer,
} from "redux";
import { Provider } from "react-redux";
import React from "react";

import { RootState, initialState } from "store/rootStore";
import { rootReducer } from "store/reducers";

interface Renderer<T = any> {
  render: React.ReactElement;
  data: T;
}

type WithFunction<T = any> = (ui: React.ReactNode) => Renderer<T>;

const createMockStore = (override: Partial<Store> = {}): Store => ({
  subscribe: () => () => {},
  dispatch: (action) => action,
  getState: () => undefined,
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

export const withMockedStore =
  (props: DeepPartial<RootState>): WithFunction<Store> =>
  (ui: React.ReactNode): Renderer<Store> => {
    const { getState } = createStore(
      () => ({
        ...initialState,
        ...props
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

type PassedData = DeepPartial<Store>;
type Data = Store;
export interface RenderPipe extends RenderResult {
  data: Data;
}

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
    data: mergeRenderer.data
  }
};

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
