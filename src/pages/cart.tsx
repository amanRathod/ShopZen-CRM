import LinkedItem from '@elements/LinkedItem';
import { H1, H3, H4, P } from '@elements/Text';
import asPortalPage from '@hoc/asPortalPage';
import { Product } from '@appTypes/product';
import { showInfoAlert, showSuccessAlert } from '@utils/alert';
import { CartItem, StoreContext } from '@utils/store';
import {
  ArrowLeftIcon,
  ArrowNarrowLeftIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import Router from 'next/router';
import { useContext } from 'react';
import { TertiaryButton } from '@common/components/elements/button';
import { formatMoney } from '@utils/formatter';
import Image from 'next/image';
import CounterInput from '@common/components/elements/form/CounterInput';

type SummaryField = {
  field: string;
  value: any;
};

const SummaryInfoField = ({ field, value }: SummaryField) => {
  return (
    <div className="flex items-center justify-between pt-5">
      <P className="text-gray-800">{field}</P>
      <P className="text-gray-800">{value}</P>
    </div>
  );
};

const Cart = () => {
  const { state, dispatch }: any = useContext(StoreContext);
  const { cart } = state;
  const { cartItems } = cart;

  const totalPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.price * c.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0
  );

  const handleCheckout = () => {
    showSuccessAlert('Checkout Successful', 'Thank you for shopping with us');
    dispatch({ type: 'CLEAR_CART' });
    Router.push('/');
  };

  const addToCart = (product: CartItem) => {
    const existItem = state.cart.cartItems.find(
      (item: CartItem) => item.id === product.id
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > product.stock) {
      showInfoAlert(
        'Sorry, this product is out of stock!',
        'Please try again later!'
      );
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeFromCart = (product: CartItem) => {
    const existItem = state.cart.cartItems.find(
      (item: CartItem) => item.id === product.id
    );

    const quantity = existItem ? existItem.quantity - 1 : 0;
    if (quantity === 0) {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: product.id });
      return;
    } else {
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    }
  };

  return (
    <>
      {cart.cartItems.length > 0 ? (
        <div className="flex md:flex-row flex-col justify-between">
          <div className="lg:w-1/2 md:w-8/12 w-full md:pl-10 pl-4 pr-10 md:pr-4 bg-white overflow-y-auto overflow-x-hidden h-screen">
            <LinkedItem
              className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
              href="/"
            >
              <ArrowNarrowLeftIcon className="w-5 h-5 mr-1" />
              <P>Continue to Shopping</P>
            </LinkedItem>
            {cart.cartItems.map((item: CartItem) => (
              <div className="md:flex items-center mt-4 py-8 border-b border-gray-200">
                <div className="h-full w-1/4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                    width={600}
                    height={600}
                  />
                </div>
                <div className="md:pl-3 md:w-3/4">
                  <H4 className=" text-gray-800">
                    {item.name}
                  </H4>
                  <P className="flex flex-row items-center mt-2">
                    {item.stock > 0 ? (
                      <CheckCircleIcon className="text-green-500 h-4 w-4 mr-1 mt-1" />
                    ) : (
                      <XCircleIcon className="text-red-500 h-4 w-4 mr-1 mt-1" />
                    )}
                    In Stock
                  </P>
                  <p className=" w-96 text-xs leading-3 text-gray-800 py-4">
                    Eligible for FREE Shipping
                  </p>
                  <div className="flex items-center justify-between pt-5 pr-6">
                    <div className="flex items-center">
                      <CounterInput
                        count={item.quantity}
                        onIncrement={() => addToCart(item)}
                        onDecrement={() => removeFromCart(item)}
                      />
                      <P
                        className="underline text-red-500 pl-5 cursor-pointer"
                        onClick={() =>
                          dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
                        }
                      >
                        Remove
                      </P>
                    </div>
                    <H4 className="text-gray-800">{formatMoney(item.price)}</H4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 h-full">
            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
              <div>
                <H1 className=" text-gray-800">Summary</H1>
                <div className="pt-10">
                  <SummaryInfoField
                    field={`Subtotal (${totalItems} items)`}
                    value={formatMoney(totalPrice)}
                  />
                  <SummaryInfoField field="Shipping" value={formatMoney(0)} />
                  <SummaryInfoField field="Tax" value={formatMoney(50)} />
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between pt-20">
                  <H3 className="text-gray-800">Total</H3>
                  <H3 className="text-gray-800">
                    {formatMoney(totalPrice + 50)}
                  </H3>
                </div>
                <TertiaryButton
                  onClick={() =>
                    showSuccessAlert('Checkout', 'Come back soon!')
                  }
                  className="text-base leading-none w-full py-5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-800"
                >
                  Checkout
                </TertiaryButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ShoppingCartIcon className="w-60 h-60 text-gray-800" />
          <H3 className="text-gray-800 pt-10">Your cart is empty</H3>
          <P className="text-gray-600 pt-5">
            Looks like you haven't added anything to your cart yet.
          </P>
          <TertiaryButton
            onClick={() => Router.push('/')}
            className="text-base leading-none w-64 py-5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-800 mt-10"
          >
            Continue Shopping
          </TertiaryButton>
        </div>
      )}
    </>
  );
};

export default asPortalPage('Cart')(Cart);
