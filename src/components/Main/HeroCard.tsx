import { HeroData } from "types";
import React, { FC } from "react";
import { IconButton, ImageListItemBar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { HeroImage } from "components/Main/HeroImage";
import { useFavoriteHero } from "hooks/useFavoriteHero";

type PropsHeroCard = {
  hero: HeroData;
};

export const HeroCard: FC<PropsHeroCard> = ({ hero }) => {
  const [setAsFavorite, unsetAsFavorite, isFavorite] = useFavoriteHero(hero.id);

  return (
    <>
      <HeroImage avatarSrc={hero.images.md} heroName={hero.name} />

      <ImageListItemBar
        title={
          <NavLink to={`/hero/${hero.name}/id/${hero.id}`}>{hero.name}</NavLink>
        }
        position="bottom"
        actionIcon={
          isFavorite ? (
            <IconButton
              aria-label={`heart ${hero.name}`}
              onClick={unsetAsFavorite}
            >
              <Favorite
                color="error"
                data-testid={`icon-favorite-${hero.id}`}
              />
            </IconButton>
          ) : (
            <IconButton
              aria-label={`heart ${hero.name}`}
              onClick={setAsFavorite}
            >
              <FavoriteBorder
                color="error"
                data-testid={`icon-not-favorite-${hero.id}`}
              />
            </IconButton>
          )
        }
        actionPosition="left"
      />
    </>
  );
};
