import React, { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import { stateFavoriteHeroes } from "store/selectors";
import HeroesList from "./HeroesList";
import { useAllHeroesRequest } from "hooks/useAllHeroesRequest";
import { definePaginatedHeroes } from "./utils";
import { UrlSearchOptions } from "types";

const Main: FC = () => {
  const theme = useTheme();
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
  const favoriteHeroes = useSelector(stateFavoriteHeroes);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { isLoading, data: heroes, isError } = useAllHeroesRequest();
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

    if (query.length >= 3) {
      return heroes.filter((hero) => hero.name.toLowerCase()?.includes(query));
    } else {
      return heroes;
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

  return (
    <main>
      <Box
        maxWidth={isMobile ? "sm" : "lg"}
        minWidth={isMobile ? "300px" : "600px"}
        mt="6px"
      >
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="100px"
          >
            <CircularProgress
              size={200}
              variant="indeterminate"
              thickness={3}
            />
          </Box>
        )}

        {isError && (
          <Container>
            <Typography variant="h4" align="center" color="error">
              Loading error. Reload page
            </Typography>
          </Container>
        )}

        {isOnlyFavorite && !paginatedHeroes.length && (
          <Typography variant="h5" align="center">
            You don't have favourite heroes yet
          </Typography>
        )}

        {!isLoading && !isError && (
          <>
            <HeroesList isMobile={isMobile} showedHeroes={paginatedHeroes} />

            {paginatedHeroes.length > 0 && (
              <Box display="flex" justifyContent="center" mt="6px">
                <Pagination
                  count={paginationPagesQuantity}
                  size="small"
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </main>
  );
};

export default Main;
