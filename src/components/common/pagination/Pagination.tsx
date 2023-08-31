import styles from './pagination.module.css'
import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface PaginationProps {
  total: number
  limit: number
  page: number
  setPage: (index: number) => void
}

const Pagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const pagesNumber = Math.ceil(total / limit)
  const paginationLimit = 5
  const [currentPageGroup, setCurrentPageGroup] = useState(1)
  const pageGroupFirstNumber = (currentPageGroup - 1) * paginationLimit + 1
  const pageGroupLastNumber = currentPageGroup * paginationLimit

  const goToPrev = () => {
    if (pageGroupFirstNumber === page) {
      setCurrentPageGroup((prev) => prev - 1)
      setPage(page - 1)
    } else {
      setPage(page - 1)
    }
  }

  const goToNext = () => {
    if (pageGroupLastNumber === page) {
      setCurrentPageGroup((prev) => prev + 1)
      setPage(page + 1)
    } else {
      setPage(page + 1)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    for (let i = pageGroupFirstNumber; i <= pageGroupLastNumber; i++) {
      if (i > pagesNumber) break
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`${styles.pagingButton} ${page === i && styles.active}`}
          aria-current={page === i && 'page'}
        >
          {i}
        </button>,
      )
    }
    return buttons
  }

  return (
    <nav className={styles.container}>
      <button
        className={styles.pagingButton}
        type="button"
        onClick={goToPrev}
        disabled={page === 1}
      >
        <IoIosArrowBack />
      </button>
      {renderPaginationButtons()}
      <button
        className={styles.pagingButton}
        type="button"
        onClick={goToNext}
        disabled={page === pagesNumber}
      >
        <IoIosArrowForward />
      </button>
    </nav>
  )
}

export default Pagination
