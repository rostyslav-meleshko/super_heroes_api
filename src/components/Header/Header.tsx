import React, { FC } from "react";
import { Box, Input, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { useHeroSearch } from "../../hooks/useHeroSearch";
import {
  stateShowFavoritesOnly,
  toggleShowFavoritesOnly,
} from "../../redux/store";

const Header: FC = () => {
  const dispatch = useDispatch();
  const isFavoriteHeroesShowed = useSelector(stateShowFavoritesOnly);
  const [searchValue, setSearchValue] = useHeroSearch("");

  const toggleHeroes = () => {
    dispatch(toggleShowFavoritesOnly());
  };

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
        <Button variant="contained" color="primary" onClick={toggleHeroes}>
          {isFavoriteHeroesShowed ? "Show All Heroes" : "Show Favorite Heroes"}
        </Button>
      </Box>
    </header>
  );
};

export default Header;
