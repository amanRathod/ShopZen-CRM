import asPortalPage from '@hoc/asPortalPage';
import { NextPage } from 'next';
import data from '@utils/data';
import ProductItem from '@modules/products/components/ProductItem';
import { Product } from '@appTypes/product';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { endpoint } from '@utils/constants/endpoints';
import Pagination from '@common/components/Pagination';

const PAGE_SIZES = [10, 20, 30, 40, 50];

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const { isLoading, error, data, refetch } = useQuery(['products', currentPage], () =>
    fetch(
      process.env.SERVER_BASE_URL + endpoint.product.productPagination(currentPage, pageSize)
    ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  // if (isLoading) {
    // return <div>Loading...</div>;
  // }

  const products = data?._embedded.products;
  const totalItems = data?.page.totalElements;
  const totalPages = data?.page.totalPages;

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
        className=""
        currentPage={currentPage}
        totalPageCount={totalPages}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
};

export default asPortalPage('Home Page')(Home);
