import PaginationButton from "./PaginationButton";
import {SvgArrow} from "./SvgArrow";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({currentPage, totalPages, onPageChange}: Props) => {
  // Nie pokazuj w ogóle paginacji, jeśli tylko jedna strona
  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center space-x-4 my-8'>
      {/* Previous button */}
      <PaginationButton
        targetPage={currentPage - 1}
        currentPage={currentPage}
        disableIfTargetEqualsCurrent
        onPageChange={onPageChange}
      >
        <div className='rotate-180'>
          <SvgArrow />
        </div>
      </PaginationButton>

      {/* First Page */}
      <PaginationButton targetPage={1} currentPage={currentPage} onPageChange={onPageChange}>
        {1}
      </PaginationButton>

      {/* Środkowe strony — zależne od liczby stron */}
      {totalPages > 4 &&
        currentPage < 4 &&
        [2, 3].map(
          (page) =>
            page < totalPages && (
              <PaginationButton key={page} targetPage={page} currentPage={currentPage} onPageChange={onPageChange}>
                {page}
              </PaginationButton>
            )
        )}

      {totalPages > 6 && currentPage >= 4 && currentPage < totalPages - 2 && (
        <>
          <span>...</span>
          <PaginationButton targetPage={currentPage} currentPage={currentPage} onPageChange={onPageChange}>
            {currentPage}
          </PaginationButton>
          <span>...</span>
        </>
      )}

      {totalPages > 4 &&
        currentPage > totalPages - 3 &&
        [totalPages - 2, totalPages - 1].map(
          (page) =>
            page > 1 && (
              <PaginationButton key={page} targetPage={page} currentPage={currentPage} onPageChange={onPageChange}>
                {page}
              </PaginationButton>
            )
        )}

      {/* Last Page */}
      {totalPages > 1 && (
        <PaginationButton targetPage={totalPages} currentPage={currentPage} onPageChange={onPageChange}>
          {totalPages}
        </PaginationButton>
      )}

      {/* Next button */}
      <PaginationButton
        targetPage={currentPage + 1}
        currentPage={currentPage}
        disableIfTargetEqualsCurrent
        onPageChange={onPageChange}
        totalPages={totalPages}
      >
        <SvgArrow />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
