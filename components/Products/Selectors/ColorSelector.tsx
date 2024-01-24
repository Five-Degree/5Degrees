import Product, { NonNullColors } from "@/shared/interfaces/Products";
import { CheckRounded } from "@mui/icons-material";
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

export default function ColorSelector({
  selectedColor,
  handleColorChange,
  product,
}: {
  selectedColor: NonNullColors;
  handleColorChange: (
    event: React.MouseEvent<HTMLElement>,
    value: NonNullColors
  ) => void;
  product: Product;
}) {
  const colorButtonFactory = (color: NonNullColors) => (
    <Tooltip key={color} title={color}>
      <ToggleButton
        value={color}
        aria-label={color}
        sx={{
          border: "none",
          paddingBlock: "0.5em",
          // gap: 1,
          // flexDirection: "column",
          paddingInline: "0.5em",
        }}
      >
        <span
          style={{
            minWidth: "1em",
            aspectRatio: "1 / 1",
            background: color,
            borderRadius: "var(--border-radius-small)",
            border: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedColor == color && (
            <CheckRounded
              sx={{
                fontSize: "inherit",
                color: "white",
                mixBlendMode: "difference",
              }}
            />
          )}
        </span>
        {/* {color} */}
      </ToggleButton>
    </Tooltip>
  );

  return (
    <ToggleButtonGroup
      value={selectedColor}
      exclusive
      id="color"
      onChange={handleColorChange}
      aria-label="color"
    >
      {typeof product.colors != "string"
        ? product.colors.map((color) => colorButtonFactory(color))
        : colorButtonFactory(product.colors)}
    </ToggleButtonGroup>
  );
}
