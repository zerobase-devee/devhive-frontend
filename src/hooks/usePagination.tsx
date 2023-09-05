import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/saveSessionStorage'
import { useEffect, useState } from 'react'

const usePagination = (storageKey: string, limit: number) => {
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit

  useEffect(() => {
    const savedPage = getSessionStorage(storageKey)
    if (!savedPage) {
      setPage(1)
    } else {
      setPage(savedPage)
    }
  }, [storageKey])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setSessionStorage(newPage, storageKey)
  }

  return { offset, page, setPage, handlePageChange }
}

export default usePagination
