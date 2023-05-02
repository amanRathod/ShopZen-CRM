import asPortalPage from '@hoc/asPortalPage';
import { NextPage } from 'next';
import data from '@utils/data';
import ProductItem from '@modules/products/components/ProductItem';
import { Product } from '@appTypes/product';
import { useEffect, useState } from 'react';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@common/components/elements/loader/InlineLoader';
import Pagination, { OnPageChangeCallback } from '@components/pagination';
import { PAGE_SIZES } from '@utils/constants';
import { useQuery } from '@lib/react-query';

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
  }, [currentPage, refetch, pageSize]);

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-6 sm:gap-y-10 lg:gap-y-12 lg:mt-12 mt-10">
        {products?.map((product: Product) => (
          <ProductItem
            key={product.id}
            {...product}
            // onSelect={handleOnSelectToggle}
          />
        ))}
      </div>
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
