import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { HeroData, ServerFetchUrls } from "types";

type ResponseData<T> = T extends ServerFetchUrls.AllHeroes
  ? HeroData[]
  : HeroData;

export interface UseServersResponse<T extends ServerFetchUrls> {
  isLoading: boolean;
  data: ResponseData<T> | null;
  isError: boolean;
}

export const useServersRequest = <T extends ServerFetchUrls>(
  url: string
): UseServersResponse<T> => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseData<T> | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);

        if (response?.status > 299) {
          throw new Error("Response status > 299");
        }

        const data = await response?.json();

        setData(data);
      } catch (error) {
        console.warn(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { isLoading, data, isError };
};
