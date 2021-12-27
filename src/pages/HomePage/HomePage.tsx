import { FC } from "react";
import { Box } from "@material-ui/core";

import Header from "components/Header/Header";
import Main from "components/Main/Main";
import { withStyles } from "@material-ui/core/styles";

const HomePageBox = withStyles({
  root: {
    component: "div",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    px: "24px",
  },
})(Box);

const HomePage: FC = () => {
  return (
    <HomePageBox>
      <Header />

      <Main />
    </HomePageBox>
  );
};

export default HomePage;
