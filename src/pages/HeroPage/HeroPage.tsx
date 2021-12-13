import React, { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CardHeader,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@material-ui/core";

import { ServerFetchUrls } from "types";
import { useServersRequest } from "hooks/useServersRequest";

const HeroPage: FC = () => {
  const theme = useTheme();
  const isColumn = useMediaQuery(theme.breakpoints.down("sm"));

  const { heroId } = useParams<{ heroId: string }>();
  const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;
  const {
    isLoading,
    data: hero,
    isError,
  } = useServersRequest<ServerFetchUrls.HeroDataById>(heroUrl);

  const heroPowerstats = hero ? Object.keys(hero.powerstats) : [];
  const heroAppearance = hero ? Object.keys(hero.appearance) : [];
  const heroBiography = hero ? Object.keys(hero.biography) : [];
  const heroConnections = hero ? Object.keys(hero.connections) : [];
  const heroWork = hero ? Object.keys(hero.work) : [];

  console.log(heroAppearance);
  console.log(hero?.slug);

  return (
    <Box
      maxWidth={isColumn ? "sm" : "lg"}
      minWidth={isColumn ? "320px" : "600px"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="100px"
        >
          <CircularProgress size={200} variant="indeterminate" thickness={3} />
        </Box>
      )}

      {isError && (
        <Container>
          <Typography variant="h4" align="center" color="error">
            Loading error. Reload page
          </Typography>
        </Container>
      )}

      {!isLoading && !isError && (
        <>
          <Typography variant={isColumn ? "h4" : "h2"} align="center">
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
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  flexWrap="wrap"
                >
                  <Card>
                    <CardHeader title="Slug"></CardHeader>
                    <CardContent>
                      <Typography>{hero?.slug.toUpperCase()}</Typography>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Powerstats"></CardHeader>
                    <CardContent>
                      {heroPowerstats.map((stat: string) => (
                        <Typography key={stat}>
                          {stat} : {hero?.powerstats[stat]}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Appearance"></CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>

                  {/*<Container maxWidth="sm">*/}
                  <Card>
                    <CardHeader title="Biography"></CardHeader>
                    <CardContent>
                      {heroBiography.map((bio: string) => (
                        <Typography key={bio} noWrap={false}>
                          {bio} : {hero?.biography[bio]}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                  {/*</Container>*/}

                  <Card>
                    <CardHeader title="Connections"></CardHeader>
                    <CardContent>
                      {heroConnections.map((connection: string) => (
                        <Typography key={connection}>
                          {connection} : {hero?.connections[connection]}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Connections"></CardHeader>
                    <CardContent>
                      {heroWork.map((work: string) => (
                        <Typography key={work}>
                          {work} : {hero?.work[work]}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
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
      )}
    </Box>
  );
};

export default HeroPage;
