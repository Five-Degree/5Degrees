import Product, { CartProduct } from "@/shared/interfaces/Products";
import { CheckRounded } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React from "react";

export interface ColorSelectorProps {
  selectedColor: CartProduct["selectedColor"];
  handleColorChange: (
    event: React.MouseEvent<HTMLElement>,
    value: Product["colors"][number]
  ) => void;
  product: Product;
}

function ColorBox({
  selectedColor,
  color,
}: {
  selectedColor: Product["colors"][number];
  color: Product["colors"][number];
}) {
  return (
    <span
      style={{
        minWidth: "2em",
        aspectRatio: "1 / 1",
        background: "none",
        borderRadius: "var(--border-radius-small)",
        border: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {color.imageURL && (
        <CldImage
          src={color.imageURL}
          alt={color.colorName}
          width={32}
          height={32}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      )}
      {selectedColor.colorName == color.colorName && (
        <CheckRounded
          sx={{
            fontSize: "inherit",
            color: "white",
            mixBlendMode: "difference",
          }}
        />
      )}
    </span>
  );
}

export default function ColorSelector({
  selectedColor,
  handleColorChange,
  product,
}: ColorSelectorProps) {
  console.log({ selectedColor });

  const colorButtonFactory = (color: Product["colors"][number]) => (
    <Tooltip key={color.colorName} title={color.colorName}>
      <ToggleButton
        value={color}
        aria-label={color.colorName}
        sx={{
          border: "none",
          paddingBlock: "0.5em",
          paddingInline: "0.5em",
        }}
      >
        <ColorBox color={color} selectedColor={selectedColor} />
      </ToggleButton>
    </Tooltip>
  );
  if (product.colors.length == 0) return <></>;
  return (
    <ToggleButtonGroup
      value={selectedColor}
      exclusive
      id="color"
      onChange={handleColorChange}
      aria-label="color"
    >
      {product.colors.map((color) => colorButtonFactory(color))}
    </ToggleButtonGroup>
  );
}
