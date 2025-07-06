import Arrow from "../assets/images/Arrow.webp";
import PaginationButton from "./PaginationButton";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({currentPage, totalPages, onPageChange}: Props) => {
  return (
    <div className='flex justify-center items-center space-x-4 my-8'>
      {/* Previous button */}
      <PaginationButton
        targetPage={currentPage - 1}
        currentPage={currentPage}
        disableIfTargetEqualsCurrent
        onPageChange={onPageChange}
      >
        <img src={Arrow} alt='Previous' width={7} className='rotate-180' />
      </PaginationButton>
      {/* Left Arrow */}

      {/* First Page, always visible */}
      <PaginationButton targetPage={1} currentPage={currentPage} onPageChange={onPageChange}>
        {1}
      </PaginationButton>
      {/* Pages 2,3 visible only when current page is under 4 */}
      {currentPage < 4 &&
        [2, 3].map((page) => (
          <PaginationButton key={page} targetPage={page} currentPage={currentPage} onPageChange={onPageChange}>
            {page}
          </PaginationButton>
        ))}
      {/* Current Page indicator shown on most of the pages */}
      {currentPage >= 4 && currentPage < totalPages - 3 && (
        <>
          <span>...</span>
          <PaginationButton targetPage={currentPage} currentPage={currentPage} onPageChange={onPageChange}>
            {currentPage}
          </PaginationButton>
          <span>...</span>
        </>
      )}
      {/* Last 3 pages shown similar as first 3 */}
      {currentPage > totalPages - 3 &&
        [totalPages - 2, totalPages - 1].map((page) => (
          <PaginationButton key={page} targetPage={page} currentPage={currentPage} onPageChange={onPageChange}>
            {page}
          </PaginationButton>
        ))}
      {/* Total pages always visible */}
      <PaginationButton targetPage={totalPages} currentPage={currentPage} onPageChange={onPageChange}>
        {totalPages}
      </PaginationButton>

      {/* Next button */}
      <PaginationButton
        targetPage={currentPage + 1}
        currentPage={currentPage}
        disableIfTargetEqualsCurrent
        onPageChange={onPageChange}
      >
        <img src={Arrow} alt='Next' width={7} />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
