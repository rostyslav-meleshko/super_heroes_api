import React, { FC } from "react";
import { Box, Input } from "@material-ui/core";
import { useHeroSearch } from "../../hooks/useHeroSearch";

const Header: FC = () => {
  const [searchValue, setSearchValue] = useHeroSearch(""); // from custom hook

  return (
    <header>
      <Box>
        <Input
          placeholder="Enter hero name"
          fullWidth={true}
          color="primary"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </Box>
    </header>
  );
};

export default Header;
