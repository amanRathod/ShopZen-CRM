import { PAGE_SIZES } from '@utils/constants';
import clsx from 'clsx';
import Paginate, { ReactPaginateProps } from 'react-paginate';

export type OnPageChangeCallback = ReactPaginateProps['onPageChange'];

type Props = {
  className?: string;
  currentPage: number;
  pageCount: number;
  pageSize: number;
  handlePageChange: OnPageChangeCallback;
  handlePageSizeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination: React.FC<Props> = ({
  className,
  currentPage,
  pageCount,
  pageSize,
  handlePageChange,
  handlePageSizeChange,
}) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center space-x-4 mt-6',
        className
      )}
    >
      <Paginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={
          'flex flex-wrap items-center justify-center space-x-1  sm:space-x-4 text-gray-500'
        }
        pageClassName={
          'inline-block mx-2 rounded-full px-3 py-2 hover:bg-gray-200 border border-gray-300 shadow-md shadow-primary-300/30'
        }
        pageLinkClassName={
          'block w-full h-full outline-none focus:outline-none'
        }
        previousClassName={
          'inline-block mx-2 rounded-lg px-3 py-2 hover:bg-gray-200'
        }
        nextClassName={
          'inline-block mx-2 rounded-lg px-3 py-2 hover:bg-gray-200'
        }
        previousLinkClassName={
          'block w-full h-full outline-none focus:outline-none'
        }
        nextLinkClassName={
          'block w-full h-full outline-none focus:outline-none'
        }
        activeClassName={'bg-blue-600 text-white border'}
        breakClassName={'text-gray-500 inline-block mx-2'}
        disabledClassName={'text-gray-400 inline-block mx-2'}
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
      />
      <select
        className="py-2 px-4 pr-4 block border-gray-200 rounded-md text-sm"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        {PAGE_SIZES.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
