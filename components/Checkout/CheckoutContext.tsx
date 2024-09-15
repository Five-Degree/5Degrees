"use client";
import useDeliveryInformation from "@/components/Checkout/useDeliveryInformation";
import useDeliverySchedule from "@/components/Checkout/useDeliverySchedule";
import usePaymentMethod from "@/components/Checkout/usePaymentMethod";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import useSetDocument from "@/shared/hooks/useSetDocument";
import { Timestamp } from "firebase/firestore";
import { createContext, useContext } from "react";
import useFormHelpers from "../Custom/FormComponents/useFormHelpers";

type CheckoutContextType =
  | ({
      handleCheckoutFormSubmit: (
        e: React.FormEvent<HTMLFormElement>
      ) => Promise<void>;
    } & (ReturnType<typeof useDeliveryInformation> &
      ReturnType<typeof useDeliverySchedule> &
      ReturnType<typeof usePaymentMethod> &
      ReturnType<typeof useFormHelpers>))
  | null;

export const CheckoutContext = createContext<CheckoutContextType>(null);
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context == null) {
    throw new Error(
      "Checkout components must be wrapped in <CheckoutContextProvider />"
    );
  }
  return context;
};
export default function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { cart, totalCost } = useCart();

  const formHelpers = useFormHelpers();

  const deliveryInformation = useDeliveryInformation();

  const deliverySchedule = useDeliverySchedule();

  const paymentMethod = usePaymentMethod();

  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(user?.uid);
    console.log({
      ...deliveryInformation,
      ...deliverySchedule,
      ...paymentMethod,
      cart,
      totalCost,
    });
    if (deliveryInformation.saveInfo && user)
      await deliveryInformation.setDeliveryInfoDocument(user);
    

    
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...deliveryInformation,
        ...deliverySchedule,
        ...paymentMethod,
        ...formHelpers,
        handleCheckoutFormSubmit,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
export type PaymentMethod = "card" | "online" | "cod";
