import { RootState } from "store/rootStore";
import { HeroData } from "types";

type MergeAllHeroesWithFavorite = (
  state: RootState,
  heroesFromServer: HeroData[]
) => RootState;

export const mergeAllHeroesWithFavorite: MergeAllHeroesWithFavorite = (
  state,
  heroesFromServer
) => {
  if (!state.favoriteHeroes.length) {
    return {
      ...state,
      allHeroes: [...heroesFromServer],
    };
  } else {
    const newAllHeroes = [...heroesFromServer];

    for (let i = 0; i < state.favoriteHeroes.length; i++) {
      const heroId = state.favoriteHeroes[i].id - 1;

      newAllHeroes[heroId].isFavorite = true;
    }

    return {
      ...state,
      allHeroes: [...newAllHeroes],
    };
  }
};

type ToggleFavoriteHero = (state: RootState, hero: HeroData) => RootState;

export const toggleFavoriteHero: ToggleFavoriteHero = (state, hero) => {
  let heroIndex = -1;
  console.log("state.favoriteHeroes", state.favoriteHeroes);
  console.log("state.allHeroes", state.allHeroes);

  const newAllHeroes = [...state.allHeroes];
  let newFavoriteHeroes = [...state.favoriteHeroes];

  // cycle for could be started exactly from i = hero.id - 1,
  // if we know, that array of allHeroes sorted by id in asc order on server
  for (let i = 0; i < newAllHeroes.length; i++) {
    if (hero.id === newAllHeroes[i].id) {
      heroIndex = i;

      if (
        !hero.isFavorite &&
        !newFavoriteHeroes.filter((favHero) => favHero.id === hero.id).length
      ) {
        newAllHeroes[heroIndex].isFavorite = true;
        hero.isFavorite = true;
        newFavoriteHeroes = [...newFavoriteHeroes, hero].sort(
          (a, b) => a.id - b.id
        );
      } else {
        newAllHeroes[heroIndex].isFavorite = false;
        newFavoriteHeroes = newFavoriteHeroes.filter(
          (stateHero) => stateHero.id !== hero.id
        );

        break;
      }
    }
  }

  console.log("heroIndex", heroIndex);
  console.log("newAllHeroes", newAllHeroes);
  console.log("newFavoriteHeroes", newFavoriteHeroes);

  if (!newAllHeroes.length || heroIndex === -1) {
    const favHeroIndex = newFavoriteHeroes.findIndex(
      (favHero) => favHero.id === hero.id
    );

    if (favHeroIndex < 0) {
      hero.isFavorite = true;
      newFavoriteHeroes = [...newFavoriteHeroes, hero].sort(
        (a, b) => a.id - b.id
      );
    } else {
      newFavoriteHeroes = newFavoriteHeroes.filter(
        (stateHero) => stateHero.id !== hero.id
      );
    }

    heroIndex = 0;
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
