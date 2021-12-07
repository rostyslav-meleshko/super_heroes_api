import { RootState } from "store/rootStore";
import { HeroData } from "types";

type ToggleFavoriteHero = (
  state: RootState,
  hero: HeroData,
  actionWithHero: "ADD" | "DELETE"
) => RootState;

export const toggleFavoriteHero: ToggleFavoriteHero = (
  state,
  hero,
  actionWithHero
) => {
  const requiredHeroIndex = state.allHeroes.findIndex(
    (stateHero) => stateHero.id === hero.id
  );

  if (requiredHeroIndex >= 0) {
    const newAllHeroes = [...state.allHeroes];
    let newFavoriteHeroes;

    if (actionWithHero === "ADD") {
      newAllHeroes[requiredHeroIndex].isFavorite = true;
      newFavoriteHeroes = [...state.favoriteHeroes, hero];
    } else {
      newAllHeroes[requiredHeroIndex].isFavorite = false;
      newFavoriteHeroes = [...state.favoriteHeroes].filter(
        (stateHero) => stateHero.id !== hero.id
      );
    }

    return {
      ...state,
      allHeroes: [...newAllHeroes],
      favoriteHeroes: [...newFavoriteHeroes],
    };
  } else {
    return { ...state };
  }
};
