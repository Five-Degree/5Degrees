"use client";

import React, { ReactNode } from "react";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ""
);
export default function InstantSearchProvider({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <InstantSearch
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
      indexName="products"
    >
      {children}
    </InstantSearch>
  );
}
