import { useResponsive } from "@/contexts/ResponsiveContext";
import Product from "@/shared/interfaces/Products";
import { ButtonBase, Grid, Stack } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

export default function ProductImages({ product }: { product: Product }) {
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
      direction={{ md: "row-reverse", xs: "column" }}
      justifyContent={"flex-start"}
      height={{ md: "40vh", xs: "auto" }}
      alignItems={"center"}
      gap={1}
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
        }}
      />
      <Stack
        gap={2}
        sx={{
          overflowY: { md: "auto", xs: "visible" },
          overflowX: { md: "visible", xs: "auto" },
          direction: { md: "rtl", xs: "ltr" },
        }}
        height={{ md: "100%", xs: "max-content" }}
        width={{ md: "max-content", xs: "100%" }}
        paddingInline={1}
        paddingBlock={1}
        direction={{ md: "column", xs: "row" }}
        justifyContent={"flex-start"}
      >
        <ButtonBase
          onClick={() => setActiveImage(product.mainImage)}
          disabled={activeImage == product.mainImage}
        >
          {imagesFactory(product.mainImage, product.name)}
        </ButtonBase>
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
