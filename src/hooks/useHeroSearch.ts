import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
      searchParams.set("heroName", trimmedValue);
    } else {
      searchParams.delete("heroName");
    }

    history.push(`?${searchParams.toString()}`);
  }, [searchValue, history]);

  return [searchValue, setSearchValue];
};
