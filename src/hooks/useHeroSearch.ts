import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { UrlSearchOptions } from "types";

type TypeUseHeroSearch = () => [
  searchValue: string,
  setSearchValue: (value: string) => void
];

export const useHeroSearch: TypeUseHeroSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      searchParams.set(UrlSearchOptions.HeroName, trimmedValue);
    } else {
      searchParams.delete(UrlSearchOptions.HeroName);
    }

    if (!history.location.search.includes(searchParams.toString())) {
      history.push(`?${searchParams.toString()}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, history.location.search]);

  return [searchValue, setSearchValue];
};
