import ProductCard from "@/components/Products/ProductCard";
import SearchProducts from "@/components/Products/SearchProducts";
import { useResponsive } from "@/contexts/ResponsiveContext";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useCollection } from "./Product/CollectionController";
import Product from "@/shared/interfaces/Products";

interface Props {
  title: string;
}

export default function ProductsView({ title }: Props) {
  const { matchesSM, matchesMD, matchesLG } = useResponsive();
  const { results: products, loading, lastResult, loadMore } = useCollection();

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
                  matchesLG
                    ? "20%"
                    : matchesMD
                    ? "30%"
                    : matchesSM
                    ? "40%"
                    : "80%"
                }
              >
                <ProductCard
                  product={product as Product}
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
                    matchesLG
                      ? "20%"
                      : matchesMD
                      ? "30%"
                      : matchesSM
                      ? "40%"
                      : "80%"
                  }
                  height={350}
                />
              ))}
          </Grid>
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"center"}
        data-aos="fade-up"
        data-aos-once={true}
      >
        {!!lastResult && <Button onClick={loadMore}>Load More</Button>}
      </Stack>
    </Stack>
  );
}
