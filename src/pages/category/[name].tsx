import InlineLoader from '@common/components/elements/loader/InlineLoader';
import { Product } from '@common/types/product';
import asPortalPage from '@hoc/asPortalPage';
import { useQuery } from '@lib/react-query';
import ProductItem from '@modules/products/components/ProductItem';
import { endpoint } from '@utils/constants/endpoints';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ProductByCategory: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const id = router.query?.search ? `${router.query.search}` : undefined;

  const { isLoading, error, data } = useQuery(
    endpoint.product.productByCategoryId(id!),
    `${name}`,
    {}, 
    false,
    true
  );

  if (isLoading) {
    return <InlineLoader />;
  }

  const products = data?._embedded?.products;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product: Product) => (
        <ProductItem
          key={product.id}
          {...product}
          // onSelect={handleOnSelectToggle}
        />
      ))}
    </div>
  );
};

export default asPortalPage('Categories')(ProductByCategory);
