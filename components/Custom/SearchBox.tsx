import { useState, useRef, type ComponentType, type FocusEvent } from "react";
import {
  useInstantSearch,
  useSearchBox,
  type UseSearchBoxProps,
  useHits,
  type UseHitsProps,
} from "react-instantsearch";
import FormContainer from "./FormComponents/FormContainer";
import FormInput from "./FormComponents/FormInput";
import {
  Button,
  List,
  ListItemButton,
  Menu,
  type MenuProps,
} from "@mui/material";
import type { Hit } from "algoliasearch/lite";

type HitProps<T> = {
  hitProps?: UseHitsProps;
  onItemClick?: (hit: Hit) => void;
  handleHideHits: () => void;
  menuProps: MenuProps;
  HitComponent: ComponentType<{ hit: Hit<T> }>;
};
type SearchBoxProps<T> = {
  HitComponent: HitProps<T>["HitComponent"];
} & UseSearchBoxProps;

function Hits<T>({
  hitProps,
  onItemClick,
  handleHideHits,
  menuProps,
  HitComponent,
}: HitProps<T>) {
  const { items } = useHits(hitProps);

  function handleItemClick(hit: Hit) {
    if (onItemClick) onItemClick(hit);
    handleHideHits();
  }

  return (
    <Menu
      {...menuProps}
      open={menuProps.open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleHideHits}
      disableAutoFocus
      disableAutoFocusItem
    >
      <List>
        {items.map((hit) => (
          <ListItemButton
            key={hit.objectID}
            onClick={() => handleItemClick(hit)}
          >
            <HitComponent hit={hit as Hit<T>} />
          </ListItemButton>
        ))}
      </List>
    </Menu>
  );
}

export default function SearchBox<T>({
  HitComponent,
  ...props
}: SearchBoxProps<T>) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLInputElement>(null);
  const open = Boolean(anchorEl);
  const isSearchStalled = status === "stalled";
  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }
  function handleViewHits(event: FocusEvent<HTMLInputElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleHideHits() {
    setAnchorEl(null);
  }
  console.log({ open });
  return (
    <FormContainer
      action=""
      role="search"
      sx={{ flexDirection: "row" }}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
      }}
    >
      <FormInput
        id="searchProducts"
        name="searchProducts"
        ref={inputRef}
        // autoComplete="on"
        // autoCorrect="off"
        // autoCapitalize="off"
        placeholder="Search for products"
        // spellCheck={false}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        // autoFocus
        onInput={handleViewHits}
        onBlur={handleHideHits}
      />
      <Button type="submit">Submit</Button>
      <Button type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
        Reset
      </Button>
      <span hidden={!isSearchStalled}>Searching…</span>
      <Hits
        menuProps={{ open, anchorEl }}
        handleHideHits={handleHideHits}
        HitComponent={HitComponent}
      />
    </FormContainer>
  );
}
