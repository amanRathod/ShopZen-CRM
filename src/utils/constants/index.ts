export const Brand = {
   name: "ShopZen",
   description: "ShopZen is a simple e-commerce app that allows you to buy and sell products.",
 };

export const PAGE_SIZES = [10, 20, 30, 40, 50];

export const Months = [
  { value: "01", label: "01 - January" },
  { value: "02", label: "02 - February" },
  { value: "03", label: "03 - March" },
  { value: "04", label: "04 - April" },
  { value: "05", label: "05 - May" },
  { value: "06", label: "06 - June" },
  { value: "07", label: "07 - July" },
  { value: "08", label: "08 - August" },
  { value: "09", label: "09 - September" },
  { value: "10", label: "10 - October" },
  { value: "11", label: "11 - November" },
  { value: "12", label: "12 - December" },
];

export const Years = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
];

export const PaymentMethod = {
  COD: "Cash On Delivery",
  CARD: "Card",
  PAYPAL: "PayPal",
  STRIPE: "Stripe",
}

export const GlobalState = {
  CART_ADD_ITEM: "CART_ADD_ITEM",
  CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
  CART_CLEAR_ITEMS: "CART_CLEAR_ITEMS",
  SAVE_SHIPPING_ADDRESS: "SAVE_SHIPPING_ADDRESS",
  SAVE_BILLING_ADDRESS: "SAVE_BILLING_ADDRESS",
  SAVE_PAYMENT_METHOD: "SAVE_PAYMENT_METHOD",
  SAVE_ORDER: "SAVE_ORDER",
  CLEAR_ORDER: "CLEAR_ORDER",
  CART_CLEAR_AFTER_PAYMENT: "CART_CLEAR_AFTER_PAYMENT",
};
