import React, { useState } from "react";
import Product, { VariantNames } from "../interfaces/Products";
import { ShoeSize } from "../constants/shoeSizes";
import { SelectChangeEvent } from "@mui/material";

export interface AddToCartForm {
  variant: VariantNames;
  quantity: number;
  color: Product["colors"][number];
  size: ShoeSize["EU"];
  unitPrice: number;
}

export default function useAddToCartForm({
  product,
  defaultVariant = product.variants[0].name,
  defaultColor = product.colors[0],
  defaultUnitPrice = product.defaultPrice,
  defaultQuantity = 1,
  defaultSize = product.sizes[0],
}: {
  product: Product;
  defaultVariant?: VariantNames;
  defaultColor?: Product["colors"][number];
  defaultUnitPrice?: number;
  defaultQuantity?: number;
  defaultSize?: ShoeSize["EU"];
}) {
  const [formValues, setFormValues] = useState<AddToCartForm>({
    variant: defaultVariant,
    quantity: defaultQuantity,
    size: defaultSize,
    color: defaultColor,
    unitPrice: defaultUnitPrice,
  });

  function handleVariantChange(
    event: React.MouseEvent<HTMLElement>,
    value: AddToCartForm["variant"] | null
  ) {
    if (value !== null)
      setFormValues({
        ...formValues,
        variant: value,
        unitPrice:
          product.variants.find((v) => v.name == value)?.price ??
          product.defaultPrice,
      });
  }
  function handleColorChange(
    event: React.MouseEvent<HTMLElement>,
    value: Product["colors"][number]
  ) {
    setFormValues({ ...formValues, color: value });
  }
  function handleQuantityChange(
    event: React.SyntheticEvent,
    value: number | null
  ) {
    event.preventDefault();
    setFormValues({ ...formValues, quantity: value ?? 0 });
  }
  function handleSizeChange(event: SelectChangeEvent<ShoeSize["EU"]>) {
    setFormValues({
      ...formValues,
      size: event.target.value as ShoeSize["EU"],
    });
  }
  return {
    formValues,
    handleVariantChange,
    handleColorChange,
    handleQuantityChange,
    handleSizeChange,
  };
}
