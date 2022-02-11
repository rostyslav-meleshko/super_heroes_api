import {
  FC,
  useMemo,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { UrlSearchOptions } from "types";
import { useHistory, useLocation } from "react-router-dom";

type FilterParamsType = {
  [k: string]: string[];

  alignment: string[];
  gender: string[];
  race: string[];
  eyeColor: string[];
  hairColor: string[];
  publisher: string[];
};

const defaultFilterParams: FilterParamsType = {
  alignment: [],
  gender: [],
  race: [],
  eyeColor: [],
  hairColor: [],
  publisher: [],
};

interface FilterContextType {
  filterParams: FilterParamsType;
  setFilterParams: Dispatch<SetStateAction<FilterParamsType>>;
  isFiltered: boolean;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: FilterContextType = {
  filterParams: defaultFilterParams,
  setFilterParams: (): void => {},
  isFiltered: false,
  setIsFiltered: (): void => {},
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext =
  createContext<FilterContextType>(defaultContextValue);

export const FilterProvider: FC<FilterProviderProps> = ({
  children,
}): JSX.Element => {
  const [filterParams, setFilterParams] =
    useState<FilterParamsType>(defaultFilterParams);

  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const addFilterParamsToUrl = (): void => {
    for (let param in filterParams) {
      if (filterParams[param].length > 0) {
        const queryString = filterParams[param].join("+");
        searchParams.set(param, queryString);
      } else {
        searchParams.delete(param);
      }

      history.push(`?${searchParams.toString()}`);
    }
  };

  const toggleIsFilteredInUrl = (): void => {
    if (isFiltered) {
      searchParams.set(UrlSearchOptions.IsFiltered, "true");
    } else {
      searchParams.delete(UrlSearchOptions.IsFiltered);
    }

    history.push(`?${searchParams.toString()}`);
  };

  const parseFilterParamsFromURLToState1 = useCallback(() => {
    const newFilterParams: FilterParamsType = defaultFilterParams;

    searchParams.forEach((options, param) => {
      if (Object.keys(filterParams).includes(param)) {
        newFilterParams[param] = options.split("+");
      }
    });

    setFilterParams(newFilterParams);
  }, [searchParams]);

  const parseFilterParamsFromURLToState = (): void => {
    const newFilterParams: FilterParamsType = defaultFilterParams;

    searchParams.forEach((options, param) => {
      if (Object.keys(filterParams).includes(param)) {
        newFilterParams[param] = options.split("+");
      }
    });

    setFilterParams(newFilterParams);
  };

  const parseIsFilterFromURLToState = (): void => {
    const isFilterApplied = searchParams.get(UrlSearchOptions.IsFiltered);

    if (isFilterApplied) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  };

  const parseIsFilterFromURLToState1 = useCallback(() => {
    const isFilterApplied = searchParams.get(UrlSearchOptions.IsFiltered);

    if (isFilterApplied) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("USEEFFECT IN CONTEXT");
    parseFilterParamsFromURLToState1();
    parseIsFilterFromURLToState1();
  }, []);

  useEffect(() => {
    toggleIsFilteredInUrl();
  }, [isFiltered]);

  useEffect(() => {
    addFilterParamsToUrl();
  }, [filterParams]);

  const contextValue = useMemo(() => {
    return { filterParams, setFilterParams, isFiltered, setIsFiltered };
  }, [filterParams, isFiltered]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
