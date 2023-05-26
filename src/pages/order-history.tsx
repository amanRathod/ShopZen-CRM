import { NextPage } from 'next';
import { useQuery } from '@lib/react-query';
import Divider from '@elements/Divider';
import { withAuth } from '@hoc/withAuth';
import asPortalPage from '@hoc/asPortalPage';
import LinkedItem from '@elements/LinkedItem';
import { OrderInfoField } from '@elements/List';
import { endpoint } from '@utils/constants/endpoints';
import { Order, OrderItem } from '@common/types/order';
import InlineLoader from '@elements/loader/InlineLoader';
import { formatDate, formatMoney } from '@utils/formatter';
import ProductList from '@modules/products/components/ProductList';
import { TruckIcon } from '@heroicons/react/outline';
import { H4, P } from '@common/components/elements/Text';
import { TertiaryButton } from '@common/components/elements/button';
import { Router, useRouter } from 'next/router';

const OrderHistory: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery<{ orders: Order }>(
    endpoint.order.getAll,
    '',
    {},
    false,
    false
  );

  if (isLoading || !data.orders) return <InlineLoader />;
  const { orders } = data;

  if (!data.orders) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <TruckIcon className="w-80 h-80 text-gray-800" />
        <H4 className="text-gray-600 pt-5">
          Looks like you haven't placed any orders yet!
        </H4>
        <TertiaryButton
          onClick={() => router.push('/')}
          className="w-64 py-5 border mt-10"
        >
          Order Now
        </TertiaryButton>
      </div>
    );
  }

  return (
    <>
      {orders.map((order: Order) => (
        <div className="border-2 w-full bg-gray-50 mb-10">
          <div className="flex lg:flex-row flex-col justify-between p-6 bg-gray-100">
            <div className="lg:flex items-center">
              <OrderInfoField
                field="Order Date"
                value={formatDate(order.dateCreated)}
                className="lg:flex-col lg:pr-12"
              />
              <OrderInfoField
                field="Total"
                value={formatMoney(order.totalPrice)}
                className="lg:flex-col lg:pr-12"
              />
              <OrderInfoField
                field="Order Number"
                value={`#${order.orderTrackingNumber}`}
                className="lg:flex-col lg:pr-12"
              />
            </div>

            <div className="flex justify-around">
              <LinkedItem
                href={`/order-details/${order.id}`}
                className="text-primary-600  hover:text-primary-800  hover:underline"
              >
                View order details
              </LinkedItem>
              <LinkedItem
                href="#"
                className="ml-4 text-primary-600  hover:text-primary-800  hover:underline"
              >
                Invoice
              </LinkedItem>
            </div>
          </div>
          <Divider />

          {order?.orderItems?.map((item: OrderItem) => (
            <ProductList key={item.id} {...item} />
          ))}
        </div>
      ))}
    </>
  );
};

export default asPortalPage('Order History')(withAuth()(OrderHistory));
