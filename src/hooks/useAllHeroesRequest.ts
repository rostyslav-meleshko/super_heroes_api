import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { HeroData } from "types";
import { setAllHeroes } from "store/actions";

export const useAllHeroesRequest = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<HeroData[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://akabab.github.io/superhero-api/api/all.json"
        );
        const data = await response?.json();

        dispatch(setAllHeroes(data));
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return { isLoading, data, isError };
};
