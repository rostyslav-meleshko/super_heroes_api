import React, { FC } from "react";
import { Box, Input, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { useHeroSearch } from "../../hooks/useHeroSearch";
import {
  stateIsFavoriteHeroesOnly,
  toggleShowFavoritesOnly,
} from "../../redux/store";

const Header: FC = () => {
  const dispatch = useDispatch();
  const isFavoriteHeroesShowed = useSelector(stateIsFavoriteHeroesOnly);
  const [searchValue, setSearchValue] = useHeroSearch("");

  const toggleHeroes = () => {
    dispatch(toggleShowFavoritesOnly());
  };

  return (
    <header>
      <Box display="flex" height="50px" minWidth="300px">
        <Input
          placeholder="Enter hero name"
          fullWidth={true}
          color="primary"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth={true}
          onClick={toggleHeroes}
        >
          {isFavoriteHeroesShowed ? "All Heroes" : "Favorite Heroes"}
        </Button>
      </Box>
    </header>
  );
};

export default Header;
