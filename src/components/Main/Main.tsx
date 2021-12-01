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
import { useHistory, useLocation } from "react-router-dom";
import { serialize } from "v8";

const Main: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { isLoading, data: heroes, isError } = useAllHeroesRequest();
  const [page, setPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const heroesPerPage = isMobile ? 12 : 24;

  const paginationPagesQuantity = Math.ceil(heroes.length / heroesPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const heroesFilteredByName = useMemo(() => {
    const query = searchParams.get("heroName")?.toLocaleLowerCase() || "";
    return heroes.filter((hero) => hero.name.toLowerCase()?.includes(query));
  }, [searchParams, heroes]);

  const paginatedHeroes = useMemo(() => {
    return definePaginatedHeroes(
      heroesFilteredByName,
      page,
      heroesPerPage,
      paginationPagesQuantity
    );
  }, [page, heroesPerPage, paginationPagesQuantity, heroesFilteredByName]);

  console.log("theme", theme);
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
