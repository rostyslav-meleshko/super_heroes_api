import {heroData} from "../../types";
import React, {FC} from "react";
import {Container, ImageList, ImageListItem} from "@material-ui/core";

type PropsHeroesList = {
  isMobile: boolean;
  showedHeroes: heroData[] | [];
};

const HeroesList: FC<PropsHeroesList> = ({ isMobile, showedHeroes }) => {
  return (
    <Container maxWidth={isMobile ? "sm" : "lg"}>
      Heroes list
      {isMobile && <p> mobile </p>}
      {showedHeroes.length > 0 && (
        <ImageList cols={isMobile ? 3 : 6} gap={2} rowHeight={180}>
          {showedHeroes.map((hero) => (
            <ImageListItem key={hero.id}>
              <img
                className="hero_card"
                src={`${hero.images.md}`}
                alt={`${hero.name} avatar`}
                width="120"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>
  );
};

export default HeroesList;