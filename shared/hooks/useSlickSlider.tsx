import React, { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function useSlickSlider() {
  const sliderRef = useRef<Slider>(null);
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
  function handleNext() {
    if (sliderRef.current && currentPage < totalPages) {
      sliderRef.current.slickNext();
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrev() {
    if (sliderRef.current && currentPage > 1) {
      sliderRef.current.slickPrev();
      setCurrentPage(currentPage - 1);
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
  return {
    sliderRef,
    sliderSettings,
    currentPage,
    totalPages,
    handleNext,
    handlePrev,
  };
}
