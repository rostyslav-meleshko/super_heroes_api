import React, { FC } from "react";
import { Box, Button, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useHeroSearch } from "hooks/useHeroSearch";
import { stateIsFavoriteHeroesOnly } from "store/selectors";
import { toggleShowFavoritesOnly } from "store/actions";

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
          color={isFavoriteHeroesShowed ? "primary" : "secondary"}
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
