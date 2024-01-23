import ProductMain from "@/components/Products/Product/ProductMain";
import mockProducts from "@/shared/constants/mockProducts";
import Product from "@/shared/interfaces/Products";
import { Typography } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = mockProducts.find((pi) => pi.id == id);

  if (product) return <ProductMain product={product as Product} />;
  else
    return (
      <Typography variant="h1" color={"var(--gray)"}>
        No Product found
      </Typography>
    );
}
