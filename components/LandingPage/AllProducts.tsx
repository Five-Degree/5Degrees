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
  const router = useRouter();
  return (
    <CollectionController<Product, ProductConstraints>
      useCollectionProps={{
        coll: "products",
        defaultOrderByField: "createdAt",
        defaultOrderby: orderBy("createdAt", "desc"),
      }}
      initialFormData={{
        defaultPrice: "",
        searchHits: [],
      }}
    >
      <SearchContextProvider
        HitComponent={ProductSearchHit}
        autocompleteSx={{ width: "21.875rem" }}
        handleHitClick={(option) => {
          router.push(`/product/${option.objectID}`);
        }}
      >
        <ProductsView title="All Products" />
      </SearchContextProvider>
    </CollectionController>
  );
}
