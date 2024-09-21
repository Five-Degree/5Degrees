import Order from "@/shared/interfaces/Order";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CartProductCard from "../Products/CartProductCard";
import CustomIconButton from "../Custom/CustomIconButton";
import {
  CloseRounded,
  FactCheckRounded,
  OpenInNewRounded,
} from "@mui/icons-material";
import Link from "next/link";
import timestampToDate from "@/shared/functions/timestampToDate";

interface Props {
  order: Order;
  open: boolean;
  handleClose: () => void;
}

export default function OrderModal({ order, open, handleClose }: Props) {
  const orderDetailsMap = {
    "Ordered On": timestampToDate(order.createdAt)?.toUTCString(),
    "Total Cost": `$${order.cartTotalCost}`,
    "Total Items in Order": `${order.cartProducts.length} items(s)`,
    "Est. Delivery Date": timestampToDate(order.deliveryDate)?.toUTCString(),
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        position={"relative"}
        width={"100%"}
        height={"100%"}
        sx={{ backdropFilter: "blur(5px)", pointerEvents: "none" }}
      >
        <CustomIconButton
          kind="shadow"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            translate: "-50% 50%",
            zIndex: 99999,
            pointerEvents: "all",
          }}
          onClick={handleClose}
        >
          <CloseRounded />
        </CustomIconButton>
        <Stack
          sx={{
            backgroundColor: "var(--background)",
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            width: { xs: "100%", md: "80%" },
            height: "fit-content",
            maxHeight: "95vh",
            overflow: "hidden auto",
            borderRadius: "var(--border-radius)",
            pointerEvents: "all",
          }}
          gap={3}
          p={3}
        >
          <Stack direction={"row"} sx={{ opacity: "0.5" }}>
            <Typography variant="h2">Order No.{order.id}</Typography>
          </Stack>
          <Stack paddingInline={1}>
            <Typography variant="h3">Order Details</Typography>
            <Divider flexItem />
          </Stack>
          <Stack paddingInline={3} gap={1}>
            {Object.keys(orderDetailsMap).map(
              (od) =>
                // dont show undefined values row
                orderDetailsMap[od as keyof typeof orderDetailsMap] && (
                  <Stack
                    direction={"row"}
                    key={od}
                    justifyContent={"space-between"}
                  >
                    <Typography>{od}</Typography>
                    <Typography color={"var(--accent)"}>
                      {orderDetailsMap[od as keyof typeof orderDetailsMap]}
                    </Typography>
                  </Stack>
                )
            )}
          </Stack>
          {order.qualityCheck && (
            <>
              <Stack paddingInline={1}>
                <Typography
                  variant="h3"
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                >
                  Quality Checking <FactCheckRounded />
                </Typography>
                <Divider flexItem />
              </Stack>
              <Stack paddingInline={3}>
                {
                  // If any of the statuses below or if there is not qc link then ask to wait
                  ((
                    [
                      "Confirming Order",
                      "Payment Pending",
                      "Processing Order",
                    ] as (typeof order)["status"][]
                  ).some((s) => order.status == s) ||
                    !order.qualityCheckLink) && (
                    <Typography color={"var(--accent)"}>
                      Please wait while our agent uploads a Quality Checking
                      Media link, you will find it here once it is available.
                    </Typography>
                  )
                }
                {order.qualityCheckLink && (
                  <Link href={order.qualityCheckLink} target="_blank">
                    <Button endIcon={<OpenInNewRounded />} variant="contained">
                      Click here to view your Quality Checking Media
                    </Button>
                  </Link>
                )}
              </Stack>
            </>
          )}

          <Stack paddingInline={1}>
            <Typography variant="h3">Ordered Products</Typography>
            <Divider flexItem />
          </Stack>
          <Stack
            paddingInline={3}
            gap={0.5}
            flexGrow={1}
            overflow={"hidden auto"}
            minHeight={"50vh"}
          >
            <Stack gap={1}>
              {order.cartProducts.map((cartProduct) => (
                <CartProductCard
                  key={cartProduct.cartId}
                  item={cartProduct}
                  readOnly
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}
