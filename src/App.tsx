import React, { useEffect, useMemo, useState } from "react";
import type {} from "@mui/lab/themeAugmentation";
import { heroData } from "./types";
import {
  Grid,
  Container,
  useMediaQuery,
  ImageList,
  ImageListItem,
  CircularProgress,
  Input,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import "./App.css";

const App: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [allHeroes, setAllHeroes] = useState<heroData[] | []>([]);
  const [isServerResponded, setIsServerResponded] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [page, setPage] = useState(1);

  const getHeroesFromServer = async () => {
    await fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => response.json())
      .then((result) => {
        setAllHeroes(result);
        setIsServerResponded(true);
        setIsServerError(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsServerResponded(true);
        setIsServerError(true);
      });
  };

  const heroesPerPage = useMemo(() => {
    return isMobile ? 12 : 24;
  }, [isMobile]);

  const paginationPagesQuantity = useMemo(() => {
    return Math.ceil(allHeroes.length / heroesPerPage);
  }, [allHeroes, heroesPerPage]);

  const handleSearchInput = () => {};

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

    console.log(111, startIndex, endIndex);
    return [...allHeroes].slice(startIndex, endIndex);
  }, [page, allHeroes, paginationPagesQuantity, heroesPerPage]);

  useEffect(() => {
    getHeroesFromServer();
  }, []);

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <header>
          <Container maxWidth={isMobile ? "sm" : "lg"}>
            SuperHeroes
            <Input
              placeholder="Enter hero name"
              fullWidth={true}
              color="primary"
            />
            {isMobile && <p> mobile </p>}
          </Container>
        </header>

        {!isServerResponded && (
          <Container>
            <CircularProgress
              size={200}
              variant="indeterminate"
              thickness={3}
            />
          </Container>
        )}

        {isServerError && (
          <Container>
            <p>Loading error. Reload page</p>
          </Container>
        )}

        {isServerResponded && !isServerError && (
          <main>
            <Container maxWidth={isMobile ? "sm" : "lg"}>
              Heroes list
              {isMobile && <p> mobile </p>}
              {paginatedHeroes.length > 0 && (
                <ImageList cols={isMobile ? 3 : 6} gap={2} rowHeight={180}>
                  {paginatedHeroes.map((hero) => (
                    <ImageListItem key={hero.id}>
                      <img
                        className="hero_card"
                        src={`${hero.images.md}`}
                        alt={`${hero.name} avatar`}
                        width="120"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Container>
          </main>
        )}

        <footer>
          <Container maxWidth={isMobile ? "sm" : "lg"}>
            SuperHeroes Pagination
            <Pagination
              count={paginationPagesQuantity}
              size="small"
              page={page}
              onChange={handlePageChange}
            />
          </Container>
        </footer>
      </Grid>
    </div>
  );
};

export default App;
