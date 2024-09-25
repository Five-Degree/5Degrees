import timestampToDate from "@/shared/functions/timestampToDate";
import Order, { OrderStatus } from "@/shared/interfaces/Order";
import {
  AutorenewRounded,
  CancelRounded,
  CheckCircleRounded,
  CheckRounded,
  CurrencyExchangeRounded,
  DangerousRounded,
  DoneAllRounded,
  FactCheckRounded,
  LocalShippingRounded,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import OrderModal from "./OrderModal";

export function generateStatusIcon(status: OrderStatus) {
  switch (status) {
    case "Confirming Order":
      return <CheckRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Payment Pending":
      return <CurrencyExchangeRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Processing Order":
      return <AutorenewRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Out for Delivery":
      return <LocalShippingRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Delivered":
      return <DoneAllRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Cancelled":
      return <CancelRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    case "Failed":
      return <DangerousRounded sx={{ fontSize: "var(--body1)" }} />;
      break;
    default:
      return <></>;
      break;
  }
}

export default function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Stack
        border={"1px solid var(--border-color)"}
        borderRadius={"var(--border-radius)"}
        padding={3}
        gap={2}
        sx={{
          transition: "all 0.3s ease",
          cursor: "pointer",
          ":hover": {
            background: "var(--border-color)",
          },
        }}
        onClick={handleOpen}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Stack>
            <Typography variant="h2" fontSize={"1.8em"}>
              Order no. {order.id}
            </Typography>
            <Typography sx={{ opacity: 0.5 }}>
              {timestampToDate(order.createdAt)?.toUTCString()}
            </Typography>
          </Stack>
          <Typography
            alignItems={"center"}
            display={"flex"}
            color={"var(--accent)"}
            // variant="body2"
            textAlign={"center"}
            gap={0.5}
          >
            {generateStatusIcon(order.status)} {order.status}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
        >
          <Stack
            display={"flex"}
            direction={"row"}
            alignItems={"center"}
            gap={1}
          >
            <Typography>
              {order.cartProducts.length} product{"("}s{")"}
            </Typography>
            {order.qualityCheck && (
              <Typography
                bgcolor={"var(--accentalpha)"}
                display={"flex"}
                alignItems={"center"}
                color={"var(--accent)"}
                paddingInline={1}
                paddingBlock={0.5}
                borderRadius={"var(--border-radius)"}
                gap={0.5}
                variant="body2"
              >
                Your purchase will be quality checked <FactCheckRounded />
              </Typography>
            )}
            {/* <Typography>Tap to know more</Typography> */}
          </Stack>
          <Typography variant="h3">{order.cartTotalCost}$</Typography>
        </Stack>
      </Stack>
      <OrderModal open={open} order={order} handleClose={handleClose} />
    </>
  );
}
