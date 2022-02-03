import { useDispatch, useSelector } from "react-redux";

import { stateFavoriteHeroesByID } from "store/selectors";
import { addFavoriteHero, removeFavoriteHero } from "store/actions";
import { HeroData } from "types";
import { setFavoriteHeroesToSessionStorage } from "store/utils";

type TypeUseFavoriteHero = (
  id: number | undefined
) => [
  setAsFavorite: (hero: HeroData) => void,
  unsetAsFavorite: (hero: HeroData) => void,
  isFavorite: boolean
];

export const useFavoriteHeroes: TypeUseFavoriteHero = (
  id: number | undefined
) => {
  const dispatch = useDispatch();
  const favoriteHeroesIDS = useSelector(stateFavoriteHeroesByID);

  const setAsFavorite = (hero: HeroData): void => {
    dispatch(addFavoriteHero(hero));
  };

  const unsetAsFavorite = (hero: HeroData): void => {
    dispatch(removeFavoriteHero(hero));
  };

  let isFavorite = false;

  if (id) {
    isFavorite = favoriteHeroesIDS[id] ? favoriteHeroesIDS[id] : false;
  }

  setFavoriteHeroesToSessionStorage(favoriteHeroesIDS);

  return [setAsFavorite, unsetAsFavorite, isFavorite];
};
