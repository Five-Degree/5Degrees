"use client";
import Loading from "@/components/Custom/Loading";
import Product, { CartProduct } from "@/shared/interfaces/Products";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Snackbar, Stack } from "@mui/material";
import Cookies from "js-cookie";
import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
    Cookies.set("cart", JSON.stringify(cart), { sameSite: "Strict" });
    const newTotalCost = cart.reduce(
      (accumulator, product) =>
        accumulator + product.unitPrice * product.quantity,
      0
    );
    setTotalCost(newTotalCost);
  }, [cart]);
  const addToCart = (product: CartProduct) => {
    setCart((prev) => [...prev, product]);
    handleShowSnackbar("Item added to cart!");
  };
  const removeFromCart = (product: CartProduct) => {
    const filteredCart = cart.filter((prod) => prod.id != product.id);
    setCart(filteredCart);
    handleShowSnackbar("Item removed from cart!");
  };
  const clearCart = () => {
    setCart([]);
    handleShowSnackbar("Cart cleared!");
  };

  function handleShowSnackbar(mssg: string) {
    setSbMessage(mssg);
    setShowSb(true);
  }
  const handleHideSnackbar = (
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
      value={{
        cart,
        totalCost,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      <Suspense fallback={<Loading />}>
        {children}
        <Snackbar
          open={showSb}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleHideSnackbar}
          message={
            <Stack direction="row" gap={2} alignItems={"center"}>
              <ShoppingCartRoundedIcon />
              {sbMessage}
            </Stack>
          }
        />
      </Suspense>
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
