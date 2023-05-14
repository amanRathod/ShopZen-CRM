import { TableEntity } from ".";
import { Address } from "./address";
import { Product } from "./product";
import { User } from "./user";

export type Order = {
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  status: string;
  dateCreated: string;
  orderNumber: string;
  orderItems: OrderItem[];
  billingAddress: Address;
  shippingAddress: Address;
} & TableEntity

export type OrderItem = {
  price: number;
  quantity: number;
  product: Product;
} & TableEntity