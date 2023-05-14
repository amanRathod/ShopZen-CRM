import LinkedItem from '@common/components/elements/LinkedItem';
import { H4, P } from '@common/components/elements/Text';
import { Product } from '@common/types/product';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { formatMoney } from '@utils/formatter';
import Image from 'next/image';

type Props = {
  quantity: number;
  totalPrice: number;
} & Product;

const ProductList: React.FC<Props> = ({
  id,
  image,
  name,
  description,
  totalPrice,
  quantity,
}) => {
  return (
    <div className="flex items-center py-2 border-b p-6">
      <div className="h-full w-1/4">
        <Image
          src={image}
          alt={name}
          className="rounded-t-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110"
          width={250}
          height={250}
        />
      </div>
      <div className="md:pl-3 w-3/4 flex-col">
        <div className="flex justify-between py-4">
          <H4 className=" text-gray-800">{name}</H4>
          <H4 className="text-gray-800">{formatMoney(totalPrice)}</H4>
        </div>

        <P className="hidden md:block text-gray-600">{description}</P>

        <div className="flex items-center py-4">
          <P className="font-bold">
            Quantity: <span className="text-gray-600">{quantity}</span>
          </P>
          <div className="border-l-2 border-gray-200 h-8 ml-2"></div>
          <LinkedItem
            href={`/product/${id}`}
            className="ml-2 text-tertiary-600  hover:text-tertiary-800  hover:underline"
          >
            View Product
          </LinkedItem>
        </div>

        <div className="flex py-4">
          <CheckCircleIcon className="text-green-500 h-4 w-4 mr-1 mt-1" />
          <P>Delivered</P>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
