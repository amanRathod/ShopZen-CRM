import Divider from '@common/components/elements/Divider';
import LinkedItem from '@common/components/elements/LinkedItem';
import { H2, H3, H4, H5, P } from '@common/components/elements/Text';
import { formatMoney } from '@utils/formatter';
import { CartItem, StoreContext } from '@utils/store';
import Image from 'next/image';
import { useContext } from 'react';

type OrderInfoField = {
  field: string;
  value: string;
};

const OrderInfoField = ({ field, value }: OrderInfoField) => {
  return (
    <div className="flex items-center justify-between pt-5">
      <H5 className="text-gray-800">{field}</H5>
      <H4 className="text-gray-600">{value}</H4>
    </div>
  );
};

const OrderSummary = () => {
  const { state }: any = useContext(StoreContext);
  const { cartItems } = state.cart;

  const totalPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.price * c.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0
  );

  return (
    <div className="flex flex-col md:pl-10 pl-4 pr-10 md:pr-4 bg-white overflow-y-auto overflow-x-hidden h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col md:mt-10 mt-4">
          <H2>Order Summary</H2>
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-row justify-between items-center mt-4 py-2 border-b border-gray-200"
            >
              <div className="flex flex-row items-center">
                <LinkedItem href={`/product/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                    width={150}
                    height={150}
                  />
                </LinkedItem>
                <div className="flex flex-col ml-4">
                  <LinkedItem href={`/product/${item.id}`}>
                    <P className="text-gray-800">{item.name}</P>
                    <P className="text-gray-500">Quantity: {item.quantity}</P>
                  </LinkedItem>
                </div>
              </div>
              <H4 className="text-gray-800">{formatMoney(item.price)}</H4>
            </div>
          ))}

          <OrderInfoField field="Total Items" value={totalQuantity} />
          <OrderInfoField
            field="Total Charges"
            value={formatMoney(totalPrice)}
          />
          <OrderInfoField field="Shipping Charges" value={formatMoney(0)} />

          <Divider className="mt-4" />

          <div className="flex items-center justify-between pt-6">
            <H2 className="text-gray-800">Total</H2>
            <H3 className="text-gray-800">{formatMoney(totalPrice)}</H3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
