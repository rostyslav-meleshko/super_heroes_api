import { HeroData } from "types";

type TypeDefinePaginatedHeroes = (
  heroes: HeroData[] | [],
  page: number,
  heroesPerPage: number,
  pagesQuantity: number
) => HeroData[] | [];

export const definePaginatedHeroes: TypeDefinePaginatedHeroes = (
  heroes,
  selectedPage,
  heroesPerPage,
  pagesQuantity
) => {
  if (!heroes.length) return [];

  const startIndex = (selectedPage - 1) * heroesPerPage;
  const endIndex =
    selectedPage > pagesQuantity ? selectedPage : heroesPerPage * selectedPage;

  return heroes.slice(startIndex, endIndex);
};
