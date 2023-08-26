import { useEffect, useState } from 'react'
import { getPagination, setPagination } from '@/utils/savePagination'

const usePagination = (storageKey: string, limit: number) => {
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit

  useEffect(() => {
    const savedPage = getPagination(storageKey)
    setPage(savedPage)
  }, [storageKey])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setPagination(newPage, storageKey)
  }

  return { offset, page, handlePageChange }
}

export default usePagination
