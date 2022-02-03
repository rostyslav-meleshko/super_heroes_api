import React, { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import HeroesList from "./HeroesList";
import ErrorMessage from "components/ui/ErrorMessage";
import Loader from "components/ui/Loader";
// import { stateFavoriteHeroes } from "store/selectors";
import { useServersRequest } from "hooks/useServersRequest";
import { definePaginatedHeroes } from "./utils";
import { UrlSearchOptions, ServerFetchUrls } from "types";
import { stateFavoriteHeroesByID } from "store/selectors";

const Main: FC = () => {
  const theme = useTheme();
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
  const favoriteHeroesIDs = useSelector(stateFavoriteHeroesByID);
  // const favoriteHeroes = useSelector(stateFavoriteHeroes);

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const {
    isLoading,
    data: heroes,
    isError,
  } = useServersRequest<ServerFetchUrls.AllHeroes>(ServerFetchUrls.AllHeroes);

  const favoriteHeroes = useMemo(() => {
    return heroes ? heroes.filter((hero) => favoriteHeroesIDs[hero.id]) : [];
  }, [favoriteHeroesIDs, heroes]);

  const [page, setPage] = useState(1);
  const { search } = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  useEffect(() => {
    if (searchParams.get(UrlSearchOptions.IsFavorite)) {
      setIsOnlyFavorite(true);
    } else {
      setIsOnlyFavorite(false);
    }
  }, [search, searchParams]);

  const heroesPerPage = isMobile ? 12 : 24;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  const heroesSearchedByName = useMemo(() => {
    const query = searchParams.get("heroName")?.toLowerCase() || "";

    if (heroes) {
      if (query.length >= 3) {
        return heroes.filter((hero) =>
          hero.name.toLowerCase()?.includes(query)
        );
      } else {
        return heroes;
      }
    } else {
      return [];
    }
  }, [heroes, searchParams]);

  const paginationPagesQuantity = useMemo(() => {
    if (isOnlyFavorite) {
      return Math.ceil(favoriteHeroes.length / heroesPerPage) || 1;
    } else {
      return Math.ceil(heroesSearchedByName.length / heroesPerPage) || 1;
    }
  }, [favoriteHeroes, heroesSearchedByName, heroesPerPage, isOnlyFavorite]);

  const paginatedHeroes = useMemo(() => {
    const heroesForPagination = isOnlyFavorite
      ? favoriteHeroes
      : heroesSearchedByName;

    return definePaginatedHeroes(
      heroesForPagination,
      page,
      heroesPerPage,
      paginationPagesQuantity
    );
  }, [
    page,
    heroesPerPage,
    paginationPagesQuantity,
    heroesSearchedByName,
    isOnlyFavorite,
    favoriteHeroes,
  ]);

  const ifNoFavoriteHeroes = isOnlyFavorite && !paginatedHeroes.length;
  const isHeroesLoadedSuccessfully =
    !isLoading && !isError && paginatedHeroes.length > 0;

  return (
    <main>
      <Box
        maxWidth={isMobile ? "sm" : "lg"}
        minWidth={isMobile ? "300px" : "600px"}
        mt="6px"
      >
        {isLoading && <Loader />}

        {isError && <ErrorMessage text="Loading error. Reload page" />}

        {ifNoFavoriteHeroes && (
          <Typography variant="h5" align="center">
            You don't have favourite heroes yet
          </Typography>
        )}

        {isHeroesLoadedSuccessfully && (
          <>
            <HeroesList isMobile={isMobile} showedHeroes={paginatedHeroes} />

            <Box display="flex" justifyContent="center" mt="6px">
              <Pagination
                count={paginationPagesQuantity}
                size="small"
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Box>
    </main>
  );
};

export default Main;
