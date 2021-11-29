import { FC, useEffect, useState } from "react";
import { heroData } from "./types";
import {
  Grid,
  Container,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";

import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import "./App.css";

const App: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [allHeroes, setAllHeroes] = useState<heroData[] | []>([]);
  const [isServerResponded, setIsServerResponded] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

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

  const handleSearchInput = () => {};

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
        <Header isMobile={isMobile} />

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
          <Main isMobile={isMobile} allHeroes={allHeroes} />
        )}
      </Grid>
    </div>
  );
};

export default App;
