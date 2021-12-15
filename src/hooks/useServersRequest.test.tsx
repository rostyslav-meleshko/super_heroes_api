import { screen, render, waitFor } from "@testing-library/react";
import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { useServersRequest } from "hooks/useServersRequest";
import { ServerFetchUrls } from "types";
import Main from "components/Main/Main";
import store from "store/rootStore";
// ServerFetchUrls.AllHeroes

const numberOfHeroesTotal = 563;
const heroId = 1;
const heroName = "A-Bomb";
const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;

describe("useServerRequest", () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  it("should set isLoading = true, when start fetching data", () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.AllHeroes)
    );

    expect(result.current.isLoading).toEqual(true);
  });

  it("should set isLoading = false, when finished fetching data", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.AllHeroes)
    );

    await waitFor(() => {
      expect(result.current.isLoading).toEqual(false);
    });
  });

  it("should set isError = false, when fetching data successfully", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.AllHeroes)
    );

    await waitFor(() => {
      expect(result.current.isError).toEqual(false);
    });
  });

  it("should set isError = true, when error occurred during fetching data", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.WrongUrl)
    );

    await waitFor(() => {
      expect(result.current.isError).toEqual(true);
    });
  });

  it("should return array of heroes, when fetching API for allHeroes", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.AllHeroes)
    );

    await waitFor(() => {
      expect(result.current.data).toHaveLength(numberOfHeroesTotal);
    });
  });

  it("should return single hero, when fetching API for singleHero", async () => {
    const { result } = renderHook(() => useServersRequest(heroUrl));

    await waitFor(() => {
      expect(result.current.data).toHaveProperty("name");
    });
  });

  it("should return null in data, when fetching API with error", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.WrongUrl)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(null);
    });
  });

  it("should return successful data when calling allHeroes url", async () => {
    const { result } = renderHook(() =>
      useServersRequest(ServerFetchUrls.AllHeroes)
    );

    // worked correctly, when dispatch in original hook commented

    await waitFor(() => {
      expect(result.current.isError).toEqual(false);
      expect(result.current.data).toHaveLength(numberOfHeroesTotal);
      expect(result.current.isLoading).toEqual(false);
    });
  });
});
