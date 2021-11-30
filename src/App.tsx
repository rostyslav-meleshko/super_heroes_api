import { FC } from "react";
import { Grid } from "@material-ui/core";

import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

const App: FC = () => {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Header />

        <Main />
      </Grid>
    </div>
  );
};

export default App;
