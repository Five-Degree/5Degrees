import CheckoutContextProvider from "@/components/Checkout/CheckoutContext";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <CheckoutContextProvider>{children}</CheckoutContextProvider>;
}
