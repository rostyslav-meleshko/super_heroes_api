import React, { FC, useMemo, useState } from "react";
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

import {
  stateFavoriteHeroesIDs,
  stateIsFavoriteHeroesOnly,
} from "store/selectors";
import HeroesList from "./HeroesList";
import { useAllHeroesRequest } from "hooks/useAllHeroesRequest";
import { definePaginatedHeroes } from "./utils";

const Main: FC = () => {
  const theme = useTheme();
  const isOnlyFavoriteHeroesShowed = useSelector(stateIsFavoriteHeroesOnly);
  const favoriteHeroesIds = useSelector(stateFavoriteHeroesIDs);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { isLoading, data: heroes, isError } = useAllHeroesRequest();
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const heroesPerPage = isMobile ? 12 : 24;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const heroesSearchedByName = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("heroName")?.toLowerCase() || "";

    if (query.length >= 3) {
      return heroes.filter((hero) => hero.name.toLowerCase()?.includes(query));
    } else {
      return heroes;
    }
  }, [heroes, search]);

  const favoriteHeroes = useMemo(() => {
    return heroes.filter((hero) => favoriteHeroesIds[hero.id]);
  }, [favoriteHeroesIds, heroes]);

  const paginationPagesQuantity = useMemo(() => {
    if (isOnlyFavoriteHeroesShowed) {
      return Math.ceil(favoriteHeroes.length / heroesPerPage) || 1;
    } else {
      return Math.ceil(heroesSearchedByName.length / heroesPerPage) || 1;
    }
  }, [
    favoriteHeroes,
    heroesSearchedByName,
    isOnlyFavoriteHeroesShowed,
    heroesPerPage,
  ]);

  const paginatedHeroes = useMemo(() => {
    const heroesForPagination = isOnlyFavoriteHeroesShowed
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
    isOnlyFavoriteHeroesShowed,
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

        {isOnlyFavoriteHeroesShowed && !paginatedHeroes.length && (
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
