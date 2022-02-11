import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import HeroCharacteristics from "./HeroCharacteristics";
import { ServerFetchUrls } from "types";
import { useServersRequest } from "hooks/useServersRequest";
import Loader from "components/ui/Loader";
import ErrorMessage from "components/ui/ErrorMessage";

const HeroPageBox = withStyles({
  root: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})(Box);

const HeroPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { heroId } = useParams<{ heroId: string }>();
  const heroUrl = `${ServerFetchUrls.HeroDataById}${heroId}.json`;

  const {
    isLoading,
    data: hero,
    isError,
  } = useServersRequest<ServerFetchUrls.HeroDataById>(heroUrl);

  const isHeroesLoadedSuccessfully = !isLoading && !isError;

  console.log(hero);
  return (
    <HeroPageBox
      maxWidth={isMobile ? "sm" : "lg"}
      minWidth={isMobile ? "320px" : "600px"}
    >
      {isLoading && <Loader />}

      {isError && <ErrorMessage text="Loading error. Reload page" />}

      {isHeroesLoadedSuccessfully && <HeroCharacteristics hero={hero} />}
    </HeroPageBox>
  );
};

export default HeroPage;
