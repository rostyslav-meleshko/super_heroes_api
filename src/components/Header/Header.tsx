import React, { FC } from "react";
import { Box, Button, Input } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import { useHeroSearch } from "hooks/useHeroSearch";
import { UrlSearchOptions } from "types";

const Header: FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isFavoriteHeroesShowed = searchParams.get(UrlSearchOptions.IsFavorite);
  const [searchValue, setSearchValue] = useHeroSearch();

  const toggleIsFavouriteInUrl = (): void => {
    if (searchParams.get(UrlSearchOptions.IsFavorite)) {
      searchParams.delete(UrlSearchOptions.IsFavorite);
    } else {
      searchParams.set(UrlSearchOptions.IsFavorite, "true");
    }

    history.push(`?${searchParams.toString()}`);
  };

  return (
    <header>
      <Box display="flex" height="50px" minWidth="300px">
        <Input
          placeholder="Enter hero name"
          fullWidth={true}
          color="primary"
          value={searchValue}
          onChange={(event): void => setSearchValue(event.target.value)}
        />

        <Button
          variant="contained"
          size="small"
          fullWidth={true}
          color={isFavoriteHeroesShowed ? "primary" : "secondary"}
          name="toggle-favorite-heroes"
          data-testid="header-button-heroes"
          onClick={toggleIsFavouriteInUrl}
        >
          {isFavoriteHeroesShowed ? "All Heroes" : "Favorite Heroes"}
        </Button>
      </Box>
    </header>
  );
};

export default Header;
