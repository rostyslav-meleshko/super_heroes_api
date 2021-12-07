import { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  useMediaQuery,
  Grid,
  useTheme,
  Typography,
} from "@material-ui/core";

import { stateAllHeroes } from "store/selectors";

const HeroPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const location = useLocation();
  const { heroName, heroId } =
    useParams<{ heroName: string; heroId: string }>();
  const allHeroes = useSelector(stateAllHeroes);
  const currentHero = allHeroes.find((hero) => hero.id === +heroId);

  console.log(currentHero, heroName, location);

  useEffect(() => {}, []);
  return (
    <Container>
      <Typography variant={isMobile ? "h4" : "h2"} align="center">
        {currentHero?.name}
      </Typography>
      <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
        {currentHero && (
          <>
            <Grid item xs={6}>
              <img
                src={
                  isMobile
                    ? `${currentHero.images.md}`
                    : `${currentHero.images.lg}`
                }
                alt={currentHero?.name}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </>
        )}

        {!currentHero && (
          <Typography align="center" variant="h2">
            No such hero found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default HeroPage;
