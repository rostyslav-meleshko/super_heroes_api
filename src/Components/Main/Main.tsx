import React, { FC, useMemo, useState } from "react";
import { CircularProgress, Container, useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import HeroesList from "./HeroesList";
import { useAllHeroesRequest } from "../../hooks/useAllHeroesRequest";
import { definePaginatedHeroes } from "./utils/functions";

const Main: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
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
      {isLoading && (
        <Container>
          <CircularProgress size={200} variant="indeterminate" thickness={3} />
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

      <Container maxWidth={isMobile ? "sm" : "lg"}>
        <Pagination
          count={paginationPagesQuantity}
          size="small"
          page={page}
          onChange={handlePageChange}
        />
      </Container>
    </main>
  );
};

export default Main;
