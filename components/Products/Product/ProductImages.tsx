import Product from "@/shared/interfaces/Products";
import { ButtonBase, Stack } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useRef, useState } from "react";

export default function ProductImages({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const mainImageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current?.scrollTo({ top: 63 * 3, behavior: "instant" });
    }
  }, [mainImageRef]);

  const imagesFactory = (url: string, name: string) => (
    <CldImage
      src={url}
      alt={name}
      width={192 * 0.6}
      height={123 * 0.6}
      style={{
        objectFit: "cover",
        borderRadius: "var(--border-radius)",
        outline:
          activeImage == url
            ? "2px solid var(--accent)"
            : "1px solid var(--border-color)",
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
        ref={mainImageRef}
        border="1px solid var(--border-radius)"
      >
        <CldImage
          src={activeImage}
          width={192 * 3}
          height={123 * 3}
          alt={product.name}
          style={{
            height: "auto",
            width: "100%",
            objectFit: "contain",
            objectPosition: "0% 100%",
          }}
        />
      </Stack>
      {/* Image Reel */}
      <Stack
        direction={"row"}
        height={"30%"}
        width={"100%"}
        overflow={"auto hidden"}
        padding={0.5}
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
