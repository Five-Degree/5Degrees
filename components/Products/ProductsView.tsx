import React, { useState } from "react";
import ProductCard from "@/components/Products/ProductCard";
import mockProducts from "@/shared/constants/mockProducts";
import { Grid, Pagination, Stack } from "@mui/material";
import SearchProducts from "@/components/Products/SearchProducts";

export default function ProductsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  return (
    <Stack ml={6} gap={4} maxWidth={"70%"}>
      <SearchProducts />
      <Grid container gap={4}>
        {mockProducts.map((product, index) => (
          <Grid item key={product.id}>
            {!product.featuredImage && (
              <ProductCard
                product={product}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
                data-aos-once={true}
              />
            )}
          </Grid>
        ))}
      </Grid>
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
          size="large"
        />
      </Stack>
    </Stack>
  );
}
