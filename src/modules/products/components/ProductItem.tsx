import Card from '@elements/Card';
import { Product } from '@appTypes/product';
import Image from 'next/image';
import { H5 } from '@/common/components/elements/Text';
import { PrimaryButton } from '@/common/components/elements/button';
import { ShoppingCartIcon } from '@heroicons/react/outline';

type Props = {} & Product;

const ProductItem: React.FC<Props> = ({
  image,
  name,
  description,
  unitPrice,
}) => {
  return (
    <Card className="max-w-sm w-full p-0 sm:p-0 md:p-0 bg-white border border-gray-200 hover:bg-primary-300">
      <Image
        src={image}
        alt={name}
        className="rounded-t-lg transition duration-300 ease-in-out hover:scale-110"
        width={600}
        height={600}
      />
      <div className="p-5">
        <H5 className="tracking-tight text-gray-900">{description}</H5>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-3xl font-bold text-gray-900">${unitPrice}</span>
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
