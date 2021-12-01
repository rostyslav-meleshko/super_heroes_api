import { FC } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App: FC = () => {
  return (
    <Switch>
      <Route path="/">
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
          px="24px"
        >
          <Header />

          <Main />
        </Box>
      </Route>
    </Switch>
  );
};

export default withRouter(App);
