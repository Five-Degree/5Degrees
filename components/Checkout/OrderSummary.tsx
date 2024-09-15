import { useCart } from "@/contexts/CartContext";
import { CheckRounded } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import CartDrawerCard from "../Products/CartDrawerCard";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useCheckout } from "./CheckoutContext";

export default function OrderSummary() {
  const { cart, totalCost } = useCart();
  const { loading } = useCheckout();
  // useLayoutEffect(() => {
  //   if (cart.length < 1) {
  //     redirect("/");
  //   }
  // }, [cart]);
  return (
    <Stack
      sx={{ width: { lg: "60%", md: "100%", xs: "100%" }, height: "90vh" }}
    >
      <Card>
        <CardContent sx={{ height: "100%" }}>
          <Stack height={"100%"} justifyContent={"space-between"}>
            <Typography variant="h2">Order Summary</Typography>
            <Stack
              mt={2}
              gap={3}
              maxHeight={"75%"}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridAutoRows: "min-content",
                overflowY: "auto",
                overflowX: "clip",
              }}
              pb={2}
              borderBottom={"1px solid var(--border-color)"}
            >
              {cart.length > 0 ? (
                cart.map((item) => <CartDrawerCard item={item} key={item.id} />)
              ) : (
                <Stack
                  sx={{
                    color: "var(--gray)",
                    minWidth: "20.625rem",
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
            </Stack>

            <Stack gap={1} paddingInline={2}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontSize={"1.2em"}>Shipping</Typography>
                <Typography variant="h1">-</Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontSize={"1.2em"}>Total</Typography>
                <Typography variant="h1">${totalCost}</Typography>
              </Stack>
              <Button
                variant="contained"
                type="submit"
                endIcon={<CheckRounded />}
                disabled={cart.length == 0 || loading}
              >
                Confirm Order
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
