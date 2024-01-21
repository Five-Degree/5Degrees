import { useCart } from "@/contexts/CartContext";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
  Button,
  Divider,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import CartDrawerCard from "../Products/CartDrawerCard";
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
    >
      <Stack
        paddingInline={3}
        paddingBlock={3}
        gap={1}
        position={"relative"}
        fontSize={{ xl: "1.3rem", lg: "1.1rem", md: "1rem" }}
        maxHeight={"100vh"}
      >
        <Typography variant="h1">Cart</Typography>

        <Divider flexItem />
        <Stack
          gap={1}
          height={"80vh"}
          maxHeight={"80vh"}
          sx={{ overflowY: "auto", overflowX: "clip" }}
        >
          {cart.length == 0 && (
            <Stack
              sx={{
                color: "var(--gray)",
                minWidth: "21.875rem",
                minHeight: "10.625rem",
              }}
              alignItems={"center"}
              gap={2}
            >
              <ProductionQuantityLimitsIcon fontSize="large" />
              <Typography color={"var(--gray)"} variant="h2">
                Your cart is empty!
              </Typography>
            </Stack>
          )}
          {cart.map((item) => {
            return <CartDrawerCard item={item} key={item.id} />;
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
