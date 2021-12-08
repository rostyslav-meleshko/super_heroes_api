import { RootState } from "store/rootStore";
import { HeroData } from "types";

type ToggleFavoriteHero = (state: RootState, hero: HeroData) => RootState;

export const toggleFavoriteHero: ToggleFavoriteHero = (state, hero) => {
  let heroIndex = -1;
  const newAllHeroes = [...state.allHeroes];
  let newFavoriteHeroes = [...state.favoriteHeroes];

  // cycle for could be started exactly from i = hero.id - 1,
  // if we know, that array of allHeroes sorted by id in asc order on server
  for (let i = 0; i < newAllHeroes.length; i++) {
    if (hero.id === newAllHeroes[i].id) {
      heroIndex = i;

      if (!hero.isFavorite) {
        newAllHeroes[heroIndex].isFavorite = true;
        newFavoriteHeroes = [...newFavoriteHeroes, hero];
      } else {
        newAllHeroes[heroIndex].isFavorite = false;
        newFavoriteHeroes = newFavoriteHeroes.filter(
          (stateHero) => stateHero.id !== hero.id
        );

        break;
      }
    }
  }

  if (heroIndex >= 0) {
    return {
      ...state,
      allHeroes: [...newAllHeroes],
      favoriteHeroes: [...newFavoriteHeroes],
    };
  } else {
    return state;
  }
};
