"use client";
import ProductsView from "@/components/Products/ProductsView";
import { orderBy } from "firebase/firestore/lite";
import CollectionController from "../Products/Product/CollectionController";
import Product, { ProductSearchHitProps } from "@/shared/interfaces/Products";
import SearchContextProvider from "../Custom/SearchContext";
import ProductSearchHit from "../Products/ProductSearchHit";
import { Hit } from "algoliasearch/lite";
import { useRouter } from "next/navigation";

export type ProductConstraints = {
  defaultPrice: string;
  searchHits: Hit<ProductSearchHitProps>[];
};

export default function AllProducts() {
  return (
    <CollectionController<Product, ProductConstraints>
      useCollectionProps={{
        coll: "products",
        initialOrderByField: "createdAt",
        initialQueryConstraint: [orderBy("createdAt", "desc")],
      }}
      initialFormData={{
        defaultPrice: "",
        searchHits: [],
      }}
    >
      <SearchContextProvider>
        <ProductsView title="All Products" />
      </SearchContextProvider>
    </CollectionController>
  );
}
