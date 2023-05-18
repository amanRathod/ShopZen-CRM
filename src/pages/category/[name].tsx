import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '@appTypes/product';
import asPortalPage from '@hoc/asPortalPage';
import { useQuery } from '@lib/react-query';
import { PAGE_SIZES } from '@utils/constants';
import GridContainer from '@elements/GridContainer';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@elements/loader/InlineLoader';
import ProductItem from '@modules/products/components/ProductItem';
import Pagination, { OnPageChangeCallback } from '@components/pagination';
import { CameraIcon } from '@heroicons/react/outline';
import { H4 } from '@elements/Text';
import { TertiaryButton } from '@elements/button';

const ProductByCategory: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const router = useRouter();
  const { name } = router.query;
  const id = router.query?.search ? `${router.query.search}` : undefined;

  const { isLoading, error, data, refetch } = useQuery(
    endpoint.product.getProductByCategoryPagination(id!, currentPage, pageSize),
    `${name} + ${currentPage}`,
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
      {products?.length !== 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <CameraIcon className="w-80 h-80 text-gray-800" />
          <H4>
            Looks like there are no products in this category yet! Check back
            later.
          </H4>
          <TertiaryButton
            onClick={() => router.push('/')}
            className="w-64 py-5 border mt-10"
          >
            View All Products
          </TertiaryButton>
        </div>
      )}
    </>
  );
};

export default asPortalPage('Categories')(ProductByCategory);
