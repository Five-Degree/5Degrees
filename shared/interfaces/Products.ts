import { CSSProperties } from "react";
import { Review } from "../constants/mockReviews";
import { ShoeSize } from "../constants/shoeSizes";

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
  sizes: ShoeSize["USMen"][];
  availability?: "available" | "out of stock";
  reviews?: Review[];
};
export interface CartProduct
  extends Omit<
    Product,
    "images" | "colors" | "variants" | "defaultPrice" | "availability" | "sizes"
  > {
  quantity: number;
  selectedVariant: VariantNames;
  selectedColor: NonNullColors;
  selectedSize: ShoeSize["USMen"];
  unitPrice: number;
}

export default Product;
