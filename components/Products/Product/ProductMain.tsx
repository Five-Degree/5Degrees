"use client";
import { Stack } from "@mui/material";
import React from "react";
import ProductImages from "./Images";
import ProductDetails from "./Details";
import ProductInteraction from "./Interaction";
import Product from "@/shared/interfaces/Products";
export default function ProductMain({ product }: { product: Product }) {
  // console.log("product", product);
  return (
    <Stack
      direction={{ md: "row", xs: "column-reverse" }}
      paddingInline={3}
      justifyContent={"center"}
      gap={3}
    >
      <Stack gap={3}>
        <ProductImages product={product} />
        <ProductDetails product={product} />
      </Stack>
      <ProductInteraction product={product} />
    </Stack>
  );
}
