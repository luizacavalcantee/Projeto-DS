'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface ChallengePaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function ChallengePagination({
  currentPage,
  totalPages,
  setCurrentPage
}: ChallengePaginationProps) {
  if (totalPages <= 1) return null;

  const classNames = (...classes: (string | boolean)[]) =>
    classes.filter(Boolean).join(' ');

  return (
    <div className="mt-16 justify-center flex">
      <Pagination>
        <PaginationContent className="gap-2 flex-wrap">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="hover:bg-gray-100 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                className={classNames(
                  'w-9 h-9 flex items-center justify-center rounded-full text-sm',
                  currentPage === index + 1
                    ? 'bg-blue-100 text-blue-600 font-bold'
                    : 'text-gray-600 hover:bg-gray-100' 
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              className="hover:bg-gray-100 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
