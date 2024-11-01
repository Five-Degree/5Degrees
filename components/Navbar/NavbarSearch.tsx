import { ClickAwayListener, Input, Stack } from "@mui/material";
import React, { useState } from "react";
import CustomIconButton from "../Custom/CustomIconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchAutocomplete from "../Custom/SearchAutocomplete";
import ProductSearchHit from "../Products/ProductSearchHit";
import SearchContextProvider from "../Custom/SearchContext";
import { useRouter } from "next/navigation";

export default function NavbarSearch() {
  const [searchSelected, setSearchSelected] = useState(false);
  const router = useRouter();

  return (
    <SearchContextProvider>
      <ClickAwayListener onClickAway={() => setSearchSelected(false)}>
        <Stack direction="row" position={"relative"}>
          <SearchAutocomplete
            handleHitClick={(hit) => router.push(`/product/${hit.objectID}`)}
            HitComponent={ProductSearchHit}
            autocompleteSx={{
              fontSize: "1rem",
              position: "absolute",
              right: { md: "70%", xs: "-100%" },
              pr: "40%",
              top: "50%",
              translate: "0 -50%",
              transition: "all 0.3s ease",
              borderRight: "none",
              width: searchSelected ? "21.875rem" : "0",
              opacity: searchSelected ? "1" : "0",
              pointerEvents: searchSelected ? "all" : "none",
              zIndex: 999,
            }}
          />

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
