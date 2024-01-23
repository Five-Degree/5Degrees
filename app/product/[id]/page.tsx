import ProductMain from "@/components/Products/Product/ProductMain";
import mockProducts from "@/shared/constants/mockProducts";
import Product from "@/shared/interfaces/Products";
import { Typography } from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = mockProducts.find((pi) => pi.id == id) ?? {
    name: "Unknown Product",
    desc: "No product with that id",
  };

  return {
    title: product.name,
    description: product.desc,
  };
}
export default function Page({ params }: Props) {
  const { id } = params;
  const product = mockProducts.find((pi) => pi.id == id);

  if (product) return <ProductMain product={product as Product} />;
  else
    return (
      <Typography textAlign={"center"} variant="h1" color={"var(--gray)"}>
        No Product found
      </Typography>
    );
}
