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

export default interface Product {
  id: string;
  name: string;
  desc?: string;
  defaultPrice: number;
  mainImage: string;
  variants: ProductVariant[];
  colors: NonNullColors | NonNullColors[];
  availability?: "available" | "out of stock";
  images?: string[];
  reviews?: Review[];
}

export type FeaturedProduct = Omit<Product, "availability" | "images" | "desc">;
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
