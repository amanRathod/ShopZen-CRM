import Card from '@elements/Card';
import { Product } from '@appTypes/product';
import Image from 'next/image';
import { H5 } from '@elements/Text';
import { PrimaryButton } from '@elements/button';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import LinkedItem from '@elements/LinkedItem';

type Props = {} & Product;

const ProductItem: React.FC<Props> = ({
  id,
  image,
  name,
  description,
  price,
}) => {
  return (
    <Card className="max-w-sm w-full p-0 sm:p-0 md:p-0 bg-white border border-gray-200 hover:bg-primary-300 overflow-hidden">
      <LinkedItem href={`/product/${id}`}>
        <Image
          src={image}
          alt={name}
          className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
          width={600}
          height={600}
        />
      </LinkedItem>

      <div className="p-5">
        <LinkedItem href={`/product/${id}`}>
          <H5 className="tracking-tight text-gray-900 cursor-pointer">
            {name}
          </H5>
        </LinkedItem>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <PrimaryButton
            Icon={ShoppingCartIcon}
            className="hover:bg-secondary-300"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
