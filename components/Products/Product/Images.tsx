import { useResponsive } from "@/contexts/ResponsiveContext";
import Product from "@/shared/interfaces/Products";
import { ButtonBase, Grid, Stack } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

export default function ProductImages({
  product,
  direction = "vertical",
}: {
  product: Product;
  direction?: "horizontal" | "vertical";
}) {
  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const imagesFactory = (url: string, name: string) => (
    <CldImage
      src={url}
      alt={name}
      width={192 * 0.6}
      height={123 * 0.6}
      style={{
        objectFit: "cover",
        borderRadius: "var(--border-radius)",
        outline: activeImage == url ? "2px solid var(--accent)" : "none",
      }}
    />
  );
  return (
    <Stack
      direction={
        direction == "vertical" ? { md: "row-reverse", xs: "column" } : "column"
      }
      // justifyContent={"flex-start"}
      width={"100%"}
      height={{ md: "40vh", xs: "auto" }}
      alignItems={"center"}
      gap={1}
      sx={{
        fontSize: { xxl: "1.5rem", xl: "1.3rem", md: "1rem" },
      }}
      overflow={"auto"}
    >
      <CldImage
        src={activeImage}
        alt={product.name}
        width={192 * 3}
        height={123 * 3}
        style={{
          objectFit: "cover",
          borderRadius: "var(--border-radius)",
          width: "auto",
          height: "100%",
          maxWidth: "37.5em",
        }}
      />
      <Stack
        gap={2}
        sx={{
          overflowY:
            direction == "vertical" ? { md: "auto", xs: "visible" } : "visible",
          overflowX:
            direction == "vertical" ? { md: "visible", xs: "auto" } : "auto",
          direction: { md: "rtl", xs: "ltr" },
        }}
        height={
          direction == "vertical"
            ? { md: "100%", xs: "max-content" }
            : "max-content"
        }
        width={
          direction == "vertical" ? { md: "max-content", xs: "100%" } : "100%"
        }
        paddingInline={1}
        paddingBlock={1}
        direction={
          direction == "vertical" ? { md: "column", xs: "row" } : "row"
        }
        justifyContent={"flex-start"}
      >
        {/* <ButtonBase
          onClick={() => setActiveImage(product.mainImage)}
          disabled={activeImage == product.mainImage}
        >
          {imagesFactory(product.mainImage, product.name)}
        </ButtonBase> */}
        {product.images?.map((img) => (
          <ButtonBase
            key={img}
            onClick={() => setActiveImage(img)}
            disabled={activeImage == img}
          >
            {imagesFactory(img, product.name)}
          </ButtonBase>
        ))}
      </Stack>
    </Stack>
  );
}
