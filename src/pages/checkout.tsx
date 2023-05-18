import { NextPage } from "next";
import asPortalPage from "@hoc/asPortalPage";
import { withAuth } from "@hoc/withAuth";
import OrderSummary from "@modules/order/OrderSummary";
import ShippingDetails from "@modules/order/ShippingDetails";

const Checkout: NextPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between space-x-16">
      <div className="flex flex-col lg:w-1/2">
        <ShippingDetails/>
      </div>
      <div className="flex flex-col lg:w-1/2">
        <OrderSummary />
      </div>
    </div>
  )
}

export default asPortalPage('Checkout')(withAuth()(Checkout));