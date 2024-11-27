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
import useOrderNotes from "./useOrderNotes";
import convertUndefinedToNull from "@/shared/functions/convertUndefinedToString";

type CheckoutContextType =
  | ({
      handleCheckoutFormSubmit: (
        e: React.FormEvent<HTMLFormElement>
      ) => Promise<void>;
    } & ReturnType<typeof useDeliveryInformation> &
      ReturnType<typeof useDeliverySchedule> &
      ReturnType<typeof usePaymentMethod> &
      ReturnType<typeof useFormHelpers> &
      ReturnType<typeof useOrderNotes>)
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

  const formHelpersHook = useFormHelpers();

  const deliveryInformationHook = useDeliveryInformation();

  const deliveryScheduleHook = useDeliverySchedule();

  //TODO Convert to discount code hook once campaigns is implemented
  const orderNotesHook = useOrderNotes();

  const paymentMethodHook = usePaymentMethod();
  const { createDocument } = useSetDocument();

  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(user?.uid);
    console.log({
      deliveryInformationHook,
      deliveryScheduleHook,
      paymentMethodHook,
      cart,
      totalCost,
    });
    try {
      formHelpersHook.startLoading();
      if (deliveryInformationHook.saveInfo && user)
        await deliveryInformationHook.setDeliveryInfoDocument(user);
      if (cart.length > 0 && user) {
        const orderData: Omit<Order, "id"> = {
          userId: user.uid,
          deliveryInfo: deliveryInformationHook.deliveryInfo,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          status: "Confirming Order",
          cartTotalCost: totalCost,
          cartProducts: cart,
          qualityCheck: deliveryInformationHook.qualityCheck,
          orderNotes: orderNotesHook.orderNotes,
        };
        const formattedOrderData = convertUndefinedToNull(orderData);
        const docRef = await createDocument("orders", formattedOrderData);
        clearCart(false);
        router.replace(`/checkout/success/${docRef?.id}`);
      }
      formHelpersHook.endLoading();
    } catch (error) {
      console.log(error);
      formHelpersHook.endLoading();
      router.replace("/checkout/failed");
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...deliveryInformationHook,
        ...deliveryScheduleHook,
        ...orderNotesHook,
        ...paymentMethodHook,
        ...formHelpersHook,
        handleCheckoutFormSubmit,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
export type PaymentMethod = "card" | "online" | "cod";
