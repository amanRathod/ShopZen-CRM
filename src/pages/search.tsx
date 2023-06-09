import { NextPage } from 'next';
import { useRouter } from 'next/router';
import InlineLoader from '@elements/loader/InlineLoader';
import { Product } from '@appTypes/product';
import { useQuery } from '@lib/react-query';
import ProductItem from '@modules/products/components/ProductItem';
import { endpoint } from '@utils/constants/endpoints';
import asPortalPage from '@common/hoc/asPortalPage';
import ErrorBox from '@common/components/elements/ErrorBox';
import GridContainer from '@common/components/elements/GridContainer';

const Search: NextPage = () => {
  const router = useRouter();

  const { query = 'all' } = router.query;

  const { isLoading, error, data, refetch } = useQuery(
    endpoint.product.getByProductName(query as string),
    ['products', `${query}`],
    {},
    false,
    true
  );

  if (isLoading) {
    return <InlineLoader />;
  }

  const products = data?._embedded?.products;

  if (!products.length) {
    <ErrorBox
      title="No products found"
      text="Please try again with a different search term."
      redirectButton={{
        text: 'View All Products',
        href: '/',
      }}
    />;
  }

  return (
    <GridContainer>
      {products?.map((product: Product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </GridContainer>
  );
};
export default asPortalPage('Products')(Search);
