import { CSSProperties } from "react";
import { Review } from "../constants/mockReviews";

export type VariantNames =
  | "normal"
  | "high"
  | "master"
  | "supermaster1"
  | "supermaster2"
  | "original";

export type ProductVariant = {
  name: VariantNames;
  price: number;
};

export type NonNullColors = NonNullable<CSSProperties["color"]>;

type Product = {
  id: string;
  name: string;
  desc?: string;
  defaultPrice: number;
  mainImage: string;
  featuredImage?: string;
  images?: string[];
  variants: ProductVariant[];
  colors: NonNullColors | NonNullColors[];
  availability?: "available" | "out of stock";
  reviews?: Review[];
};
export interface CartProduct
  extends Omit<
    Product,
    "images" | "colors" | "variants" | "defaultPrice" | "availability"
  > {
  quantity: number;
  selectedVariant: VariantNames;
  selectedColor: NonNullColors;
  unitPrice: number;
}

export default Product;
