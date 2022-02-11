import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import React, { FC, useContext, useMemo } from "react";
import { FilterContext } from "contexts/FilterContext";
import Divider from "@material-ui/core/Divider";
import ChipsContainer from "components/FilterSidebar/ChipsContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FilterGroups, FilterOptions } from "types";

const drawerWidth = 340;
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface ChipData {
  label: string;
  group: string;
}

export const FilterDrawer: FC = () => {
  const classes = useStyles();

  const { filterParams, setFilterParams, isFiltered, setIsFiltered } =
    useContext(FilterContext);

  const handleClickCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const filterGroup = event.target.value;
    const filterOption = event.target.name;

    let newOption;

    if (filterParams[filterGroup].includes(filterOption)) {
      newOption = filterParams[filterGroup].filter((el) => el !== filterOption);
    } else {
      newOption = [...filterParams[filterGroup], filterOption];
    }

    if (isFiltered) {
      setIsFiltered(false);
    }

    setFilterParams({ ...filterParams, [filterGroup]: newOption });
  };

  const applyFilters = (): void => {
    setIsFiltered(true);
  };

  const showedFilterChips = useMemo<ChipData[]>(() => {
    const result: ChipData[] = [];

    for (let param in filterParams) {
      if (filterParams[param].length > 0) {
        filterParams[param].forEach((option) =>
          result.push({ label: option, group: param })
        );
      }
    }

    return result;
  }, [filterParams]);

  const deleteFilterChip = (chip: ChipData): void => {
    let newParams = { ...filterParams };
    newParams[chip.group] = [...newParams[chip.group]].filter(
      (param) => param !== chip.label
    );

    setFilterParams({ ...newParams });
  };

  return (
    <div>
      <div className={classes.toolbar}>
        <h3>Filter Heroes</h3>
      </div>
      <Divider />
      <ChipsContainer
        showedFilterChips={showedFilterChips}
        deleteFilterChip={deleteFilterChip}
      />
      <Divider />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormLabel component="legend">Assign Gender</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterParams.gender.includes(FilterOptions.Male)}
                    onChange={handleClickCheckbox}
                    name={FilterOptions.Male}
                    value={FilterGroups.Gender}
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterParams.gender.includes(FilterOptions.Female)}
                    onChange={handleClickCheckbox}
                    name={FilterOptions.Female}
                    value={FilterGroups.Gender}
                  />
                }
                label="Female"
              />
            </FormGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bb-content"
          id="panel1bb-header"
        >
          <Typography>Alignment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            {/*<FormLabel component="legend">Assign responsibility</FormLabel>*/}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterParams.alignment.includes(
                      FilterOptions.Good
                    )}
                    onChange={handleClickCheckbox}
                    name={FilterOptions.Good}
                    value={FilterGroups.Alignment}
                  />
                }
                label="Good"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterParams.alignment.includes(FilterOptions.Bad)}
                    onChange={handleClickCheckbox}
                    name={FilterOptions.Bad}
                    value={FilterGroups.Alignment}
                  />
                }
                label="Bad"
              />
            </FormGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <button
        onClick={(): void => {
          console.log("filterParams", filterParams);
        }}
      >
        console log filter params
      </button>
      <button
        onClick={(): void => {
          console.log("isFiltered", isFiltered);
        }}
      >
        console log isFiltered
      </button>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};
