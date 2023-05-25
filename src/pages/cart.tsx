import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import LinkedItem from '@elements/LinkedItem';
import { H1, H3, H4, P } from '@elements/Text';
import asPortalPage from '@hoc/asPortalPage';
import { showInfoAlert } from '@utils/alert';
import { OrderItem, CartState, StoreContext } from '@utils/store';
import {
  ArrowNarrowLeftIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { TertiaryButton } from '@common/components/elements/button';
import { formatMoney } from '@utils/formatter';
import CounterInput from '@common/components/elements/form/CounterInput';
import { useAuth } from '@lib/auth';
import { GlobalState, PaymentMethod } from '@utils/constants';
import { PriceInfoField } from '@common/components/elements/List';
import Tag from '@common/components/elements/Tag';

const Cart = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { state, dispatch } = useContext<CartState>(StoreContext);
  const { cart } = state;
  const { orderItems } = cart;

  const totalPrice = orderItems.reduce(
    (a: number, c: OrderItem) => a + c.price * c.quantity,
    0
  );
  const totalQuantity = orderItems.reduce(
    (a: number, c: OrderItem) => a + c.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      showInfoAlert(
        'Please login to continue!',
        'You will be redirected to login page'
      );
      router.push('/login');
      return;
    }

    dispatch({
      type: GlobalState.SAVE_ORDER,
      payload: {
        totalPrice: totalPrice,
        totalQuantity,
        paymentMethod: PaymentMethod.COD,
      },
    });

    router.push('/checkout');
  };

  const addToCart = (product: OrderItem) => {
    const existItem = state.cart.orderItems.find(
      (item: OrderItem) => item.id === product.id
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > product.stock) {
      showInfoAlert(
        'Sorry, this product is out of stock!',
        'Please try again later!'
      );
      return;
    }

    dispatch({
      type: GlobalState.CART_ADD_ITEM,
      payload: { ...product, quantity, productId: product.id },
    });
  };

  const removeFromCart = (product: OrderItem) => {
    const existItem = state.cart.orderItems.find(
      (item: OrderItem) => item.id === product.id
    );

    const quantity = existItem ? existItem.quantity - 1 : 0;
    if (quantity === 0) {
      dispatch({ type: GlobalState.CART_REMOVE_ITEM, payload: product.id });
      return;
    } else {
      dispatch({
        type: GlobalState.CART_ADD_ITEM,
        payload: { ...product, quantity, productId: product.id },
      });
    }
  };

  return (
    <>
      {cart.orderItems.length > 0 ? (
        <div className="flex sm:flex-row flex-col justify-between">
          <div className="lg:w-1/2 md:w-8/12 w-full bg-white overflow-y-auto overflow-x-hidden sm:h-screen">
            <LinkedItem
              className="flex items-center text-gray-500 hover:text-primary-600 cursor-pointer"
              href="/"
            >
              <ArrowNarrowLeftIcon className="w-5 h-5 mr-1" />
              <P>Continue to Shopping</P>
            </LinkedItem>
            {cart.orderItems.map((item: OrderItem) => (
              <div className="md:flex items-center mt-4 py-8 border-b border-gray-200">
                <LinkedItem
                  href={`/product/${item.id}`}
                  className="h-full w-1/4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                    width={600}
                    height={600}
                  />
                </LinkedItem>
                <div className="md:pl-3 md:w-3/4">
                  <LinkedItem href={`/product/${item.id}`}>
                    <H4 className=" text-gray-800">{item.name}</H4>
                  </LinkedItem>
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
                          dispatch({
                            type: GlobalState.CART_REMOVE_ITEM,
                            payload: item,
                          })
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

          <div className="lg:w-96 md:w-4/12 w-full bg-gray-100 h-full">
            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
              <div>
                <H1 className=" text-gray-800">Summary</H1>
                <div className="pt-10 space-y-4">
                  <PriceInfoField
                    field={`Subtotal (${totalQuantity} items)`}
                    value={formatMoney(totalPrice)}
                  />
                  <PriceInfoField field="Shipping" value={formatMoney(0)}>
                    <Tag className="rounded-none">FREE</Tag>
                  </PriceInfoField>
                  <PriceInfoField field="Tax" value={formatMoney(0)} />
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between pt-20">
                  <H3 className="text-gray-800">Total</H3>
                  <H3 className="text-gray-800">{formatMoney(totalPrice)}</H3>
                </div>
                <TertiaryButton
                  onClick={handleCheckout}
                  className="w-full py-3 border"
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
          <H4 className="text-gray-600 pt-5">
            Looks like you haven't added anything to your cart yet.
          </H4>
          <TertiaryButton
            onClick={() => Router.push('/')}
            className="w-64 py-5 border mt-10"
          >
            Continue Shopping
          </TertiaryButton>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(asPortalPage('Cart')(Cart)), {
  ssr: false,
});
