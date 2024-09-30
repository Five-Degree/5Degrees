import Footer from "@/components/LandingPage/Footer";
import { Stack, Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Stack gap={15}>
      <Stack gap={5} paddingInline={"8.3%"}>
        <Typography variant="h1">About Us</Typography>
        <Typography fontSize={"1.25rem"}>
          Our Guangzhou-based company was established in the early 2000s and has
          been supplying clothing, footwear, watches, and other items in large
          quantities to all over the world with the help of sister companies
          that are in charge of their designated products. By experimenting with
          different elements and circumstances, we have created and refined the
          cycle of renovation and ongoing R&D. Five Degrees was founded as a
          result of the parent company&apos;s new approach to expanding its
          international business and internal creation of an organization to
          facilitate the development of far more amicable terms of communication
          with our overseas clients. The primary reason for the ease of trade
          transition was the language barrier. Six years ago, we initiated a
          test project using social media platforms to increase awareness and
          test the system. Eventually, we were able to ease the transition into
          this new era, and customers and potential clients can now shop with
          ease using our dynamic structure.
        </Typography>
      </Stack>
      <Footer />
    </Stack>
  );
}
