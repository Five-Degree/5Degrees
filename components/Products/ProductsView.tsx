import ProductCard from "@/components/Products/ProductCard";
import SearchProducts from "@/components/Products/SearchProducts";
import { useResponsive } from "@/contexts/ResponsiveContext";
import Product from "@/shared/interfaces/Products";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  products: Product[];
  loading: boolean;
}

export default function ProductsView({ title, products, loading }: Props) {
  const { matchesSM, matchesMD, matchesLG } = useResponsive();
  // console.log("products", products);
  // console.log("loading", loading);
  return (
    <Stack gap={4} paddingLeft={matchesSM ? "10%" : undefined}>
      <Typography variant="h1" textAlign={matchesSM ? "left" : "center"}>
        {title}
      </Typography>
      <SearchProducts />
      <Grid
        container
        gap={4}
        justifyContent={matchesSM ? "flex-start" : "center"}
      >
        {products.map((product, index) => (
          <Grid
            item
            key={product.id}
            width={
              matchesLG ? "20%" : matchesMD ? "30%" : matchesSM ? "40%" : "80%"
            }
          >
            <ProductCard
              product={product}
              data-aos="zoom-in"
              data-aos-once={true}
            />
          </Grid>
        ))}
        {loading &&
          Array.from(new Array(12)).map((v, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={
                matchesLG ? "20%" : matchesMD ? "30%" : matchesSM ? "40%" : "80%"
              }
              height={350}
            />
          ))}
      </Grid>
    </Stack>
  );
}
