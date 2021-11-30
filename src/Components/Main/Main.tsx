import React, { FC, useMemo, useState } from "react";
import {
  CircularProgress,
  Container,
  useMediaQuery,
  Box,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import HeroesList from "./HeroesList";
import { useAllHeroesRequest } from "../../hooks/useAllHeroesRequest";
import { definePaginatedHeroes } from "./utils/functions";

const Main: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { isLoading, data: heroes, isError } = useAllHeroesRequest();
  const [page, setPage] = useState(1);

  const heroesPerPage = isMobile ? 12 : 24;

  const paginationPagesQuantity = Math.ceil(heroes.length / heroesPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedHeroes = useMemo(() => {
    return definePaginatedHeroes(
      heroes,
      page,
      heroesPerPage,
      paginationPagesQuantity
    );
  }, [page, heroes, heroesPerPage, paginationPagesQuantity]);

  return (
    <main>
      <Box
        maxWidth={isMobile ? "sm" : "lg"}
        minWidth={isMobile ? "300px" : "600px"}
        mt="6px"
      >
        {isLoading && (
          <Container>
            <CircularProgress
              size={200}
              variant="indeterminate"
              thickness={3}
            />
          </Container>
        )}

        {isError && (
          <Container>
            <p>Loading error. Reload page</p>
          </Container>
        )}

        {!isLoading && !isError && (
          <HeroesList isMobile={isMobile} showedHeroes={paginatedHeroes} />
        )}

        <Box display="flex" justifyContent="center" mt="6px">
          <Pagination
            count={paginationPagesQuantity}
            size="small"
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </main>
  );
};

export default Main;
