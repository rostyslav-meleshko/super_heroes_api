import React, { ReactElement } from "react";
import { RenderResult } from "@testing-library/react-hooks";
// import {} from "jest";
import { waitFor } from "@testing-library/react";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { useServersRequest, UseServersResponse } from "hooks/useServersRequest";
import { ServerFetchUrls } from "types";
import store from "store/rootStore";

const numberOfHeroesTotal = 563; // is it OK to pass the test with length of the response array from the server?
const heroId = 1;
const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;
let hookResult: RenderResult<UseServersResponse<ServerFetchUrls>>;

interface Children {
  children: JSX.Element;
}

type Wrapper = ({}: Children) => ReactElement;

const wrapper: Wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// mock asyncron call and mock store;

describe("useServerRequest", () => {
  afterEach(() => {
    cleanup();
  });

  describe("when calling AllHeroes correct URL", () => {
    beforeEach(() => {
      const { result } = renderHook(
        () => useServersRequest(ServerFetchUrls.AllHeroes),
        { wrapper }
      );

      // how to avoid this manoeuvre with hookResult? how to use 'result' in each 'it' test case without 'hookResult'?
      hookResult = result;
    });

    it("should set isLoading = true, when start fetching data", () => {
      expect(hookResult.current.isLoading).toEqual(true);
    });

    it("should set isLoading = false, when finished fetching data", async () => {
      await waitFor(() => {
        expect(hookResult.current.isLoading).toEqual(false);
      });
    });

    it("should set isError = false, when fetching data successfully", async () => {
      await waitFor(() => {
        expect(hookResult.current.isError).toEqual(false);
      });
    });

    it("should return array of heroes, when fetching API for allHeroes", async () => {
      await waitFor(() => {
        expect(hookResult.current.data).toHaveLength(numberOfHeroesTotal); // ???
      });
    });

    it("should return successful data when calling allHeroes url", async () => {
      await waitFor(() => {
        expect(hookResult.current.isError).toEqual(false);
        expect(hookResult.current.data).toHaveLength(numberOfHeroesTotal);
        expect(hookResult.current.isLoading).toEqual(false);
      });
    });
  });

  describe("when calling wrong url", () => {
    beforeEach(() => {
      const { result } = renderHook(
        () => useServersRequest(ServerFetchUrls.WrongUrl),
        { wrapper }
      );

      hookResult = result;
    });

    it("should set isError = true, when error occurred during fetching data", async () => {
      await waitFor(() => {
        expect(hookResult.current.isError).toEqual(true);
      });
    });

    it("should return null in data, when fetching API with error", async () => {
      await waitFor(() => {
        expect(hookResult.current.data).toEqual(null);
      });
    });
  });

  describe("when calling api wor single hero data by id", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useServersRequest(heroUrl), {
        wrapper,
      });

      hookResult = result;
    });

    it("should return single hero, when fetching API for singleHero", async () => {
      await waitFor(() => {
        // is it OK to check result in this way, by using 'toHaveProperty' with 'name' property???
        expect(hookResult.current.data).toHaveProperty("name");
      });
    });
  });
});

const heroArraysTest = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
];

describe("when calling correct api, but server response error 404", () => {
  it("should return an error = true", async () => {
    const fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });
    const { result } = renderHook(
      () => useServersRequest(ServerFetchUrls.AllHeroes),
      { wrapper }
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current.isError).toEqual(true);
    });
  });
});
