"use client";
import { FormCredentials } from "@/components/Custom/FormComponents/FormInput";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>({});
export const useCheckout = (): ICheckoutContext => useContext(CheckoutContext);
export default function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const [defaultDeliveryDate, setDefaultDeliveryDate] = useState<Dayjs | null>(
    dayjs().add(3, "days")
  );
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleScheduleDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setScheduleDelivery(checked);

  const handleRapidDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setRapidDelivery(checked);

  const handleDefaultDeliveryDate = (day: Dayjs) => setDefaultDeliveryDate(day);

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
  const returnVal = {
    deliveryInfo,
    saveInfo,
    scheduleDelivery,
    rapidDelivery,
    defaultDeliveryDate,
    paymentMethod,
    handleSaveInfo,
    handleDeliveryInfoChange,
    handleScheduleDelivery,
    handleRapidDelivery,
    handleDefaultDeliveryDate,
    handleSetPaymentMethod,
  };
  return (
    <CheckoutContext.Provider value={returnVal}>
      {children}
    </CheckoutContext.Provider>
  );
}
export type PaymentMethod="card" | "online" | "cod"
interface ICheckoutContext {
  deliveryInfo: FormCredentials;
  saveInfo: boolean;
  scheduleDelivery: boolean;
  rapidDelivery: boolean;
  defaultDeliveryDate: dayjs.Dayjs | null;
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
  handleDefaultDeliveryDate: (day: Dayjs) => void;
  handleSetPaymentMethod: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => void;
}
