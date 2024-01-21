"use client";
import { Stack } from "@mui/material";
import React from "react";
import DeliveryInformation from "./DeliveryInformation";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import DeliverySchedule from "./DeliverySchedule";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Checkout() {
  return (
    // mui date picker localisation
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={2}
        paddingInline={3}
        flexWrap={{ md: "nowrap", xs: "wrap" }}
        fontSize={{ lg: "1.3rem", md: "1rem" }}
      >
        <Stack width={"100%"} gap={1}>
          <DeliveryInformation />
          <DeliverySchedule />
          <PaymentMethod />
        </Stack>
        <OrderSummary />
      </Stack>
    </LocalizationProvider>
  );
}
