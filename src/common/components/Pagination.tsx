import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import { Component } from 'react';
import { ButtonProps, OutlineButton } from './elements/button';
import { DOTS, usePagination } from '@lib/pagination';

const PaginationButton = (props: ButtonProps) => {
  return <OutlineButton className="!p-1 disabled:opacity-40" {...props} />;
};

type Props = {
  className?: string;
  currentPage: number;
  totalPageCount: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  className,
  currentPage,
  totalPageCount,
  pageSize,
  siblingCount = 1,
  onPageChange,
}) => {
  const paginationRange: any = usePagination({
    totalPageCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="flex justify-center items-center space-x-2 mt-6">
      <li>
        <PaginationButton
          onClick={onPrevious}
          disabled={false}
          Icon={ChevronDoubleLeftIcon}
        />
      </li>
        {paginationRange?.map((pageNumber:any) => {
          if (pageNumber === DOTS) {
            return <li className="px-3 py-2 leading-tight">{DOTS}</li>;
          }

          return (
            <li>
              <a
                onClick={() => onPageChange(pageNumber)}
                className={`z-10 px-3 py-2 leading-tight border border-blue-300 cursor-pointer ${
                  pageNumber === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500'
                }`}
              >
                {pageNumber}
              </a>
            </li>
          );
          // if (pageNumber === currentPage) {
          //   return (
          //     <a
          //       aria-current="page"
          //       key={index}
          //       className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
          //     >
          //       {pageNumber}
          //     </a>
          //   );
          // } else {
          //   return (
          //     <a
          //       href="#"
          //       key={index}
          //       className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          //     >
          //       {pageNumber}
          //     </a>
          //   );
          // }
        })}
        {/* <a
          href="#"
          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
        >
          1
        </a> */}
      <li>
        <PaginationButton
          onClick={onNext}
          disabled={false}
          Icon={ChevronDoubleRightIcon}
        />
      </li>
    </ul>
  );
};

export default Pagination;
