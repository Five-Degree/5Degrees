"use client";
import { CartProduct } from "@/shared/interfaces/Products";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import mergeArrayWithObject from "@/shared/functions/mergeArrayWithObject";
import { Snackbar, Stack, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const cartContext = createContext<any>({});
export const useCart = (): ICartContext => useContext(cartContext);
export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getInitialCart = () => {
    if (typeof window !== "undefined") {
      const storedCart = Cookies.get("cart");
      if (storedCart) return JSON.parse(storedCart);
    }
    return [];
  };
  const [cart, setCart] = useState<CartProduct[]>(getInitialCart);
  const [totalCost, setTotalCost] = useState(0);
  const [showSb, setShowSb] = useState(false);
  const [sbMessage, setSbMessage] = useState("");
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
    const newTotalCost = cart.reduce(
      (accumulator, product) =>
        accumulator + product.unitPrice * product.quantity,
      0
    );
    setTotalCost(newTotalCost);
  }, [cart]);
  const addToCart = (product: CartProduct) => {
    setCart((prev) => [...prev, product]);
    handleShowSb("Item added to cart!");
  };
  const removeFromCart = (product: CartProduct) => {
    const filteredCart = cart.filter((prod) => prod.id != product.id);
    setCart(filteredCart);
    handleShowSb("Item removed from cart!");
  };
  const clearCart = () => {
    setCart([]);
    handleShowSb("Cart cleared");
  };
  function handleShowSb(mssg: string) {
    setSbMessage(mssg);
    setShowSb(true);
  }
  const handleHideSb = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSb(false);
  };
  return (
    <cartContext.Provider
      value={{ cart, totalCost, addToCart, removeFromCart, clearCart }}
    >
      {children}
      <Snackbar
        open={showSb}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleHideSb}
        message={
          <Stack direction="row" gap={2}>
            <ShoppingCartRoundedIcon />
            {sbMessage}
          </Stack>
        }
      />
    </cartContext.Provider>
  );
}
interface ICartContext {
  cart: CartProduct[];
  totalCost: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}
