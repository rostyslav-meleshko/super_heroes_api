import { useEffect, useState } from "react";
import { HeroData } from "types";

export const useAllHeroesRequest = () => {
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

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data, isError };
};
