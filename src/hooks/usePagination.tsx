import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/saveSessionStorage'
import { useEffect, useState } from 'react'

const usePagination = (storageKey?: string) => {
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    if (storageKey) {
      const savedPage = getSessionStorage(storageKey)
      if (!savedPage) {
        setPage(1)
      } else {
        setPage(savedPage)
      }
    }
  }, [storageKey])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    if (storageKey) {
      setSessionStorage(newPage, storageKey)
    }
  }

  return { page, setPage, handlePageChange }
}

export default usePagination
