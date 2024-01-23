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
    setCart((prev) => {
      // Check if the product is already in the cart
      const existingProductIndex = prev.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, replace the existing instance
        const updatedCart = [...prev];
        updatedCart[existingProductIndex] = product;
        return updatedCart;
      } else {
        // If the product is not in the cart, add it to the cart
        return [...prev, product];
      }
    });
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
  const getFromCart = (productId: Product["id"]) => {
    const existingIndex = cart.findIndex((ci) => ci.id == productId);
    if (existingIndex !== -1) {
      return cart[existingIndex];
    } else return null;
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
        getFromCart,
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
  getFromCart: (productId: Product["id"]) => CartProduct | null;
  removeFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}
