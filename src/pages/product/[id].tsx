import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ErrorBox from '@elements/ErrorBox';
import asPortalPage from '@hoc/asPortalPage';
import data from '@utils/data';
import { PrimaryButton, TertiaryButton } from '@elements/button';
import { useContext, useState } from 'react';
import {
  CheckCircleIcon,
  CheckIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { H2, H3, P } from '@elements/Text';
import { StoreContext } from '@utils/store';
import { Product } from '@appTypes/product';
import { showInfoAlert, showWarningAlert } from '@utils/alert';
import Divider from '@elements/Divider';
import { endpoint } from '@utils/constants/endpoints';
import { useQuery } from '@lib/react-query';
import InlineLoader from '@elements/loader/InlineLoader';
import { formatMoney } from '@utils/formatter';
import CounterInput from '@common/components/elements/form/CounterInput';

const Product: NextPage = () => {
  const { state, dispatch }: any = useContext(StoreContext);
  const [count, setCount] = useState(1);

  const router = useRouter();

  const id = router.query.id ? `${router.query.id}` : undefined;
  // if (!id) router.replace('/');

  const {
    data,
    isLoading,
    refetch: refetchProduct,
  } = useQuery<{ product: Product }>(
    endpoint.product.get(id!),
    id,
    {},
    false,
    false
  );

  if (isLoading) return <InlineLoader />;

  const { product } = data;

  if (!product) {
    return (
      <ErrorBox
        title="Product not found"
        text="The product you are looking for does not exist!"
        redirectButton={{
          text: 'View All Products',
          href: '/',
        }}
      />
    );
  }

  const onIncrement = () => {
    setCount(count + 1);
  };

  const onDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCount(value);
  };

  const addToCart = () => {
    const existItem = state.cart.cartItems.find(
      (item: Product) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + count : count;

    if (quantity > product.stock) {
      showInfoAlert(
        'Sorry, this product is out of stock!',
        'Please try again later!'
      );
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeFromCart = () => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: product.id });
  };

  const { name, description, price, image, stock } = product;

  return (
    <div className="mx-auto py-9 px-4 md:py-5 md:px-2">
      <div className="flex justify-center items-center md:flex-row flex-col gap-8">
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <Image
            className="rounded md:rounded-l-lg"
            src={image}
            alt={name}
            width={640}
            height={640}
          />
        </div>
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <H2 className="lg:text-4xl text-gray-800">{name}</H2>

          <div className=" flex flex-row justify-between  mt-5">
            <div className=" flex flex-row space-x-1">
              <StarIcon className="fill-yellow-400 h-6 w-8" />
              <StarIcon className="fill-yellow-400 h-6 w-8" />
              <StarIcon className="fill-yellow-400 h-6 w-8" />
              <StarIcon className="fill-yellow-400 h-6 w-8" />
              <StarIcon className="h-6 w-8" />
            </div>
            <P className=" focus:ring-2 focus:ring-primary-800 text-primary-800 hover:underline hover:text-primary-900 duration-100 cursor-pointer">
              22 reviews
            </P>
          </div>

          <P className=" text-gray-600 mt-7">{description}</P>
          <H3 className=" lg:text-2xl leading-5 mt-6">{formatMoney(price)}</H3>
          <P className="flex flex-row items-center mt-2">
            {stock > 0 ? (
              <CheckCircleIcon className="text-green-500 h-4 w-4 mr-1 mt-1" />
            ) : (
              <XCircleIcon className="text-red-500 h-4 w-4 mr-1 mt-1" />
            )}
            In Stock
          </P>

          <div className="lg:mt-11 mt-10">
            <div className="flex flex-row justify-between">
              <P className="leading-4 text-gray-600">Select quantity</P>
              <CounterInput
                count={count}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            </div>

            <Divider className="mt-4" />

            <div className=" flex flex-row justify-between items-center mt-4">
              <P className="text-gray-600">Item left in stock</P>
              <P className="text-gray-600">{stock}</P>
            </div>

            <Divider className="mt-4" />

            <TertiaryButton
              className={
                `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-800 font-medium text-base leading-4 w-full py-5 lg:mt-12 mt-6` +
                (stock > 0 ? '' : ' cursor-not-allowed')
              }
              onClick={addToCart}
            >
              Add To Cart
            </TertiaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default asPortalPage('Product')(Product);
