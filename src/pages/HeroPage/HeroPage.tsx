import React, { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import HeroCharacteristics from "./HeroCharacteristics";
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
          data-testid="loader"
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

      {!isLoading && !isError && <HeroCharacteristics hero={hero} />}
    </Box>
  );
};

export default HeroPage;
