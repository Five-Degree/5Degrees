import CartProductCard from "@/components/Products/CartProductCard";
import { useCart } from "@/contexts/CartContext";
import { ProductionQuantityLimitsRounded } from "@mui/icons-material";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import {
  Button,
  Divider,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
export default function CartDrawer({
  drawerState,
  toggleDrawer,
  handleCheckoutAction,
}: {
  drawerState: boolean;
  toggleDrawer: (
    state: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleCheckoutAction: () => void;
}) {
  const { cart, totalCost, clearCart } = useCart();

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawerState}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          width: "30%",
          minWidth: "330px",
        },
      }}
    >
      <Stack
        paddingInline={3}
        paddingBlock={3}
        gap={1}
        position={"relative"}
        maxHeight={"100svh"}
      >
        <Typography variant="h1">Cart</Typography>

        <Divider flexItem />
        <Stack
          gap={1}
          height={"80vh"}
          maxHeight={"80vh"}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridAutoRows: "min-content",
            overflowY: "auto",
            overflowX: "clip",
          }}
        >
          {cart.length == 0 && (
            <Stack
              sx={{
                color: "var(--gray)",
                minWidth: "20.625rem",
                minHeight: "10.625rem",
              }}
              alignItems={"center"}
              mt={2}
            >
              <ProductionQuantityLimitsRounded sx={{ fontSize: "3rem" }} />
              <Typography color={"var(--gray)"} variant="h2">
                Your cart is empty!
              </Typography>
            </Stack>
          )}
          {cart.map((item) => {
            return <CartProductCard item={item} key={item.cartId} />;
          })}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Button disabled={cart.length == 0} onClick={clearCart}>
            Clear All
          </Button>
          <Stack alignItems={"flex-end"}>
            <Typography variant="h3">Subtotal:</Typography>
            <Typography variant="h1" color={"var(--accent)"}>
              ${totalCost}
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          disabled={cart.length == 0}
          endIcon={<ExitToAppRoundedIcon />}
          onClick={handleCheckoutAction}
        >
          Checkout
        </Button>
        <Button onClick={toggleDrawer(false)}>Continue Shopping!</Button>
      </Stack>
    </SwipeableDrawer>
  );
}
