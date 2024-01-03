"use client";
import Image from "next/image";
import React from "react";
import HeroText from "@/public/Images/HeroText.svg";
import HeroBg from "@/public/Images/HeroBg.png";
import HeroShoe from "@/public/Images/HeroShoe.png";
import { Stack, Typography } from "@mui/material";
export default function Hero() {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${HeroBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        minHeight: "70vh",
      }}
      direction={"row"}
      position="relative"
    >
      <Image
        src={HeroText}
        alt="Discover limited sneakers without limitations"
        style={{
          marginLeft: "10%",
          width: "40%",
          height: "auto",
        }}
      />
      <Stack
        sx={{
          position: "absolute",
          right: "-7%",
          bottom: "0",
          width: "70%",
          minWidth: { xl: "65.3125rem", lg: "45rem" },
          height: "auto",
        }}
      >
        <Image
          src={HeroShoe}
          alt="Nike Shoes"
          style={{ width: "100%", height: "auto" }}
        />
      </Stack>
    </Stack>
  );
}
