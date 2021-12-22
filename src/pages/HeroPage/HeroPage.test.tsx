import { screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { cleanup } from "@testing-library/react-hooks";

import {
  renderPipe,
  renderWithRouter,
  // withBrowserRouter,
  withMemoryRouter,
  withMockedStore,
  withRouterAndPath,
} from "__mock__/testUtils";
import store from "store/rootStore";
import HeroPage from "pages/HeroPage/HeroPage";
import { hero1 } from "__mock__/heroes";
// import { useServersRequest } from "hooks/useServersRequest";
import { HeroData } from "types";
import * as hooks from "hooks/useServersRequest";

const heroTestUrl = "/hero/Angel/id/24";

type HookResponse = {
  isError: boolean;
  isLoading: boolean;
  data: HeroData | null;
};

const withMockedUseServersRequestHook = (hookResponse: HookResponse) => {
  const mockedHook = jest.spyOn(hooks, "useServersRequest");

  mockedHook.mockImplementationOnce(() => {
    return hookResponse;
  });
};

describe("HeroPage working together with hooks", () => {
  afterEach(cleanup);

  // this test tests not only component, but and the hook also, simulate taking the params from the url,
  // so renderWithRouter is good for testing the url params (instead of testing match) and is good for the testing
  // fetching data from api server

  it("should load correct hero acc to url", async () => {
    // below commented code show alternative way to manage same test

    // renderWithRouter(
    //   <Provider store={store}>
    //     <Route path="/hero/:heroName/id/:heroId">
    //       <HeroPage />
    //     </Route>
    //   </Provider>,
    //   { route: heroTestUrl }
    // );

    renderPipe(
      [
        withRouterAndPath({
          route: heroTestUrl,
          path: "/hero/:heroName/id/:heroId",
        }),
        withMockedStore({}),
      ],
      <HeroPage />
    );

    expect(await screen.findByTestId("header-hero-name")).toHaveTextContent(
      /Angel/i
    );
    expect(
      await screen.findByText(/Warren Kenneth Worthington III/i)
    ).toBeInTheDocument();
  });
});

describe("HeroPage with different api responses", () => {
  afterEach(cleanup);

  it("Should show hero data after success fetch API, with no error", async () => {
    withMockedUseServersRequestHook({
      isError: false,
      isLoading: false,
      data: hero1,
    });

    renderPipe([withMemoryRouter(), withMockedStore({})], <HeroPage />);

    expect(await screen.findByTestId("header-hero-name")).toHaveTextContent(
      "A-Bomb"
    );
    expect(
      await screen.findByText(/Richard Milhouse Jones/i)
    ).toBeInTheDocument();
  });

  it("Should show error after fetching API with an error", async () => {
    withMockedUseServersRequestHook({
      isError: true,
      isLoading: false,
      data: null,
    });

    renderPipe([withMemoryRouter(), withMockedStore({})], <HeroPage />);

    expect(
      await screen.findByText(/Loading error. Reload page/i)
    ).toBeInTheDocument();
  });

  it("Should show loader during fetching API when isLoading: true", async () => {
    withMockedUseServersRequestHook({
      isError: false,
      isLoading: true,
      data: null,
    });

    renderPipe([withMemoryRouter(), withMockedStore({})], <HeroPage />);

    expect(await screen.findByTestId("loader")).toBeInTheDocument();
  });
});
