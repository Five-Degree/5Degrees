import { PaymentMethod } from "@/contexts/CheckoutContext";
import React, { useState } from "react";

export default function usePaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const handleSetPaymentMethod = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => setPaymentMethod(value);

  return { paymentMethod, handleSetPaymentMethod };
}
