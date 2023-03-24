import { memo } from "react"
import ReactPaginate from "react-paginate"

interface IPaginationProps {
  pageCount: number
  currentPage: number
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  onPageChange: (arg0: Record<string, number>) => void
}

export const Pagination: React.FC<IPaginationProps> = memo(
  ({
    pageCount,
    currentPage,
    onPageChange,
    pageRangeDisplayed = 3,
    marginPagesDisplayed = 1,
  }) => {
    return (
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        forcePage={currentPage - 1}
        onPageChange={onPageChange}
        containerClassName="pagination"
        breakLinkClassName="page-num"
        activeLinkClassName="page-active"
        pageLinkClassName="page-num"
        nextLinkClassName="page-num"
        previousLinkClassName="page-num"
        previousLabel="&lt;"
        nextLabel="&gt;"
      />
    )
  }
)
