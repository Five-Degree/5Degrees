import { CSSProperties } from "react";

export type ProductVariant =
  | "normal"
  | "high"
  | "master"
  | "supermaster1"
  | "supermaster2"
  | "original"
  | ProductVariant[];

export interface FeaturedProducts {
  id: string;
  name: string;
  price: number;
  mainImage: string;
  variants: ProductVariant;
  colors: CSSProperties["color"] | CSSProperties["color"][];
}
export default interface Product extends FeaturedProducts {
  availability: "available" | "out of stock";
  images?: string[];
}
