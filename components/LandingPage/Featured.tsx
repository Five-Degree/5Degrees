"use client";
import CustomIconButton from "@/components/Custom/CustomIconButton";
import FeaturedProductCard from "@/components/Products/FeaturedProductCard";
import mockProducts from "@/shared/constants/mockProducts";
import useAddToCartModal from "@/shared/hooks/useAddToCartModal";
import useSlickSlider from "@/shared/hooks/useSlickSlider";
import Product from "@/shared/interfaces/Products";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Stack, Typography } from "@mui/material";
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
  });
  const { handleAddToCartOpen, showAddToCartModal, addToCartModal } =
    useAddToCartModal({
      product: activeProduct,
    });

  function handleActiveProduct(product: Product) {
    setActiveProduct(product);
    handleAddToCartOpen();
  }
  return (
    <>
      <Stack direction={"row"}>
        <Stack
          marginLeft={"10%"}
          alignItems={"flex-end"}
          mr={2}
          data-aos="fade-up"
          // Responsive
          sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
        >
          <Typography variant="h1">Featured</Typography>
          <Typography variant="h2">
            {currentPage}|{totalPages}
          </Typography>
        </Stack>
        <Stack
          width={"100%"}
          sx={{ overflowX: "hidden" }}
          position={"relative"}
          height={"max-content"}
        >
          <Slider {...sliderSettings} ref={sliderRef}>
            {mockProducts.map(
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
                left: "10%",
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
                right: "10%",
                top: "40%",
              }}
              onClick={handleNext}
            >
              <ArrowForwardRoundedIcon />
            </CustomIconButton>
          )}
        </Stack>
      </Stack>
      {showAddToCartModal && addToCartModal}
    </>
  );
}
