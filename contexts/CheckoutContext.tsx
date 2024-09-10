"use client";
import useDeliveryInformation from "@/components/Checkout/useDeliveryInformation";
import useDeliverySchedule from "@/components/Checkout/useDeliverySchedule";
import usePaymentMethod from "@/components/Checkout/usePaymentMethod";
import useSetDocument from "@/shared/hooks/useSetDocument";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

type CheckoutContextType =
  | ({
      handleCheckoutFormSubmit: (
        e: React.FormEvent<HTMLFormElement>
      ) => Promise<void>;
    } & (ReturnType<typeof useDeliveryInformation> &
      ReturnType<typeof useDeliverySchedule> &
      ReturnType<typeof usePaymentMethod>))
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
  const { createDocument } = useSetDocument();
  const { user } = useAuth();
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
    });
    // await createDocument();
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...deliveryInformation,
        ...deliverySchedule,
        ...paymentMethod,
        handleCheckoutFormSubmit,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
export type PaymentMethod = "card" | "online" | "cod";
