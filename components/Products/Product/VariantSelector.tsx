import Product, { VariantNames } from "@/shared/interfaces/Products";
import { CheckRounded } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function VariantSelector({
  selectedVariant,
  handleVariantChange,
  product,
}: {
  selectedVariant: VariantNames;
  handleVariantChange: (
    event: React.MouseEvent<HTMLElement>,
    value: VariantNames
  ) => void;
  product: Product;
}) {
  return (
    <ToggleButtonGroup
      value={selectedVariant}
      exclusive
      onChange={handleVariantChange}
      id="variant"
      aria-label="variants"
    >
      {product.variants.map((v) => (
        <ToggleButton key={v.name} value={v.name} aria-label={v.name}>
          {v.name}
          {v.name == selectedVariant && (
            <CheckRounded sx={{ fontSize: "inherit" }} />
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
