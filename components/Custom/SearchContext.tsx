import type { SxProps } from "@mui/material";
import type { Hit } from "algoliasearch/lite";
import {
  type ComponentType,
  createContext,
  Dispatch,
  type ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useHits,
  type UseHitsProps,
  useInstantSearch,
  useSearchBox,
  type UseSearchBoxProps,
} from "react-instantsearch";

export type SearchAutocompleteProps<T extends Record<string, any>> = {
  autocompleteSx?: SxProps;
  HitComponent: ComponentType<{ hit: Hit<T> }>;
  handleHitClick(option: Hit): void;
};

const SearchContext = createContext<SearchProviderValueProps<any>>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "Components must be wrapped with <SearchContextProvider/> "
    );
  } else return context;
};
type SearchContextProviderProps = {
  searchBoxConnector?: UseSearchBoxProps;
  useHitsProps?: UseHitsProps;
  children: Readonly<ReactNode>;
};
type SearchProviderValueProps<T extends Record<string, any>> = {
  searchHits: Hit<T>[];
  inputValue: string;
  options: readonly Hit[];
  isSearchStalled: boolean;
  //   showMore(): void;
  setQuery(newQuery: string): void;
  setOptions: Dispatch<SetStateAction<readonly Hit[]>>;
} | null;

export default function SearchContextProvider({
  searchBoxConnector,
  useHitsProps,
  children,
  ...rest
}: SearchContextProviderProps) {
  const { query, refine } = useSearchBox(searchBoxConnector);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const { items } = useHits(useHitsProps);
  const [options, setOptions] = useState<readonly Hit[]>([]);
  const isSearchStalled = status === "stalled";
  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    setTimeout(() => refine(newQuery), 1500);
  }
  useEffect(() => {
    setOptions(items);
  }, [items]);

  return (
    <SearchContext.Provider
      value={{
        searchHits: items,
        inputValue,
        options,
        isSearchStalled,
        setQuery,
        setOptions,
        ...rest,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
