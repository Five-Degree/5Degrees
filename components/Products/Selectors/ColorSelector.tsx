import Product, { CartProduct } from "@/shared/interfaces/Products";
import {
  Grow,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

export interface ColorSelectorProps {
  selectedColor: CartProduct["selectedColor"];
  handleColorChange: (
    event: React.MouseEvent<HTMLElement>,
    value: Product["colors"][number]
  ) => void;
  product: Product;
}

function ColorBox({ color }: { color: Product["colors"][number] }) {
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
    </span>
  );
}
function ColorButtonFactory({ color }: { color: Product["colors"][number] }) {
  const [showEnlarged, setShowEnlarged] = useState(false);
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ToggleButton
      id={color.colorName}
      onMouseEnter={matchesDesktop ? () => setShowEnlarged(true) : undefined}
      onMouseLeave={matchesDesktop ? () => setShowEnlarged(false) : undefined}
      value={color}
      aria-label={color.colorName}
      sx={{
        border: "none",
        paddingBlock: "0.5em",
        paddingInline: "0.5em",
        "&.Mui-selected": {
          backgroundColor: "var(--accentalpha2)",
        },
      }}
    >
      <Grow in={showEnlarged}>
        <Stack
          position={"absolute"}
          bottom={"100%"}
          // visibility={showEnlarged ? "visible" : "hidden"}
          zIndex={999}
          borderRadius={"var(--border-radius)"}
          overflow={"hidden"}
        >
          <CldImage
            src={color.imageURL}
            alt={color.colorName}
            width={100}
            height={100}
          />
        </Stack>
      </Grow>
      <Tooltip key={color.colorName} title={color.colorName}>
        <ColorBox color={color} />
      </Tooltip>
    </ToggleButton>
  );
}
export default function ColorSelector({
  selectedColor,
  handleColorChange,
  product,
}: ColorSelectorProps) {
  console.log({ selectedColor });

  if (product.colors.length == 0) return <></>;
  return (
    <ToggleButtonGroup
      value={selectedColor}
      exclusive
      id="color"
      onChange={handleColorChange}
      aria-label="color"
    >
      {product.colors.map((color) => (
        <ColorButtonFactory color={color} key={color.imageURL} />
      ))}
    </ToggleButtonGroup>
  );
}
