import { Product } from '@common/types/product';
import asPortalPage from '@hoc/asPortalPage';
import ProductItem from '@modules/products/components/ProductItem';
import { endpoint } from '@utils/constants/endpoints';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const ProductByCategory: NextPage = () => {
  const router = useRouter();
  const { name, search } = router.query;
  const id = router.query.search ? `${router.query.search}` : undefined;

  const { data, refetch } = useQuery(`${name}`, () =>
    fetch(
      process.env.SERVER_BASE_URL + endpoint.product.productByCategoryId(id!)
    ).then((res) => res.json())
  );

  const products = data?._embedded?.products;
  console.log(products);

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
