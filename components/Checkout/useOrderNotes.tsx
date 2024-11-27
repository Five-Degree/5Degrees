import Order from "@/shared/interfaces/Order";
import React, { ChangeEvent, useState } from "react";

export default function useOrderNotes() {
  const [orderNotes, setOrderNotes] = useState<Order["orderNotes"]>("");
  function handleOrderNotesChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setOrderNotes(event.target.value);
  }
  return {
    handleOrderNotesChange,
    orderNotes: orderNotes,
  };
}
