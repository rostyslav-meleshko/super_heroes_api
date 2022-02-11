import React, { FC } from "react";
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { FilterProvider } from "contexts/FilterContext";
import Header from "components/Header/Header";
import Main from "components/Main/Main";
import FilterSidebar from "components/FilterSidebar/FilterSidebar";

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
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  console.log("render HomePage");
  return (
    <FilterProvider>
      <HomePageBox>
        <Header toggleFilterSidebar={handleDrawerToggle} />

        <FilterSidebar
          isOpen={isFiltersOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Main />
      </HomePageBox>
    </FilterProvider>
  );
};

export default HomePage;
