"use client";
import { Stack } from "@mui/material";
import ProductsSidebar from "./ProductsSidebar";
import ProductsView from "./ProductsView";

export default function AllProducts() {
  return (
    <Stack overflow={"hidden"} direction={"row"}>
      <ProductsSidebar />
      <ProductsView />
    </Stack>
  );
}
