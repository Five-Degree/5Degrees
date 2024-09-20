import { Timestamp } from "firebase/firestore";
import { CartProduct } from "./Products";
import {
  AutorenewRounded,
  CheckCircleRounded,
  LocalShippingRounded,
} from "@mui/icons-material";

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
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  deliveryDate?: Timestamp;
  status: OrderStatus;
  cartTotalCost: number;
  cartProducts: CartProduct[];
  qualityCheck: boolean;
  qualityCheckLink?: string;
}
