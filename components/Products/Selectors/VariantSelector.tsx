import Product, { VariantNames } from "@/shared/interfaces/Products";
import { CheckRounded } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
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
      sx={{ flexWrap: "wrap" }}
    >
      {product.variants.map((v) => (
        <ToggleButton key={v.name} value={v.name} aria-label={v.name}>
          {v.name}&nbsp;-&nbsp;
          <Typography variant="h3" color={"inherit"}>
            {v.price}$
          </Typography>
          <CheckRounded
            sx={{
              fontSize: "inherit",
              opacity: v.name == selectedVariant ? "1" : "0",
              transition: "opacity 0.3s ease",
            }}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
