import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { ServerFetchUrls } from "types";
import { useServersRequest } from "hooks/useServersRequest";

const HeroPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { heroId } = useParams<{ heroId: string }>();
  const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;
  const {
    isLoading,
    data: hero,
    isError,
  } = useServersRequest<ServerFetchUrls.HeroDataById>(heroUrl);

  console.log(isLoading, hero, isError);
  return (
    <Container>
      <Typography variant={isMobile ? "h4" : "h2"} align="center">
        {hero?.name}
      </Typography>
      <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
        {hero && (
          <>
            <Grid item xs={6}>
              <img
                src={isMobile ? `${hero.images.md}` : `${hero.images.lg}`}
                alt={hero?.name}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </>
        )}

        {!hero && (
          <Typography align="center" variant="h2">
            No such hero found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default HeroPage;
