
import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface EntityPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const EntityPagination: React.FC<EntityPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages = 3, // Default to 3 pages for now
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(Math.max(currentPage - 1, 1));
            }} 
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink 
              href="#" 
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(Math.min(currentPage + 1, totalPages));
            }} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
