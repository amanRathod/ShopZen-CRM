import asPortalPage from "@common/hoc/asPortalPage";
import OrderSummary from "@modules/order/OrderSummary";
import ShippingDetails from "@modules/order/ShippingDetails";
import { NextPage } from "next";

const Checkout: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-x-16">
      <div className="flex flex-col md:w-1/2">
        <ShippingDetails />
      </div>
      <div className="flex flex-col md:w-1/2">
        <OrderSummary />
      </div>
    </div>
  )
}

export default asPortalPage('Checkout')(Checkout);