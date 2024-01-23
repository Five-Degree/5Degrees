"use client";
import { Stack } from "@mui/material";
import ProductsSidebar from "@/components/Products/ProductsSidebar";
import ProductsView from "@/components/Products/ProductsView";

export default function AllProducts() {
  return (
    <Stack
      overflow={"hidden"}
      component={"section"}
      id="AllProducts"
      direction={"row"}
    >
      <ProductsSidebar />
      <ProductsView />
    </Stack>
  );
}
