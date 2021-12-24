import React, { FC } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { HeroData } from "types";
import { withStyles } from "@material-ui/core/styles";

type HeroDataProps = {
  hero: HeroData | null;
};

const StyledAccordion = withStyles({
  root: {
    minWidth: "300px",
    cursor: "pointer",
  },
})(Accordion);

const HeroCharacteristics: FC<HeroDataProps> = ({ hero }) => {
  const theme = useTheme();
  const isColumn = useMediaQuery(theme.breakpoints.down("sm"));

  const heroPowerstats = hero ? Object.keys(hero.powerstats) : [];
  const heroAppearance = hero ? Object.keys(hero.appearance) : [];
  const heroBiography = hero ? Object.keys(hero.biography) : [];
  const heroConnections = hero ? Object.keys(hero.connections) : [];
  const heroWork = hero ? Object.keys(hero.work) : [];

  return (
    <>
      <Typography
        variant={isColumn ? "h4" : "h2"}
        align="center"
        data-testid="header-hero-name"
      >
        {hero?.name}
      </Typography>
      <Box display="flex" flexDirection={isColumn ? "column" : "row"}>
        {hero && (
          <>
            <Box
              mr={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={isColumn ? `${hero.images.md}` : `${hero.images.lg}`}
                alt={hero?.name}
                title={hero?.name}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              minWidth={isColumn ? "320px" : "640px"}
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

        {!hero && (
          <Typography align="center" variant="h2">
            No such hero found
          </Typography>
        )}
      </Box>
    </>
  );
};

export default HeroCharacteristics;
