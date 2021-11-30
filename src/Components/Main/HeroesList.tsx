import { heroData } from "../../types";
import React, { FC } from "react";
import { Box, ImageList, ImageListItem } from "@material-ui/core";

type PropsHeroesList = {
  isMobile: boolean;
  showedHeroes: heroData[];
};

const HeroesList: FC<PropsHeroesList> = ({ isMobile, showedHeroes }) => {
  return (
    <Box maxWidth={isMobile ? "sm" : "lg"} px="24px">
      {showedHeroes.length > 0 && (
        <ImageList cols={isMobile ? 3 : 6} gap={2} rowHeight={170}>
          {showedHeroes.map((hero) => (
            <ImageListItem key={hero.id}>
              <img
                className="hero_card"
                src={`${hero.images.md}`}
                alt={`${hero.name} avatar`}
                width="115"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default HeroesList;
