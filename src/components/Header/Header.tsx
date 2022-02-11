import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { useHeroSearch } from "hooks/useHeroSearch";
import { UrlSearchOptions } from "types";

type HeaderProps = {
  toggleFilterSidebar: () => void;
};

const Header: FC<HeaderProps> = ({ toggleFilterSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
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

  console.log("render Header");
  return (
    <header>
      <Box
        display="flex"
        height="50px"
        minWidth="300px"
        marginLeft={isMobile ? "0" : "390px"}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleFilterSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}
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
