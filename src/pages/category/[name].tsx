import GridContainer from '@common/components/elements/GridContainer';
import InlineLoader from '@common/components/elements/loader/InlineLoader';
import Pagination, {
  OnPageChangeCallback,
} from '@common/components/pagination';
import { Product } from '@common/types/product';
import asPortalPage from '@hoc/asPortalPage';
import { useQuery } from '@lib/react-query';
import ProductItem from '@modules/products/components/ProductItem';
import { PAGE_SIZES } from '@utils/constants';
import { endpoint } from '@utils/constants/endpoints';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

export default asPortalPage('Categories')(ProductByCategory);
