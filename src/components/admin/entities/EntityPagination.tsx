import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface EntityPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const EntityPagination: React.FC<EntityPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const isMobile = useBreakpoint('md');
  
  // Don't show pagination if there's only one page or no pages
  if (totalPages <= 1) return null;
  
  // Ensure currentPage is within bounds
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  // For mobile, show fewer page numbers
  const maxVisiblePages = isMobile ? 3 : 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  let startPage = Math.max(1, safePage - halfVisible);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent className="flex-wrap">
          {safePage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(safePage - 1);
                }}
                className="text-xs sm:text-sm"
              />
            </PaginationItem>
          )}
          
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                  className="text-xs sm:text-sm"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <span className="px-2 text-gray-600">...</span>
                </PaginationItem>
              )}
            </>
          )}
          
          {pageNumbers.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink 
                href="#" 
                isActive={safePage === pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum);
                }}
                className="text-xs sm:text-sm"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <span className="px-2 text-gray-600">...</span>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(totalPages);
                  }}
                  className="text-xs sm:text-sm"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          {safePage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(safePage + 1);
                }}
                className="text-xs sm:text-sm"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
