import ProductMain from "@/components/Products/Product/ProductMain";
import { db } from "@/lib/firebase/config";
import Product from "@/shared/interfaces/Products";
import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};
async function fetchProduct(id: string) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  return docSnap.data();
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = (await fetchProduct(id)) ?? {
    name: "Unknown Product",
    desc: "No product with that id",
  };

  return {
    title: product.name,
    description: product.desc,
  };
}
export default async function Page({ params }: Props) {
  const { id } = params;
  const product = await fetchProduct(id);

  if (product)
    return (
      <ProductMain product={JSON.parse(JSON.stringify(product)) as Product} />
    );
  else
    return (
      <Typography textAlign={"center"} variant="h1" color={"var(--gray)"}>
        No Product found
      </Typography>
    );
}
