import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { HeroData, ServerFetchUrls } from "types";
import { setAllHeroes } from "store/actions";

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
      // mock fetch, spy.on, test server 503, 404, etc...
      // status 200, isFailed = true;
      try {
        const response = await fetch(url);

        if (response?.status > 299) {
          console.log("response", response, "response.body", response.body);

          throw "Response status > 299";
        }

        const data = await response?.json();

        if (url === ServerFetchUrls.AllHeroes) {
          dispatch(setAllHeroes(data));
        }

        // console.log("data", data, "data.body", data.body);

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, url]);

  return { isLoading, data, isError };
};
