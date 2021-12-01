import { URLSearchParams } from "url";

type TypeHandleHeroNameInSearchParams = (
  searchParams: URLSearchParams,
  searchName: string,
  searchValue: string
) => void;

export const handleHeroNameInSearchParams: TypeHandleHeroNameInSearchParams = (
  searchParams,
  searchName,
  searchValue
) => {
  if (searchValue.trim()) {
    searchParams.set(searchName, searchValue);
  } else {
    searchParams.delete(searchName);
  }
};
