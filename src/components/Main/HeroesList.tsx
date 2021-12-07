import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import { HeroData } from "types";
import { setHeroAsFavorite, unsetHeroAsFavorite } from "store/actions";

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

  const setCurrentHeroAsFavorite = (hero: HeroData): void => {
    dispatch(setHeroAsFavorite(hero));
  };

  const unsetCurrentHeroAsFavorite = (hero: HeroData): void => {
    dispatch(unsetHeroAsFavorite(hero));
  };

  return (
    <Box>
      {showedHeroes.length > 0 && (
        <ImageList cols={isMobile ? 3 : 6} gap={2} rowHeight={160}>
          {showedHeroes.map((hero) => (
            <StyledImageListItem key={hero.id}>
              <img
                src={`${hero.images.md}`}
                alt={`${hero.name} avatar`}
                title={hero.name}
                width="100"
              />
              <ImageListItemBar
                title={
                  <NavLink to={`/hero/${hero.name}/id/${hero.id}`}>
                    {hero.name}
                  </NavLink>
                }
                position="bottom"
                actionIcon={
                  <IconButton
                    aria-label={`heart ${hero.name}`}
                    // className={classes.icon}
                  >
                    {hero.isFavorite ? (
                      <Favorite
                        color="error"
                        onClick={(): void => {
                          unsetCurrentHeroAsFavorite(hero);
                        }}
                      />
                    ) : (
                      <FavoriteBorder
                        color="error"
                        onClick={(): void => {
                          setCurrentHeroAsFavorite(hero);
                        }}
                      />
                    )}
                  </IconButton>
                }
                actionPosition="left"
                // className={classes.titleBar}
              />
            </StyledImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default HeroesList;
