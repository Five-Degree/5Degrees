import { Timestamp } from "firebase/firestore";
import { CartProduct } from "./Products";

export type DeliveryInfo = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  address1: string;
  address2?: string;
  country: string;
  city: string;
  postalCode: string;
  dateCreated?: string;
};

export type OrderStatus =
  | "Confirming Order"
  | "Payment Pending"
  | "Processing Order"
  | "Out for Delivery"
  | "Delivered";

export default interface Order {
  id: string;
  userId: string;
  deliveryInfo: DeliveryInfo;
  dateCreated: Timestamp;
  status: OrderStatus;
  cartTotal: number;
  cartProducts: CartProduct[];
  qualityCheck?: boolean;
  qualityCheckLink?: string;
}
