import ProductCard from "@/components/Products/ProductCard";
import SearchProducts from "@/components/Products/SearchProducts";
import { useResponsive } from "@/contexts/ResponsiveContext";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
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
        <Stack gap={4} width={"100%"} paddingInline={"8.3%"}>
          <Typography variant="h1" textAlign={matchesSM ? "left" : "center"}>
            {title}
          </Typography>
          <SearchProducts />
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              width: "100%",
            }}
            gap={4}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product as Product}
                data-aos="zoom-in"
                data-aos-once={true}
              />
            ))}
            {loading &&
              Array.from(new Array(4)).map((v, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={"100%"}
                  height={350}
                />
              ))}
          </Box>
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
