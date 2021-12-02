import React, { FC, useMemo, useState } from "react";
import {
  CircularProgress,
  Container,
  useMediaQuery,
  Box,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import HeroesList from "./HeroesList";
import { useAllHeroesRequest } from "../../hooks/useAllHeroesRequest";
import { definePaginatedHeroes } from "./utils";
import { useLocation } from "react-router-dom";

const Main: FC = () => {
  const theme = useTheme();
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

  const paginationPagesQuantity =
    Math.ceil(heroesSearchedByName.length / heroesPerPage) || 1;

  const paginatedHeroes = useMemo(() => {
    return definePaginatedHeroes(
      heroesSearchedByName,
      page,
      heroesPerPage,
      paginationPagesQuantity
    );
  }, [page, heroesPerPage, paginationPagesQuantity, heroesSearchedByName]);

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

        {!isLoading && !isError && (
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
