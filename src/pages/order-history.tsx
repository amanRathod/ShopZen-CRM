import Divider from '@common/components/elements/Divider';
import asPortalPage from '@common/hoc/asPortalPage';
import { NextPage } from 'next';
import LinkedItem from '@common/components/elements/LinkedItem';
import ProductList from '@modules/products/components/ProductList';
import { useQuery } from '@lib/react-query';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@common/components/elements/loader/InlineLoader';
import { Order, OrderItem } from '@common/types/order';
import { formatDate, formatMoney } from '@utils/formatter';
import { OrderInfoField } from '@common/components/elements/List';

const OrderHistory: NextPage = () => {
  const { data, isLoading } = useQuery<{ orders: Order }>(
    endpoint.order.getAll,
    '',
    {},
    false,
    false
  );

  if (isLoading || !data.orders) return <InlineLoader />;
  const { orders } = data;

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

export default asPortalPage('Order History')(OrderHistory);
