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
import Order from "@/shared/interfaces/Order";
import { useRouter } from "next/navigation";

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
  const { cart, totalCost, clearCart } = useCart();
  const router = useRouter();

  const formHelpers = useFormHelpers();

  const deliveryInformation = useDeliveryInformation();

  const deliverySchedule = useDeliverySchedule();

  const paymentMethod = usePaymentMethod();
  const { createDocument } = useSetDocument();

  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(user?.uid);
    console.log({
      deliveryInformation,
      deliverySchedule,
      paymentMethod,
      cart,
      totalCost,
    });
    try {
      formHelpers.startLoading();
      if (deliveryInformation.saveInfo && user)
        await deliveryInformation.setDeliveryInfoDocument(user);
      if (cart.length > 0 && user) {
        const orderData: Omit<Order, "id"> = {
          userId: user.uid,
          deliveryInfo: deliveryInformation.deliveryInfo,
          createdAt: Timestamp.now(),
          status: "Confirming Order",
          cartTotalCost: totalCost,
          cartProducts: cart,
          qualityCheck: deliveryInformation.qaulityCheck,
        };
        const docRef = await createDocument("orders", orderData);
        clearCart();
        router.replace(`/checkout/success/${docRef?.id}`);
      }
      formHelpers.endLoading();
    } catch (error) {
      router.replace("/checkout/failed");
      formHelpers.endLoading();
      console.log(error);
    }
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
