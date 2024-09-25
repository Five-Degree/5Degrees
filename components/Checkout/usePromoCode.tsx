import Order from "@/shared/interfaces/Order";
import React, { ChangeEvent, useState } from "react";

export default function usePromoCode() {
  const [promoCode, setPromoCode] = useState<Order["promoCode"]>("");
  function handlePromoCodeChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPromoCode(event.target.value);
  }
  return {
    handlePromoCodeChange,
    promoCode,
  };
}
