import { HeroData } from "types";
import React, { FC } from "react";
import { IconButton, ImageListItemBar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { HeroImage } from "components/Main/HeroImage";

type PropsHeroCard = {
  hero: HeroData;
  toggleFavoriteHero: (hero: HeroData) => void;
};

export const HeroCard: FC<PropsHeroCard> = ({ hero, toggleFavoriteHero }) => {
  return (
    <>
      <HeroImage avatarSrc={hero.images.md} heroName={hero.name} />

      <ImageListItemBar
        title={
          <NavLink to={`/hero/${hero.name}/id/${hero.id}`}>{hero.name}</NavLink>
        }
        position="bottom"
        actionIcon={
          <IconButton
            aria-label={`heart ${hero.name}`}
            onClick={(): void => {
              toggleFavoriteHero(hero);
            }}
          >
            {hero.isFavorite ? (
              <Favorite
                color="error"
                data-testid={`icon-favorite-${hero.id}`}
              />
            ) : (
              <FavoriteBorder
                color="error"
                data-testid={`icon-not-favorite-${hero.id}`}
              />
            )}
          </IconButton>
        }
        actionPosition="left"
      />
    </>
  );
};
