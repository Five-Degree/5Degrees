"use client";
import CustomIconButton from "@/components/Custom/CustomIconButton";
import FeaturedProductCard from "@/components/Products/FeaturedProductCard";
import useAddToCartModal from "@/shared/hooks/useAddToCartModal";
import useCollectionController from "@/shared/hooks/useCollectionController";
import useSlickSlider from "@/shared/hooks/useSlickSlider";
import Product from "@/shared/interfaces/Products";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Skeleton, Stack, Typography } from "@mui/material";
import { where } from "firebase/firestore";
import { orderBy } from "firebase/firestore/lite";
import React from "react";
import { useState } from "react";
import Slider from "react-slick";

export default function Featured() {
  const {
    sliderRef,
    sliderSettings,
    currentPage,
    totalPages,
    handleNext,
    handlePrev,
  } = useSlickSlider();
  const [activeProduct, setActiveProduct] = useState<Product>({
    name: "",
    id: "",
    defaultPrice: 0,
    mainImage: "",
    variants: [],
    colors: [],
    sizes: [],
  });
  const { handleAddToCartOpen, showAddToCartModal, addToCartModal } =
    useAddToCartModal({
      product: activeProduct,
    });

  function handleActiveProduct(product: Product) {
    setActiveProduct(product);
    handleAddToCartOpen();
  }
  const { results: featProducts, loading } = useCollectionController<Product>({
    coll: "products",
    initialQueryConstraint: [where("featuredImage", "!=", null)],
    initialOrderByField: "createdAt",
    queryLimit: 20,
  });
  console.log({
    featProducts: featProducts.map(({ name, id, featuredImage }) => {
      return { name, id, featuredImage };
    }),
  });
  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        <Stack
          marginLeft={"10%"}
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          pr={2}
          data-aos="fade-up"
        >
          <Typography variant="h1">Featured</Typography>
          {featProducts.length > 0 && (
            <Typography variant="h2">
              {currentPage}|{totalPages}
            </Typography>
          )}
        </Stack>
        {featProducts.length > 0 && (
          <Stack
            width={"100%"}
            sx={{ overflowX: "hidden" }}
            position={"relative"}
            pr={2}
            height={"max-content"}
          >
            <Slider {...sliderSettings} ref={sliderRef}>
              {featProducts.map(
                (product) =>
                  product.featuredImage && (
                    <FeaturedProductCard
                      anime={{ "data-aos": "zoom-in" }}
                      product={product as Product & { featuredImage: string }}
                      key={product.id}
                      handleActiveProduct={handleActiveProduct}
                    />
                  )
              )}
            </Slider>
            {currentPage > 1 && (
              <CustomIconButton
                kind="highlight"
                sx={{
                  position: "absolute",
                  left: "5%",
                  top: "50%",
                  rotate: "180deg",
                  transition: "all 0.3s ease",
                }}
                onClick={handlePrev}
              >
                <ArrowForwardRoundedIcon />
              </CustomIconButton>
            )}
            {currentPage < totalPages && (
              <CustomIconButton
                kind="highlight"
                sx={{
                  position: "absolute",
                  right: "5%",
                  top: "50%",
                  transition: "all 0.3s ease",
                }}
                onClick={handleNext}
              >
                <ArrowForwardRoundedIcon />
              </CustomIconButton>
            )}
          </Stack>
        )}
        {loading && (
          <Skeleton variant="rounded" width={"100%"} height={"12rem"} />
        )}
      </Stack>
      {showAddToCartModal && addToCartModal}
    </>
  );
}
