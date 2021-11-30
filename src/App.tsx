import { FC } from "react";
import { Box } from "@material-ui/core";

import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

const App: FC = () => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <Header />

      <Main />
    </Box>
  );
};

export default App;
