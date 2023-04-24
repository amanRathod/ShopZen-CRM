export const formatMoney = (value: number) => {
   return new Intl.NumberFormat("en-IN", {
     style: "currency",
     currency: "INR",
   }).format(value);
 };
 
 export const formatDate = (date: string) => {
   return new Date(date).toLocaleString();
 };