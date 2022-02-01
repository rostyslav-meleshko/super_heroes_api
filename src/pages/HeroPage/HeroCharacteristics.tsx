import React, { FC } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { HeroData } from "types";
import { withStyles } from "@material-ui/core/styles";
import ErrorMessage from "components/ui/ErrorMessage";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { toggleHeroAsFavorite } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { stateFavoriteHeroes } from "store/selectors";

type HeroDataProps = {
  hero: HeroData | null;
};

// TODO: adjust styling. Make responsible markup for the Accordion
const StyledAccordion = withStyles({
  root: {
    minWidth: "300px",
    cursor: "pointer",
  },
})(Accordion);

const HeroCharacteristics: FC<HeroDataProps> = ({ hero }) => {
  const dispatch = useDispatch();
  const favoriteHeroes = useSelector(stateFavoriteHeroes);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleFavoriteHero = (hero: HeroData): void => {
    dispatch(toggleHeroAsFavorite(hero));
  };

  const isFavoriteHero = (): boolean => {
    return favoriteHeroes.findIndex((favHero) => hero?.id === favHero.id) >= 0
      ? true
      : false;
  };

  const heroPowerstats = hero ? Object.keys(hero.powerstats) : [];
  const heroAppearance = hero ? Object.keys(hero.appearance) : [];
  const heroBiography = hero ? Object.keys(hero.biography) : [];
  const heroConnections = hero ? Object.keys(hero.connections) : [];
  const heroWork = hero ? Object.keys(hero.work) : [];

  return (
    <>
      <Typography
        variant={isMobile ? "h4" : "h2"}
        align="center"
        data-testid="header-hero-name"
      >
        {hero?.name}
        <>
          <IconButton
            aria-label={`heart-hero-page ${hero?.name}`}
            onClick={(): void => {
              if (hero) {
                console.log("hero data", hero);
                toggleFavoriteHero(hero);
              }
            }}
          >
            {isFavoriteHero() ? (
              <Favorite
                color="error"
                data-testid={`icon-favorite-hero-page-${hero?.id}`}
              />
            ) : (
              <FavoriteBorder
                color="error"
                data-testid={`icon-not-favorite-hero-page-${hero?.id}`}
              />
            )}
          </IconButton>
        </>
      </Typography>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
        {hero && (
          <>
            <Box
              mr={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={isMobile ? `${hero.images.md}` : `${hero.images.lg}`}
                alt={hero?.name}
                title={hero?.name}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              minWidth={isMobile ? "320px" : "640px"}
            >
              <StyledAccordion variant="outlined">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  title="Powerstats"
                >
                  <Typography>Powerstats</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {heroPowerstats.map((stat: string) => (
                    <Typography key={stat} variant="caption">
                      <br />
                      <p>
                        {stat} : {hero?.powerstats[stat]}
                      </p>{" "}
                      <br />
                    </Typography>
                  ))}
                </AccordionDetails>
              </StyledAccordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  title="Appearance"
                >
                  <Typography>Appearance</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {heroAppearance.map((app: string) => (
                    <Typography key={app}>
                      {app} :{" "}
                      {app === "height"
                        ? hero?.appearance["height"][1]
                        : app === "weight"
                        ? hero?.appearance["weight"][1]
                        : hero?.appearance[app]}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  title="Biography"
                >
                  <Typography>Biography</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {heroBiography.map((bio: string) => (
                    <Typography key={bio} noWrap={false}>
                      {bio} : {hero?.biography[bio]}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  title="Connections"
                >
                  <Typography>Connections</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {heroConnections.map((connection: string) => (
                    <Typography key={connection}>
                      {connection} : {hero?.connections[connection]}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  title="Work"
                >
                  <Typography>Work</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {heroWork.map((work: string) => (
                    <Typography key={work}>
                      {work} : {hero?.work[work]}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        )}

        {!hero && <ErrorMessage text="No such hero found" />}
      </Box>
    </>
  );
};

export default HeroCharacteristics;
