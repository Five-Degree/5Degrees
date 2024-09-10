import React, { useState } from "react";
import { FormCredentials } from "../Custom/FormComponents/FormInput";

export default function useDeliveryInformation() {
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
  const [deliveryLocation, setDeliveryLocation] = useState<FormCredentials>({
    country: "",
    city: "",
    postalCode: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setSaveInfo(checked);
  return {
    deliveryInfo,
    deliveryLocation,
    saveInfo,
    handleDeliveryInfoChange,
    handleSaveInfo,
  };
}
