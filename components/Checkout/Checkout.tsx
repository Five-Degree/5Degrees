"use client";
import { Stack } from "@mui/material";
import React, { useLayoutEffect } from "react";
import DeliveryInformation from "./DeliveryInformation";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import DeliverySchedule from "./DeliverySchedule";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useCheckout } from "./CheckoutContext";
export default function Checkout() {
  const { user } = useAuth();
  useLayoutEffect(() => {
    if (!user) redirect("/");
  }, [user]);
  const { handleCheckoutFormSubmit } = useCheckout();
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
        component={"form"}
        onSubmit={handleCheckoutFormSubmit}
      >
        <Stack width={"100%"} gap={1}>
          <DeliveryInformation />
          {/* <DeliverySchedule /> */}
          {/* <PaymentMethod /> */}
        </Stack>
        <OrderSummary />
      </Stack>
    </LocalizationProvider>
  );
}
