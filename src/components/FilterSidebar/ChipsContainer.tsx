import React, { FC, useContext, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import { CSSconstants } from "types";
import { FilterContext } from "contexts/FilterContext";

interface ChipData {
  label: string;
  group: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexAlign: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

type ChipsContainerProps = {
  showedFilterChips: ChipData[];
  deleteFilterChip: (chip: ChipData) => void;
};

const ChipsContainer: FC<ChipsContainerProps> = ({
  showedFilterChips,
  deleteFilterChip,
}) => {
  const classes = useStyles();

  // const { filterParams, setFilterParams } = useContext(FilterContext);

  // const showedFilterChips = useMemo<ChipData[]>(() => {
  //   const result: ChipData[] = [];
  //
  //   for (let param in filterParams) {
  //     if (filterParams[param].length > 0) {
  //       filterParams[param].forEach((option) =>
  //         result.push({ label: option, group: param })
  //       );
  //     }
  //   }
  //
  //   return result;
  // }, [filterParams]);

  // const deleteFilterChip = (chip: ChipData): void => {
  //   let newParams = { ...filterParams };
  //   newParams[chip.group] = [...newParams[chip.group]].filter(
  //     (param) => param !== chip.label
  //   );
  //
  //   setFilterParams({ ...newParams });
  // };

  console.log("render ChipsContainer");
  return (
    <>
      {!!showedFilterChips.length && (
        <Paper component="ul" className={classes.root}>
          {showedFilterChips.map((chip: ChipData) => {
            return (
              <li key={chip.label}>
                <Chip
                  label={chip.label}
                  onDelete={(): void => deleteFilterChip(chip)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      )}
    </>
  );
};

export default ChipsContainer;
