"use client";
import CustomIconButton from "@/components/Custom/CustomIconButton";
import FeaturedProductCard from "@/components/Products/FeaturedProductCard";
import mockProducts from "@/shared/constants/mockProducts";
import useAddToCartModal from "@/shared/hooks/useAddToCartModal";
import useCollectionController from "@/shared/hooks/useCollectionController";
import useSlickSlider from "@/shared/hooks/useSlickSlider";
import Product from "@/shared/interfaces/Products";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Skeleton, Stack, Typography } from "@mui/material";
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
  const {
    results: featProducts,
    loading,
    lastResult,
    showNext,
  } = useCollectionController<Product>({
    coll: "products",
    initialWhereClause: {
      fieldPath: "featuredImage",
      opStr: "!=",
      value: null,
    },
    orderby: { fieldPath: "createdAt", directionStr: "desc" },
  });
  console.log(featProducts);
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
                kind="shadow"
                sx={{
                  position: "absolute",
                  left: "5%",
                  top: "40%",
                  rotate: "180deg",
                }}
                onClick={handlePrev}
              >
                <ArrowForwardRoundedIcon />
              </CustomIconButton>
            )}
            {currentPage < totalPages && (
              <CustomIconButton
                kind="shadow"
                sx={{
                  position: "absolute",
                  right: "5%",
                  top: "40%",
                }}
                onClick={handleNext}
              >
                <ArrowForwardRoundedIcon />
              </CustomIconButton>
            )}
          </Stack>
        )}
        {loading && <Skeleton variant="rounded" width={"100%"} height={350} />}
      </Stack>
      {showAddToCartModal && addToCartModal}
    </>
  );
}
