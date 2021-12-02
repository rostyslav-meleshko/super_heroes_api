import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { urlSearchOptions } from "../types";

type TypeUseHeroSearch = (
  value: string
) => [searchValue: string, setSearchValue: (value: string) => void];

export const useHeroSearch: TypeUseHeroSearch = (value = "") => {
  const [searchValue, setSearchValue] = useState(value);
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      searchParams.set(urlSearchOptions.HeroName, trimmedValue);
    } else {
      searchParams.delete(urlSearchOptions.HeroName);
    }
    history.push(`?${searchParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, history]);

  return [searchValue, setSearchValue];
};
