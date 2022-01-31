import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Box, ImageList, ImageListItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { HeroData } from "types";
import { toggleHeroAsFavorite } from "store/actions";
import { HeroCard } from "components/Main/HeroCard";

type PropsHeroesList = {
  isMobile: boolean;
  showedHeroes: HeroData[];
};

const StyledImageListItem = withStyles({
  root: {
    cursor: "pointer",
  },
})(ImageListItem);

const HeroesList: FC<PropsHeroesList> = ({ isMobile, showedHeroes }) => {
  const dispatch = useDispatch();

  const toggleFavoriteHero = (hero: HeroData): void => {
    dispatch(toggleHeroAsFavorite(hero));
  };

  return (
    <Box>
      {showedHeroes.length > 0 && (
        <ImageList cols={isMobile ? 3 : 6} gap={2} rowHeight={160}>
          {showedHeroes.map((hero) => (
            <StyledImageListItem key={hero.id}>
              <HeroCard hero={hero} toggleFavoriteHero={toggleFavoriteHero} />
            </StyledImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default HeroesList;
