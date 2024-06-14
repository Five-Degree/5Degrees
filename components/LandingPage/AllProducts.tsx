"use client";
import ProductsView from "@/components/Products/ProductsView";
import useCollectionController from "@/shared/hooks/useCollectionController";
import Product from "@/shared/interfaces/Products";
import { Button, Stack } from "@mui/material";
export default function AllProducts() {
  const {
    results: products,
    loading,
    lastResult,
    showNext,
  } = useCollectionController<Product>({
    coll: "products",
    orderby: { fieldPath: "createdAt", directionStr: "desc" },
  });

  return (
    <Stack gap={3}>
      <Stack
        overflow={"hidden"}
        component={"section"}
        id="AllProducts"
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-start" }}
        gap={4}
      >
        {/* <ProductsSidebar /> */}
        <ProductsView
          title="All Products"
          products={products}
          loading={loading}
        />
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"center"}
        data-aos="fade-up"
        data-aos-once={true}
      >
        {!!lastResult && <Button onClick={showNext}>Load More</Button>}
      </Stack>
    </Stack>
  );
}
