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
  useInfiniteHits,
  useInstantSearch,
  useSearchBox,
  type UseSearchBoxProps,
} from "react-instantsearch";

export type SearchAutocompleteProps<T extends Record<string, any>> = {
  autocompleteSx?: SxProps;
  HitComponent: ComponentType<{ hit: Hit<T> }>;
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
type SearchContextProviderProps<T extends Record<string, any>> =
  SearchAutocompleteProps<T> & {
    searchBoxConnector?: UseSearchBoxProps;
    useHitsProps?: UseHitsProps;
    handleHitClick(option: Hit): void;
    children: Readonly<ReactNode>;
  };
type SearchProviderValueProps<T extends Record<string, any>> =
  | ({
      searchHits: Hit<T>[];
      inputValue: string;
      options: readonly Hit[];
      isSearchStalled: boolean;
      handleHitClick(option: Hit): void;
      //   showMore(): void;
      setQuery(newQuery: string): void;
      setOptions: Dispatch<SetStateAction<readonly Hit[]>>;
    } & SearchAutocompleteProps<T>)
  | null;
export default function SearchContextProvider<T extends Record<string, any>>({
  searchBoxConnector,
  useHitsProps,
  children,
  handleHitClick,
  ...rest
}: SearchContextProviderProps<T>) {
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
        handleHitClick,
        setQuery,
        setOptions,
        ...rest,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
