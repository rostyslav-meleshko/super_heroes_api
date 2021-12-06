import { FC } from "react";
import { Box } from "@material-ui/core";

import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";

const HomePage: FC = () => {
  return (
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
  );
};

export default HomePage;
