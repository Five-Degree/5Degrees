"use client";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { notFound, useParams, useRouter } from "next/navigation";

export default function OrderPage() {
  const { order } = useParams();
  const router = useRouter();
  switch (order[0]) {
    case "success":
      return (
        <Stack
          alignItems={"center"}
          maxWidth={"34.375rem"}
          padding={"2.5rem 1rem"}
          marginInline={"auto"}
          textAlign={"center"}
          border={"1px solid var(--border-color)"}
          borderRadius={"var(--border-radius)"}
          gap={2}
        >
          <Typography variant="h1" color={"var(--accent)"}>
            Your order has been placed Successfully!
          </Typography>
          <Typography variant="h2">Order no. {order[1]}</Typography>
          <Typography>
            Our agent will be checking & confirming the order, after which you
            will be contacted regarding the payment method.
          </Typography>
          <Typography>
            Click below to check your order status and details
          </Typography>
          <Button onClick={() => router.replace("/dashboard/orders")}>
            Order History
          </Button>
          <Divider flexItem>or</Divider>
          <Button onClick={() => router.replace("/")} variant="contained">
            Continue Shopping
          </Button>
        </Stack>
      );
      break;
    case "failed":
      return (
        <Stack
          alignItems={"center"}
          maxWidth={"34.375rem"}
          padding={"2.5rem 1rem"}
          marginInline={"auto"}
          textAlign={"center"}
          border={"1px solid var(--border-color)"}
          borderRadius={"var(--border-radius)"}
          gap={2}
        >
          <Typography variant="h1" color={"var(--accent)"}>
            Failed to place order!
          </Typography>
          <Typography>
            Please place the order again or contact one of our agents for
            further assistance
          </Typography>

          <Button onClick={() => router.replace("/")} variant="contained">
            Continue Shopping
          </Button>
        </Stack>
      );
      break;

    default:
      return notFound();
      break;
  }
}
