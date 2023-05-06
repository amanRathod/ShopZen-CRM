import asPortalPage from "@common/hoc/asPortalPage";
import { withAuth } from "@common/hoc/withAuth";
import { useQuery } from "@lib/react-query";
import OrderSummary from "@modules/order/OrderSummary";
import ShippingDetails from "@modules/order/ShippingDetails";
import { endpoint } from "@utils/constants/endpoints";
import { NextPage } from "next";

const Checkout: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-x-16">
      <div className="flex flex-col md:w-1/2">
        <ShippingDetails/>
      </div>
      <div className="flex flex-col md:w-1/2">
        <OrderSummary />
      </div>
    </div>
  )
}

export default asPortalPage('Checkout')(withAuth()(Checkout));