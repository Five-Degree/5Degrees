import { ClickAwayListener, Input, Stack } from "@mui/material";
import React, { useState } from "react";
import CustomIconButton from "../Custom/CustomIconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchAutocomplete from "../Custom/SearchAutocomplete";
import ProductSearchHit from "../Products/ProductSearchHit";
import SearchContextProvider from "../Custom/SearchContext";

export default function NavbarSearch() {
  const [searchSelected, setSearchSelected] = useState(false);

  return (
    <SearchContextProvider
      HitComponent={ProductSearchHit}
      autocompleteSx={{
        fontSize: "1rem",
        position: "absolute",
        right: "70%",
        pr: "40%",
        top: "50%",
        translate: "0 -50%",
        transition: "all 0.3s ease",
        borderRight: "none",
        width: searchSelected ? "21.875rem" : "0",
        opacity: searchSelected ? "1" : "0",
        pointerEvents: searchSelected ? "all" : "none",
      }}
    >
      <ClickAwayListener onClickAway={() => setSearchSelected(false)}>
        <Stack direction="row" position={"relative"}>
          <SearchAutocomplete />

          <CustomIconButton
            onClick={() => setSearchSelected(true)}
            kind="highlight"
            aria-label="search"
            disabled={searchSelected}
          >
            <SearchRoundedIcon />
          </CustomIconButton>
        </Stack>
      </ClickAwayListener>
    </SearchContextProvider>
  );
}
