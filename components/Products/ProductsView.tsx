import ProductCard from "@/components/Products/ProductCard";
import SearchProducts from "@/components/Products/SearchProducts";
import { useResponsive } from "@/contexts/ResponsiveContext";
import mockProducts from "@/shared/constants/mockProducts";
import { Grid, Stack } from "@mui/material";

export default function ProductsView() {
  const { matchesSM } = useResponsive();

  return (
    <Stack gap={4}>
      <SearchProducts />
      <Grid
        container
        gap={4}
        justifyContent={matchesSM ? "flex-start" : "center"}
      >
        {mockProducts.map(
          (product, index) =>
            !product.featuredImage && (
              <Grid item key={product.id} width={matchesSM ? undefined : "80%"}>
                <ProductCard
                  product={product}
                  data-aos="zoom-in"
                  data-aos-delay={matchesSM ? index * 50 : 0}
                  data-aos-once={true}
                />
              </Grid>
            )
        )}
      </Grid>
    </Stack>
  );
}
