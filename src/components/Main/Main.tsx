import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";

import HeroesList from "./HeroesList";
import ErrorMessage from "components/ui/ErrorMessage";
import Loader from "components/ui/Loader";
import { useServersRequest } from "hooks/useServersRequest";
import { definePaginatedHeroes } from "./utils";
import { ServerFetchUrls, UrlSearchOptions } from "types";
import { stateFavoriteHeroesByID } from "store/selectors";
import { CSSconstants } from "types";
import { FilterContext } from "contexts/FilterContext";

type SectionProps = {
  isMobile?: boolean;
};

const Section = styled.section<SectionProps>`
  width: calc(100% - ${CSSconstants.FilterSidebarWidth}px);
  width: ${(props: SectionProps): string =>
    props.isMobile
      ? "fit-content"
      : `calc(100% - ${CSSconstants.FilterSidebarWidth}px)`};
  margin-left: ${(props: SectionProps): string =>
    props.isMobile ? "0" : "390px"};
`;

const Main: FC = () => {
  // TODO move main logic to the context, return visible heroes from context
  const theme = useTheme();
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
  const favoriteHeroesIDs = useSelector(stateFavoriteHeroesByID);
  const { filterParams, isFiltered } = useContext(FilterContext);

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const {
    isLoading,
    data: heroes,
    isError,
  } = useServersRequest<ServerFetchUrls.AllHeroes>(ServerFetchUrls.AllHeroes);

  const favoriteHeroes = useMemo(() => {
    return heroes ? heroes.filter((hero) => favoriteHeroesIDs[hero.id]) : [];
  }, [favoriteHeroesIDs, heroes]);

  const [page, setPage] = useState(1);
  const { search } = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  useEffect(() => {
    if (searchParams.get(UrlSearchOptions.IsFavorite)) {
      setIsOnlyFavorite(true);
    } else {
      setIsOnlyFavorite(false);
    }
  }, [search, searchParams]);

  const heroesPerPage = isMobile ? 12 : 24;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  const heroesSearchedByName = useMemo(() => {
    const query = searchParams.get("heroName")?.toLowerCase() || "";

    if (heroes) {
      if (query.length >= 3) {
        return heroes.filter((hero) =>
          hero.name.toLowerCase()?.includes(query)
        );
      } else {
        return heroes;
      }
    } else {
      return [];
    }
  }, [heroes, searchParams]);

  const paginationPagesQuantity = useMemo(() => {
    if (isOnlyFavorite) {
      return Math.ceil(favoriteHeroes.length / heroesPerPage) || 1;
    } else {
      return Math.ceil(heroesSearchedByName.length / heroesPerPage) || 1;
    }
  }, [favoriteHeroes, heroesSearchedByName, heroesPerPage, isOnlyFavorite]);

  const paginatedHeroes = useMemo(() => {
    const heroesForPagination = isOnlyFavorite
      ? favoriteHeroes
      : heroesSearchedByName;

    return definePaginatedHeroes(
      heroesForPagination,
      page,
      heroesPerPage,
      paginationPagesQuantity
    );
  }, [
    page,
    heroesPerPage,
    paginationPagesQuantity,
    heroesSearchedByName,
    isOnlyFavorite,
    favoriteHeroes,
  ]);

  const filteredHeroes = useMemo(() => {
    if (!isFiltered) {
      return paginatedHeroes;
    } else {
      // let filteredHeroesByAppearance = paginatedHeroes.filter((hero) => {
      //   for (let param in filterParams) {
      //     if (filterParams[param].length > 0) {
      //       for (let option of filterParams[param]) {
      //         // if (option === "alignment" || option === "publisher") {
      //         //   return hero.biography[param] === option;
      //         // } else {
      //         return hero.appearance[param] === option;
      //         // }
      //       }
      //     } else {
      //       continue;
      //     }
      //   }
      // });

      let filteredHeroesByBiography = paginatedHeroes.filter((hero) => {
        for (let param in filterParams) {
          if (filterParams[param].length > 0) {
            for (let option of filterParams[param]) {
              // if (option === "alignment" || option === "publisher") {
              return hero.biography[param] === option;
              // } else {
              //   return hero.appearance[param] === option;
              // }
            }
          } else {
            continue;
          }
        }
      });
      return filteredHeroesByBiography;
    }
  }, [isFiltered, paginatedHeroes, filterParams]);

  const ifNoFavoriteHeroes = isOnlyFavorite && !paginatedHeroes.length;
  const isHeroesLoadedSuccessfully =
    !isLoading && !isError && paginatedHeroes.length > 0;

  console.log("render Main");
  return (
    <main>
      <Box
        maxWidth={isMobile ? "sm" : "lg"}
        minWidth={isMobile ? "300px" : "600px"}
        display={"flex"}
        mt="6px"
      >
        <Section isMobile={isMobile}>
          {isLoading && <Loader />}

          {isError && <ErrorMessage text="Loading error. Reload page" />}

          {ifNoFavoriteHeroes && (
            <Typography variant="h5" align="center">
              You don't have favourite heroes yet
            </Typography>
          )}

          {isHeroesLoadedSuccessfully && (
            <>
              <HeroesList isMobile={isMobile} showedHeroes={filteredHeroes} />

              {/*Todo move to a separate component*/}
              <Box display="flex" justifyContent="center" mt="6px">
                <Pagination
                  count={paginationPagesQuantity}
                  size="small"
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            </>
          )}
        </Section>
      </Box>
    </main>
  );
};

export default Main;
