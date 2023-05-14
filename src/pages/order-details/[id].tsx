import { H4 } from '@elements/Text';
import { TertiaryButton } from '@elements/button';
import { endpoint } from '@utils/constants/endpoints';
import asPortalPage from '@hoc/asPortalPage';
import { Order, OrderItem } from '@appTypes/order';
import { useQuery } from '@lib/react-query';
import { useRouter } from 'next/router';
import InlineLoader from '@elements/loader/InlineLoader';
import ProductList from '@modules/products/components/ProductList';
import { formatDate, formatMoney } from '@utils/formatter';
import ErrorBox from '@elements/ErrorBox';
import {
  AddressInfoField,
  OrderInfoField,
  PriceInfoField,
} from '@elements/List';
import Tag from '@elements/Tag';
import LinkedItem from '@common/components/elements/LinkedItem';

const OrderDetails = () => {
  const router = useRouter();
  const id = router.query.id ? `${router.query.id}` : undefined;

  const { data, isLoading } = useQuery<{ order: Order }>(
    endpoint.order.get(id!),
    id,
    {},
    false,
    false
  );

  if (isLoading) return <InlineLoader />;

  if (!data) {
    return (
      <ErrorBox
        title="Order not found"
        text="The order you are looking for does not exist!"
        redirectButton={{
          text: 'View All Orders',
          href: '/order-history',
        }}
      />
    );
  }

  const { order } = data;
  const {
    shippingAddress,
    billingAddress,
    dateCreated,
    orderTrackingNumber,
    totalPrice,
  } = order;

  return (
    <div>
      <div className="flex justify-center flex-col w-full lg:w-9/12 xl:w-full ">
        <div className="lg:flex items-center py-4">
          <OrderInfoField field="Order On" value={formatDate(dateCreated)} />
          <div className="border border-gray-200 h-6 w-0.5 ml-4 hidden lg:block"></div>

          <OrderInfoField
            field="Order Number"
            value={`#${orderTrackingNumber}`}
            className="lg:ml-4"
          />
          <div className="border border-gray-200 h-6 w-0.5 ml-4 hidden lg:block"></div>

          <div className="flex justify-between py-4 lg:py-0">
            <LinkedItem
              href="#"
              className="lg:ml-4 text-tertiary-600  hover:text-tertiary-800  hover:underline"
            >
              Invoice
            </LinkedItem>
          </div>
        </div>

        <div className="border-2 w-full bg-primary-100 mb-10">
          {order.orderItems.map((item: OrderItem) => {
            return (
              <ProductList
                quantity={item.quantity}
                totalPrice={item.price}
                {...item.product}
              />
            );
          })}
        </div>

        <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
          <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8">
            <AddressInfoField field="Billing Address">
              {billingAddress.street}, {billingAddress.city}
              <br></br>
              {billingAddress.state} {billingAddress.zipCode} <br></br>
              {billingAddress.country}
            </AddressInfoField>

            <AddressInfoField field="Shipping Address">
              {shippingAddress.street}, {shippingAddress.city}
              <br></br>
              {shippingAddress.state} {shippingAddress.zipCode} <br></br>
              {shippingAddress.country}
            </AddressInfoField>

            <AddressInfoField field="Shipping Method">
              DHL - Takes up to 3 working days
            </AddressInfoField>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
              <PriceInfoField
                field="Subtotal"
                value={formatMoney(totalPrice)}
              />
              <PriceInfoField field="Discount" value={formatMoney(0)}>
                <Tag className="rounded-none">LIMITED</Tag>
              </PriceInfoField>
              <PriceInfoField field="Shipping" value={formatMoney(0)} />
            </div>

            <div className="flex justify-between items-center w-full">
              <H4 className=" text-gray-800">Total</H4>
              <H4 className="text-gray-600">{formatMoney(totalPrice)}</H4>
            </div>
            <div className="pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8">
              <TertiaryButton className="w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-800">
                Track Your Order
              </TertiaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default asPortalPage('Order Details')(OrderDetails);
