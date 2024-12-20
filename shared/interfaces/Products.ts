import { CSSProperties } from "react";
import { ShoeSize } from "../constants/shoeSizes";
import Reviews from "./Reviews";
import type { Timestamp } from "firebase/firestore";
import type { BaseHit } from "instantsearch.js";

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
export type ColorImage = {
  colorName: string;
  imageURL: string;
};

type Product = {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  desc?: string;
  defaultPrice: number;
  discount?: number;
  mainImage: string;
  featuredImage?: string;
  images?: string[];
  variants: ProductVariant[];
  colors: ColorImage[];
  // Shoesize always defaults to EU size regardless of what the user chooses
  sizes: ShoeSize["EU"][];
  availability?: "available" | "out of stock";
  reviews?: Reviews;
};
export interface CartProduct
  extends Omit<
    Product,
    "images" | "colors" | "variants" | "defaultPrice" | "availability" | "sizes"
  > {
  cartId?: string;
  quantity: number;
  selectedVariant: VariantNames;
  selectedColor: ColorImage;
  selectedSize: ShoeSize["EU"];
  unitPrice: number;
}
export type ProductSearchHitProps = Pick<
  Product,
  "defaultPrice" | "mainImage" | "name" | "desc"
> &
  BaseHit;

export default Product;
