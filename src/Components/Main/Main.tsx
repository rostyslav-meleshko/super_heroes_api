import React, { FC, useMemo, useState } from "react";
import { Container } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import HeroesList from "./HeroesList";
import { heroData } from "../../types";

type MainProps = {
  isMobile: boolean;
  allHeroes: heroData[] | [];
};

const Main: FC<MainProps> = ({ isMobile, allHeroes }) => {
  const [page, setPage] = useState(1);

  const heroesPerPage = isMobile ? 12 : 24;

  const paginationPagesQuantity = Math.ceil(allHeroes.length / heroesPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedHeroes = useMemo(() => {
    const startIndex = (page - 1) * heroesPerPage;
    const endIndex =
      page > paginationPagesQuantity ? page : heroesPerPage * page;

    return [...allHeroes].slice(startIndex, endIndex);
  }, [page, allHeroes, paginationPagesQuantity, heroesPerPage]);

  console.log("isMobile", isMobile);
  return (
    <main>
      <HeroesList isMobile={isMobile} showedHeroes={paginatedHeroes} />

      <Container maxWidth={isMobile ? "sm" : "lg"}>
        SuperHeroes Pagination
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
