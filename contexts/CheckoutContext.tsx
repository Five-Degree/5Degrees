"use client";
import { FormCredentials } from "@/components/Custom/FormComponents/FormInput";
import useSetDocument from "@/shared/hooks/useSetDocument";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const CheckoutContext = createContext<ICheckoutContext>({
  deliveryInfo: {},
  saveInfo: false,
  scheduleDelivery: false,
  rapidDelivery: false,
  scheduledDeliveryDate: null,
  paymentMethod: "card",
  handleSaveInfo: function (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    throw new Error("Function not implemented.");
  },
  handleDeliveryInfoChange: function (
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    throw new Error("Function not implemented.");
  },
  handleScheduleDelivery: function (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    throw new Error("Function not implemented.");
  },
  handleRapidDelivery: function (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    throw new Error("Function not implemented.");
  },
  handleScheduledDeliveryDate: function (day: Dayjs): void {
    throw new Error("Function not implemented.");
  },
  handleSetPaymentMethod: function (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ): void {
    throw new Error("Function not implemented.");
  },
  handleCheckoutFormSubmit: function (
    e: React.FormEvent<HTMLFormElement>
  ): void {
    throw new Error("Function not implemented.");
  },
});
export const useCheckout = () => useContext(CheckoutContext);
export default function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { createDocument } = useSetDocument();
  const { user } = useAuth();
  const [deliveryInfo, setDeliveryInfo] = useState<FormCredentials>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postalcode: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [rapidDelivery, setRapidDelivery] = useState(false);
  const [scheduledDeliveryDate, setScheduledDeliveryDate] =
    useState<Dayjs | null>(dayjs().add(3, "days"));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const handleScheduleDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    // setRapidDelivery(false);
    setScheduleDelivery(checked);
  };

  const handleRapidDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setRapidDelivery(checked);

  const handleScheduledDeliveryDate = (day: Dayjs) =>
    setScheduledDeliveryDate(day);

  const handleSaveInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setSaveInfo(checked);

  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSetPaymentMethod = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => setPaymentMethod(value);
  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log({
      deliveryInfo,
      saveInfo,
      scheduleDelivery,
      scheduledDeliveryDate,
      paymentMethod,
    });
    console.log(user?.uid);
    // await createDocument();
  };

  return (
    <CheckoutContext.Provider
      value={{
        deliveryInfo,
        saveInfo,
        scheduleDelivery,
        rapidDelivery,
        scheduledDeliveryDate,
        paymentMethod,
        handleSaveInfo,
        handleDeliveryInfoChange,
        handleScheduleDelivery,
        handleRapidDelivery,
        handleScheduledDeliveryDate,
        handleSetPaymentMethod,
        handleCheckoutFormSubmit,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
export type PaymentMethod = "card" | "online" | "cod";
interface ICheckoutContext {
  deliveryInfo: FormCredentials;
  saveInfo: boolean;
  scheduleDelivery: boolean;
  rapidDelivery: boolean;
  scheduledDeliveryDate: dayjs.Dayjs | null;
  paymentMethod: PaymentMethod;
  handleSaveInfo: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  handleDeliveryInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleScheduleDelivery: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  handleRapidDelivery: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  handleScheduledDeliveryDate: (day: Dayjs) => void;
  handleSetPaymentMethod: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => void;
  handleCheckoutFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
