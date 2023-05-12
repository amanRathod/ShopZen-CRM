import Divider from '@common/components/elements/Divider';
import { H4, H5, P } from '@common/components/elements/Text';
import asPortalPage from '@common/hoc/asPortalPage';
import { CartItem, StoreContext } from '@utils/store';
import { NextPage } from 'next';
import { useContext } from 'react';
import Image from 'next/image';
import { formatMoney } from '@utils/formatter';
import {
  PrimaryButton,
  TertiaryButton,
} from '@common/components/elements/button';
import { CheckCircleIcon } from '@heroicons/react/solid';
import LinkedItem from '@common/components/elements/LinkedItem';

const OrderHistory: NextPage = () => {
  const { state, dispatch }: any = useContext(StoreContext);
  const { cart } = state;

  return (
    <div className="flex">
      <div className="border-2 w-full bg-primary-100">
        <div className="flex md:flex-row flex-col justify-between p-6">
          <div className="md:flex items-center">
            <div className="flex md:flex-col justify-between md:pr-12 py-4 md:py-0">
              <H5>Order Number</H5>
              <P className="text-gray-600">#LHK2412343</P>
            </div>
            <Divider className="md:hidden" />

            <div className="flex md:flex-col justify-between  md:pr-12  py-4 md:py-0">
              <H5>Order Date</H5>
              <P className="text-gray-600">12/12/2021</P>
            </div>
            <Divider className="md:hidden" />

            <div className="flex md:flex-col justify-between  md:pr-12  py-4 md:py-0">
              <H5>Total Amount</H5>
              <P className="text-gray-600">RM 100.00</P>
            </div>
          </div>
          <div className="flex justify-around">
            <PrimaryButton className="w-full md:h-10">View Order</PrimaryButton>
            <PrimaryButton className="ml-4 w-full md:h-10">
              View Invoice
            </PrimaryButton>
          </div>
        </div>
        <Divider />
        {cart.cartItems.map((item: CartItem) => (
          <div className="flex items-center py-2 border-b border-gray-200 p-6">
            <div className="h-full w-1/4">
              <Image
                src={item.image}
                alt={item.name}
                className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                width={600}
                height={600}
              />
            </div>
            <div className="md:pl-3 w-3/4 flex-col">
              <div className="flex justify-between py-4">
                <H4 className=" text-gray-800">{item.name}</H4>
                <H4 className="text-gray-800">{formatMoney(item.price)}</H4>
              </div>

              <P className="hidden md:block text-gray-600">
                Description Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              </P>

              <div className="flex items-center py-4">
                <H5 className="font-bold">
                  Quantity:{' '}
                  <span className="text-gray-600">{item.quantity}</span>
                </H5>
                <div className="border-l-2 border-gray-200 h-8 ml-2"></div>
                <LinkedItem href="#" className="ml-4 text-tertiary-600">
                  View Product
                </LinkedItem>
              </div>

              <div className="flex py-4">
                <CheckCircleIcon className="text-green-500 h-4 w-4 mr-1 mt-1" />
                <P>Delivered</P>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default asPortalPage('Order History')(OrderHistory);
