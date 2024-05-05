"use client";
import ProductsSidebar from "@/components/Products/ProductsSidebar";
import ProductsView from "@/components/Products/ProductsView";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
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
        <ProductsView />
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"center"}
        data-aos="fade-up"
        data-aos-once={true}
      >
        <Pagination
          page={currentPage}
          count={10}
          onChange={handlePageChange}
          size="medium"
        />
      </Stack>
    </Stack>
  );
}
