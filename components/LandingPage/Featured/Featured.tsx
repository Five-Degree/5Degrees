"use client";
import CustomIconButton from "@/components/Custom/CustomIconButton";
import mockFeaturedProducts from "@/shared/constants/mockFeaturedProducts";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FeaturedCard from "./FeaturedCard";
export default function Featured() {
  const featureSlider = useRef<Slider>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: false,
    dots: true,
    customPaging: function (i) {
      return <></>;
    },
    arrows: false,
    onReInit: updateNumberOfPages,
    onSwipe: function (swipeDirection) {
      if (swipeDirection == "left") {
        handleNext();
      } else {
        handlePrev();
      }
    },
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1919,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
        },
      },
    ],
  };
  function updateNumberOfPages() {
    const slickDotsList = document.querySelector(".slick-dots") as HTMLElement;
    if (slickDotsList) {
      const childrenCount = slickDotsList.children.length;
      setTotalPages(childrenCount);
      slickDotsList.style.display = "none";
    }
  }
  useEffect(() => {
    // Function to update the state with the number of children in the "slick-dots" list
    updateNumberOfPages();
    const handleResize = () => {
      updateNumberOfPages();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener to avoid memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleNext() {
    if (featureSlider.current && currentPage < totalPages) {
      featureSlider.current.slickNext();
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrev() {
    if (featureSlider.current && currentPage > 1) {
      featureSlider.current.slickPrev();
      setCurrentPage(currentPage - 1);
    }
  }
  return (
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
        <Slider {...sliderSettings} ref={featureSlider}>
          {mockFeaturedProducts.map((product) => {
            return (
              <FeaturedCard
                anime={{ "data-aos": "zoom-in" }}
                product={product}
                key={product.id}
              />
            );
          })}
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
  );
}
