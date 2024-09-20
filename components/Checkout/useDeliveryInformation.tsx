import { db } from "@/lib/firebase/config";
import useSetDocument from "@/shared/hooks/useSetDocument";
import { DeliveryInfo } from "@/shared/interfaces/Order";
import { User } from "firebase/auth";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";

export default function useDeliveryInformation() {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: "",
    lastName: "",
    email: "",
    whatsappNumber: "",
    country: "",
    city: "",
    address1: "",
    address2: "",
    postalCode: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [qaulityCheck, setQualityCheck] = useState(false);
  const { createDocument, setDocument } = useSetDocument();

  const handleDeliveryInfoChange = (name: string, value: string) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };
  const handleSaveInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setSaveInfo(checked);
  const handleQualityCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setQualityCheck(checked);

  async function setDeliveryInfoDocument(user: User) {
    if (!deliveryInfo.id) {
      await createDocument(`users/${user.uid}/deliveryInformations`, {
        ...deliveryInfo,
        createdAt: Timestamp.now(),
      });
    } else {
      await setDocument(
        `users/${user.uid}/deliveryInformations`,
        deliveryInfo.id,
        { ...deliveryInfo, updatedAt: Timestamp.now() },
        true
      );
    }
  }

  async function deleteDeliveryInfoDocument(user: User, docId: string) {
    const docRef = doc(db, `users/${user.uid}/deliveryInformations/${docId}`);
    await deleteDoc(docRef);
  }

  return {
    deliveryInfo,
    saveInfo,
    qaulityCheck,
    handleDeliveryInfoChange,
    handleSaveInfoChange,
    handleQualityCheckChange,
    setDeliveryInfo,
    setDeliveryInfoDocument,
    deleteDeliveryInfoDocument,
  };
}
