"use client";

import { Autocomplete, ListItemButton, TextField } from "@mui/material";
import { type Hit } from "algoliasearch/lite";
import { SearchAutocompleteProps, useSearchContext } from "./SearchContext";

export default function SearchAutocomplete<T extends Record<string, any>>(
  props: SearchAutocompleteProps<T>
) {
  const { autocompleteSx, HitComponent, handleHitClick } = props;
  const { options, isSearchStalled, inputValue, setQuery } = useSearchContext();
  return (
    <Autocomplete
      freeSolo
      sx={autocompleteSx}
      id="search-autocomplete"
      options={options}
      disableClearable
      autoComplete
      noOptionsText="No Products"
      loading={isSearchStalled}
      value={inputValue}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.objectID
      }
      renderOption={(props, option) => (
        <ListItemButton
          key={props.key}
          sx={{ paddingBlock: "0.25rem" }}
          onClick={() => handleHitClick(option)}
        >
          <HitComponent hit={option as Hit<T>} />
        </ListItemButton>
      )}
      filterOptions={(x) => x}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="standard"
            // fullWidth
            placeholder="Search Products"
            InputProps={{ disableUnderline: true, ...params.InputProps }}
          />
        );
      }}
    />
  );
}
// MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiAutocomplete-inputRoot mui-1lbhqol-MuiInputBase-root-MuiInput-root
