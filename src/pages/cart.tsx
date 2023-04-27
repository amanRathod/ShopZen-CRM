import LinkedItem from '@elements/LinkedItem';
import { P } from '@elements/Text';
import asPortalPage from '@hoc/asPortalPage';
import { Product } from '@appTypes/product';
import { showSuccessAlert } from '@utils/alert';
import { StoreContext } from '@utils/store';
import {
  ArrowLeftIcon,
  ArrowNarrowLeftIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import Router from 'next/router';
import { useContext } from 'react';

const Cart = () => {
  const { state, dispatch }:any = useContext(StoreContext);
  const { cart } = state;

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
            {cart.cartItems.map((item: Product) => (
              <div className="md:flex items-center mt-4 py-8 border-b border-gray-200">
                <div className="h-full w-1/4">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="md:pl-3 md:w-3/4">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    {item.sku}
                  </p>
                  <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800">
                      {item.name}
                    </p>
                    <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                    </select>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">
                    Height: 10 inches
                  </p>
                  <p className="text-xs leading-3 text-gray-600 py-4">
                    Color: Black
                  </p>
                  <p className="w-96 text-xs leading-3 text-gray-600">
                    Composition: 100% calf leather
                  </p>
                  <div className="flex items-center justify-between pt-5 pr-6">
                    <div className="flex itemms-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <P className="underline text-red-500 pl-5 cursor-pointer">
                        Remove
                      </P>
                    </div>
                    <P className="leading-none text-gray-800">
                      ${item.price}
                    </P>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 h-full">
            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
              <div>
                <p className="text-4xl font-black leading-9 text-gray-800">
                  Summary
                </p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base leading-none text-gray-800">$9,000</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">
                    Shipping
                  </p>
                  <p className="text-base leading-none text-gray-800">$30</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">Tax</p>
                  <p className="text-base leading-none text-gray-800">$35</p>
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                  <p className="text-2xl leading-normal text-gray-800">Total</p>
                  <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                    $10,240
                  </p>
                </div>
                <button
                  onClick={() =>
                    showSuccessAlert('Checkout', 'Come back soon!')
                  }
                  className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ShoppingCartIcon className="w-60 h-60 text-gray-800" />
          <p className="text-2xl font-bold leading-7 text-gray-800 pt-10">
            Your cart is empty
          </p>
          <p className="text-base leading-6 text-gray-600 pt-5">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => Router.push('/')}
            className="text-base leading-none w-64 py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white mt-10"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default asPortalPage('Cart')(Cart);
