import React from "react";
import { RenderResult } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { useServersRequest, UseServersResponse } from "hooks/useServersRequest";
import { ServerFetchUrls } from "types";
import store from "store/rootStore";

const numberOfHeroesTotal = 563;
const heroId = 1;
const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;
let hookResult: RenderResult<UseServersResponse<ServerFetchUrls>>;

describe("useServerRequest", () => {
  const wrapper = (
    { children } // how to typing this children with TS???
  ) => <Provider store={store}>{children}</Provider>;

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
      expect(hookResult.current.isLoading).toEqual(true); // how ty typing hookResult with TS????
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
        expect(hookResult.current.data).toHaveLength(numberOfHeroesTotal);
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
