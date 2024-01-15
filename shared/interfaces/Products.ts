import { CSSProperties } from "react";

type VariantNames =
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

type NonNullColors = NonNullable<CSSProperties["color"]>;

export interface FeaturedProducts {
  id: string;
  name: string;
  defaultPrice: number;
  mainImage: string;
  variants: ProductVariant[];
  colors: NonNullColors | NonNullColors[];
}
export default interface Product extends FeaturedProducts {
  availability: "available" | "out of stock";
  images?: string[];
}
export interface CartProduct
  extends Omit<
    Product,
    "images" | "colors" | "variants" | "defaultPrice" | "availability"
  > {
  quantity: number;
  selectedVariant: string;
  selectedColor: string;
  unitPrice: number;
}
