import Card from '@elements/Card';
import { Product } from '@appTypes/product';
import Image from 'next/image';
import { H5 } from '@elements/Text';
import { PrimaryButton } from '@elements/button';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import LinkedItem from '@elements/LinkedItem';
import { formatMoney } from '@utils/formatter';
import { useContext } from 'react';
import { CartState, StoreContext } from '@utils/store';
import { showInfoAlert } from '@utils/alert';
import { GlobalState } from '@utils/constants';
import { showSuccessToast } from '@utils/toast';

type Props = {} & Product;

const ProductItem: React.FC<Props> = ({
  id,
  image,
  name,
  price,
  description,
  stock,
}) => {
  const { state, dispatch } = useContext<CartState>(StoreContext);

  const addToCart = () => {
    const existItem = state.cart.orderItems.find(
      (item: Product) => item.id === id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (quantity > stock) {
      showInfoAlert(
        'Sorry, this product is out of stock!',
        'Please try again later!'
      );
      return;
    }

    dispatch({
      type: GlobalState.CART_ADD_ITEM,
      payload: { id, name, description, price, image, stock, quantity, productId: id },
    });

    showSuccessToast("Product added to cart!")
  };

  return (
    <Card className="w-72 bg-white duration-500 hover:scale-105 hover:shadow-xl">
      <LinkedItem href={`/product/${id}`}>
        <Image
          src={image}
          alt={name}
          className='rounded-t-lg bg-gray-100 cursor-pointer'
          width={500}
          height={500}
        />
      </LinkedItem>

      <div className="px-4 py-3 w-72">
        <LinkedItem href={`/product/${id}`}>
          <H5 className="tracking-tight text-gray-900 cursor-pointer">
            {name}
          </H5>
        </LinkedItem>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-2xl font-semibold text-gray-900">
            {formatMoney(price)}
          </span>
          <PrimaryButton Icon={ShoppingCartIcon} onClick={addToCart} />
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
