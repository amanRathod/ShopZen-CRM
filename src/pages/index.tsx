import asPortalPage from '@hoc/asPortalPage';
import { NextPage } from 'next';
import ProductItem from '@modules/products/components/ProductItem';
import { Product } from '@appTypes/product';
import { useEffect, useState } from 'react';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@common/components/elements/loader/InlineLoader';
import Pagination, { OnPageChangeCallback } from '@components/pagination';
import { PAGE_SIZES } from '@utils/constants';
import { useQuery } from '@lib/react-query';
import GridContainer from '@common/components/elements/GridContainer';

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const { isLoading, error, data, refetch } = useQuery(
    endpoint.product.getProductPagination(currentPage, pageSize),
    ['products', `${currentPage}`],
    {},
    false,
    true
  );

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize]);

  if (isLoading) {
    return <InlineLoader />;
  }

  const products = data?._embedded.products;
  const totalItems = data?.page.totalElements;
  const pageCount = Math.ceil(totalItems / pageSize);

  const handlePageChange: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected;
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
  };

  return (
    <>
      <GridContainer>
        {products?.map((product: Product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </GridContainer>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default asPortalPage('Home Page')(Home);
