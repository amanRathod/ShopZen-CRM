import { TableEntity } from ".";

export type Product = {
   id?: string;
   name: string;
   description?: string;
   price: number;
   sku: string;
   image: string;
   category: string;
   stock: number;
   active: boolean;
} & TableEntity