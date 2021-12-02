import { heroData } from "../../types";
import React, { FC } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

type PropsHeroesList = {
  isMobile: boolean;
  showedHeroes: heroData[];
};

const StyledImageListItem = withStyles({
  root: {
    cursor: "pointer",
  },
})(ImageListItem);

const HeroesList: FC<PropsHeroesList> = ({ isMobile, showedHeroes }) => {
  // const classes = useStyles();

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
                // title={hero.name}
                position="bottom"
                actionIcon={
                  <IconButton
                    aria-label={`heart ${hero.name}`}
                    // className={classes.icon}
                  >
                    {hero.name !== "Batman" ? (
                      <FavoriteBorder color="error" />
                    ) : (
                      <Favorite color="error" />
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
