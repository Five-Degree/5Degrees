import Product from "@/shared/interfaces/Products";
import { ButtonBase, Stack } from "@mui/material";
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
    <Stack width={"100%"} gap={0.5}>
      {/* Main Image */}
      <Stack
        height={"70%"}
        borderRadius={"var(--border-radius)"}
        maxHeight={"35vh"}
        overflow={"hidden auto"}
      >
        <CldImage
          src={product.mainImage}
          width={192 * 3}
          height={123 * 3}
          alt={product.name}
          style={{
            height: "auto",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Stack>
      {/* Image Reel */}
      <Stack
        direction={"row"}
        height={"30%"}
        width={"100%"}
        overflow={"auto hidden"}
        gap={2}
      >
        {product.images?.map((img) => (
          <ButtonBase
            key={img}
            onClick={() => setActiveImage(img)}
            disabled={activeImage == img}
            sx={{ height: "100%" }}
          >
            {imagesFactory(img, product.name)}
          </ButtonBase>
        ))}
      </Stack>
    </Stack>
  );
}
