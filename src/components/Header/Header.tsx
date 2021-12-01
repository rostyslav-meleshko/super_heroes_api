import React, { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Input } from "@material-ui/core";

import { handleHeroNameInSearchParams } from "./utils";

const HERO_NAME = "heroName";

const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    handleHeroNameInSearchParams(searchParams, HERO_NAME, searchInput.trim());
    history.push(`?${searchParams.toString()}`);
  }, [searchInput]);

  return (
    <header>
      <Box>
        <Input
          placeholder="Enter hero name"
          fullWidth={true}
          color="primary"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </Box>
    </header>
  );
};

export default Header;
