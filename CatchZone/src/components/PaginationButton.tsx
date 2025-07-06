type PaginationButtonProps = {
  targetPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
  disableIfTargetEqualsCurrent?: boolean;
  totalPages?: number;
};

function PaginationButton({
  targetPage,
  currentPage,
  onPageChange,
  children,
  disableIfTargetEqualsCurrent,
  totalPages,
}: PaginationButtonProps) {
  const isDisabled =
    (disableIfTargetEqualsCurrent && targetPage === currentPage) ||
    targetPage < 1 ||
    (totalPages !== undefined && targetPage > totalPages);
  return (
    <button
      onClick={() => {
        onPageChange(targetPage);
      }}
      disabled={isDisabled}
      className={`group px-4 py-2  disabled:opacity-30 flex items-center space-x-2 cursor-pointer 
      ${!isDisabled && "hover:text-[var(--color-primary)]"} 
      }  p-1 rounded-full border-[var(--color-primary)] duration-200 ${
        currentPage === targetPage && "border-2 text-[var(--color-primary)] font-bold "
      }`}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
