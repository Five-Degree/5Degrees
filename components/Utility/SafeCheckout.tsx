import { Lock } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import StripeLogo from "@/public/Logos/Stripe.svg";
import PaymentMethods from "@/public/Logos/PaymentMethods-row.svg";
export default function SafeCheckout() {
  return (
    <Stack alignItems={"center"} marginBlock={2} gap={2}>
      <Stack direction="row" alignItems={"center"} gap={2}>
        <Lock />
        <Typography>
          Guarenteed <strong>Safe & Secure</strong> Checkout
        </Typography>
        <Stack
          bgcolor={"var(--primary)"}
          direction={"row"}
          borderRadius={"var(--border-radius)"}
          alignItems={"center"}
          paddingInline={"1.5em"}
        >
          <Typography color="var(--white)">Powered By</Typography>
          <Image
            src={StripeLogo}
            alt="Stripe logo"
            style={{ height: "1.5em", width: "auto" }}
          />
        </Stack>
      </Stack>
      <Divider flexItem />
      <Image src={PaymentMethods} alt="All payment methods" />
    </Stack>
  );
}
