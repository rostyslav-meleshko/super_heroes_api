// // its just as sample with what to work;
export const sampleText = "sampleText";
//
// import React from "react";
// import { Action, createStore, DeepPartial, Store, StoreEnhancer } from "redux";
// import { Provider } from "react-redux";
// // import { runSaga, Saga } from "redux-saga";
// import { Router } from "react-router-dom";
// import { MemoryRouter } from "react-router";
// import { render, RenderResult } from "@testing-library/react";
// import { createMemoryHistory, MemoryHistory } from "history";
//
// // import { Auth0ContextType } from "utils/auth0";
// import { rootReducer } from "store/reducers";
// // import { createMockStore } from "__mocks__/mockReduxStore";
// // import { AppState } from "modules/state.types";
// // import { theme } from "config/theme";
// // // import { mockAuth0 } from './__mocks__';
// // import { MockHistory } from "./types";
//
// interface Renderer<T = any> {
//   render: React.ReactElement;
//   data: T;
// }
//
// export interface RenderPipe extends RenderResult {
//   data: Data;
// }
//
// interface WithRouter {
//   route?: string;
//   history?: MemoryHistory;
// }
//
// type WithFunction<T = any> = (ui: React.ReactNode) => Renderer<T>;
// type Data = Auth0ContextType & Store & MockHistory;
// type PassedData = DeepPartial<Store>;
//
// // avoid execution actions in on did mount (dispatch doesn't work)
// export const withMockedStore =
//   (
//     props?: DeepPartial<AppState>,
//     override: Partial<Store> = {}
//   ): WithFunction<Store> =>
//   (ui: React.ReactNode): Renderer<Store> => {
//     const { getState } = createStore(reducer, props as StoreEnhancer<AppState>);
//     const mockedStore: Store = createMockStore({
//       getState,
//       ...override,
//     });
//
//     return {
//       render: <Provider store={mockedStore}>{ui}</Provider>,
//       data: mockedStore,
//     };
//   };
//
// // dispatch works
// export const withStore =
//   (props?: DeepPartial<AppState>): WithFunction<Store> =>
//   (ui: React.ReactNode): Renderer<Store> => {
//     const store: Store = createStore(
//       rootReducer,
//       props as StoreEnhancer<AppState>
//     );
//     return {
//       render: <Provider store={store}>{ui}</Provider>,
//       data: store,
//     };
//   };
//
// export const withMemoryRouter =
//   (): WithFunction =>
//   (ui: React.ReactElement): Renderer => ({
//     render: <MemoryRouter>{ui}</MemoryRouter>,
//     data: {},
//   });
//
// export const withRouter =
//   ({
//     route = "/",
//     history = createMemoryHistory({ initialEntries: [route] }),
//   }: WithRouter = {}): WithFunction =>
//   (ui: React.ReactElement): Renderer<MockHistory> => ({
//     render: <Router history={history}>{ui}</Router>,
//     data: { history },
//   });
//
// // adding `data` to the returned utilities to allow us
// // to reference it in our tests (just try to avoid using
// // this to test implementation details).
//
// export const renderPipe = (
//   args: Array<WithFunction<PassedData>>,
//   ui: React.ReactElement
// ): RenderPipe => {
//   const startValue: Renderer = {
//     render: ui,
//     data: {},
//   };
//
//   const mergeRenderer = args.reduce(
//     (prev: Renderer<Data>, fn: WithFunction<Data>): Renderer<Data> => {
//       const { render, data }: Renderer<Data> = fn(prev.render);
//
//       return {
//         render,
//         data: { ...prev.data, ...data },
//       };
//     },
//     startValue as Renderer<Data>
//   );
//
//   return {
//     ...render(mergeRenderer.render),
//     data: mergeRenderer.data,
//   };
// };
//
// export async function recordSaga(
//   saga: Saga,
//   initialAction: Action
// ): Promise<Action[]> {
//   const dispatched: Action[] = [];
//
//   await runSaga(
//     {
//       dispatch: (action: Action) => dispatched.push(action),
//       getState: () => ({}),
//     },
//     saga,
//     initialAction
//   );
//
//   return dispatched;
// }
