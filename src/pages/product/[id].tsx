import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ErrorBox from '@elements/ErrorBox';
import asPortalPage from '@hoc/asPortalPage';
import data from '@/utils/data';
import { PrimaryButton } from '@/common/components/elements/button';
import { useContext, useState } from 'react';
import {
  CheckCircleIcon,
  CheckIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { P } from '@/common/components/elements/Text';
import { StoreContext } from '@/utils/store';
import { Product } from '@/common/types/product';
import { showWarningAlert } from '@/utils/alert';
import Divider from '@/common/components/elements/Divider';

const Product: NextPage = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [count, setCount] = useState(1);

  const router = useRouter();
  console.log('router checking', router);

  const id = router.query.id ? router.query.id : undefined;
  // if (!id) router.replace('/');

  // const { data, isLoading, refetch: refetchProduct } = useQuery<{ product: Product }>(
  //   endpoint.product.get(id!),
  //   '',
  //   {},
  //   false
  // );

  // if (isLoading) return <InlineLoader />;

  const product = data.products.find((product) => product.id === id);

  if (!product || !id) {
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

  const addCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    const existItem = state.cart.cartItems.find(
      (item: Product) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + count : count;

    if (quantity > product.stock) {
      showWarningAlert(
        'Sorry, this product is out of stock!',
        'Please try again later!'
      );
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };

  const removeFromCart = () => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: product.id });
  };

  const { name, description, unitPrice, image, stock } = product;

  return (
    <div className="mx-auto py-9 px-4 md:py-5 md:px-2">
      <div className="flex justify-center items-center md:flex-row flex-col gap-8">
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <Image
            className="rounded md:rounded-l-lg"
            src={image}
            alt={name}
            width={640}
            height={500}
          />
        </div>
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
            {name}
          </h2>

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

          <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using. Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </p>
          <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
            $ {unitPrice}
          </p>
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
              <p className=" font-medium text-base leading-4 text-gray-600">
                Select quantity
              </p>
              <div className="flex">
                <span
                  onClick={minusCount}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                >
                  -
                </span>
                <input
                  id="counter"
                  aria-label="input"
                  className="border border-gray-300 h-full text-center w-14 pb-1"
                  type="text"
                  value={count}
                  onChange={(e) => e.target.value}
                />
                <span
                  onClick={addCount}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                >
                  +
                </span>
              </div>
            </div>

            <Divider className="mt-4" />

            <div className=" flex flex-row justify-between items-center mt-4">
              <P className="text-gray-600">Item left in stock</P>
              <P className="text-gray-600">13</P>
            </div>

            <Divider className="mt-4" />

            <PrimaryButton
              className={
                `focus:outline-none focus:ring-2 hover:bg-black hover:shadow-gray-800/30 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-primary-800 w-full py-5 lg:mt-12 mt-6` +
                (stock > 0 ? '' : ' cursor-not-allowed')
              }
              onClick={addToCart}
            >
              Add To Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default asPortalPage('Product')(Product);
