import { useDispatch, useSelector } from "react-redux";

import { stateFavoriteHeroesByID } from "store/selectors";
import { addFavoriteHero, removeFavoriteHero } from "store/actions";
import { setFavoriteHeroesToSessionStorage } from "store/utils";

type TypeUseFavoriteHero = (
  id: number | undefined
) => [
  setAsFavorite: () => void,
  unsetAsFavorite: () => void,
  isFavorite: boolean
];

export const useFavoriteHero: TypeUseFavoriteHero = (
  id: number | undefined
) => {
  const dispatch = useDispatch();
  const favoriteHeroesIDS = useSelector(stateFavoriteHeroesByID);

  const heroId = id ? id : -1;

  const setAsFavorite = (): void => {
    dispatch(addFavoriteHero(heroId));
  };

  const unsetAsFavorite = (): void => {
    dispatch(removeFavoriteHero(heroId));
  };

  const isFavorite = favoriteHeroesIDS[heroId];

  setFavoriteHeroesToSessionStorage(favoriteHeroesIDS);

  return [setAsFavorite, unsetAsFavorite, isFavorite];
};
