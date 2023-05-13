import Divider from '@common/components/elements/Divider';
import { H5, P } from '@common/components/elements/Text';
import asPortalPage from '@common/hoc/asPortalPage';
import { NextPage } from 'next';
import LinkedItem from '@common/components/elements/LinkedItem';
import ProductList from '@modules/products/components/ProductList';
import { useQuery } from '@lib/react-query';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@common/components/elements/loader/InlineLoader';
import { Order } from '@common/types/order';
import { formatDate, formatMoney } from '@utils/formatter';

type OrderInfoField ={
  field: string,
  value: string
}

const OrderInfoField = ({ field, value }: OrderInfoField) => {
  return (
    <>
      <div className="flex lg:flex-col justify-between  lg:pr-12  py-4 lg:py-0">
        <H5>{field}</H5>
        <P className="text-gray-600">{value}</P>
      </div>
      <Divider className="lg:hidden" />
    </>
  );
};

const OrderHistory: NextPage = () => {
  const { data, isLoading } = useQuery<{ orders: Order }>(
    endpoint.order.getAll,
    '',
    {},
    false,
    false
  );

  if (isLoading) return <InlineLoader />;
  if (!data) return <div>No order history</div>;

  const { orders } = data;

  return (
    <>
      {orders.map((order: Order) => (
        <div className="border-2 w-full bg-primary-100 mb-10">
          <div className="flex lg:flex-row flex-col justify-between p-6 bg-primary-300">
            <div className="lg:flex items-center">
              <OrderInfoField
                field="Order Date"
                value={formatDate(order.dateCreated)}
              />
              <OrderInfoField field="Total" value={formatMoney(order.totalPrice)} />
              <OrderInfoField
                field="Order Number"
                value={order.orderTrackingNumber}
              />
            </div>
            <div className="flex justify-around">
              <LinkedItem
                href={`/order-details/${order.id}`}
                className="text-tertiary-600  hover:text-tertiary-800  hover:underline"
              >
                View order details
              </LinkedItem>
              <LinkedItem
                href="#"
                className="ml-4 text-tertiary-600  hover:text-tertiary-800  hover:underline"
              >
                Invoice
              </LinkedItem>
            </div>
          </div>
          <Divider />
          {order?.orderItems?.map((item: any) => (
            <ProductList key={item.id} {...item.product} />
          ))}
        </div>
      ))}
    </>
  );
};

export default asPortalPage('Order History')(OrderHistory);
