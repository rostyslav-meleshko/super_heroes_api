import { FC } from "react";
import {
  Grid,
  Container,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";

import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { useAllHeroesRequest } from "./services/hooks";
import "./App.css";

const App: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const allHeroes = useAllHeroesRequest();

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Header isMobile={isMobile} />

        {allHeroes.isLoading && (
          <Container>
            <CircularProgress
              size={200}
              variant="indeterminate"
              thickness={3}
            />
          </Container>
        )}

        {allHeroes.isError && (
          <Container>
            <p>Loading error. Reload page</p>
          </Container>
        )}

        {!allHeroes.isLoading && !allHeroes.isError && (
          <Main isMobile={isMobile} allHeroes={allHeroes.data} />
        )}
      </Grid>
    </div>
  );
};

export default App;
