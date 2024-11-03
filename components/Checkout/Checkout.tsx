"use client";
import { Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import DeliveryInformation from "./DeliveryInformation";
import OrderSummary from "./OrderSummary";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useCheckout } from "./CheckoutContext";
export default function Checkout() {
  const { user } = useAuth();
  useLayoutEffect(() => {
    if (!user) redirect("/");
    if (user && !user.emailVerified) redirect("/verifyEmail");
  }, [user]);
  const { handleCheckoutFormSubmit } = useCheckout();
  return (
    // mui date picker localisation
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        component={"form"}
        onSubmit={handleCheckoutFormSubmit}
        direction={"row"}
        justifyContent={"center"}
        gap={2}
        paddingInline={3}
        flexWrap={{ md: "nowrap", xs: "wrap" }}
        fontSize={{ lg: "1.3rem", md: "1rem" }}
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
