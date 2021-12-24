import { screen } from "@testing-library/react";
import React from "react";
import { cleanup } from "@testing-library/react-hooks";

import {
  renderPipe,
  withMemoryRouter,
  withMockedStore,
  withRouterAndPath,
} from "__mock__/testUtils";
import HeroPage from "pages/HeroPage/HeroPage";
import * as hooks from "hooks/useServersRequest";
import { hero1 } from "__mock__/heroes";
import { HeroData } from "types";

const heroTestUrl = "/hero/Angel/id/24";
const urlPath = "/hero/:heroName/id/:heroId";

type HookResponse = {
  isError: boolean;
  isLoading: boolean;
  data: HeroData | null;
};

const withMockedUseServersRequestHook = (hookResponse: HookResponse): void => {
  const mockedHook = jest.spyOn(hooks, "useServersRequest");

  mockedHook.mockImplementationOnce(() => {
    return hookResponse;
  });
};

describe("HeroPage works correct together with hooks", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should load correct hero according to passed url data ", async () => {
    renderPipe(
      [
        withRouterAndPath({
          route: heroTestUrl,
          path: urlPath,
        }),
        withMockedStore({}),
      ],
      <HeroPage />
    );

    expect(await screen.findByTestId("header-hero-name")).toHaveTextContent(
      "Angel"
    );
    expect(
      await screen.findByText(/Warren Kenneth Worthington III/i)
    ).toBeInTheDocument();
  });
});

describe("HeroPage with different api responses", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

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
