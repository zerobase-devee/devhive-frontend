import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/saveSessionStorage'
import { useEffect, useState } from 'react'

const usePagination = (storageKey: string) => {
  const [page, setPage] = useState<number>(0)

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

  return { page, setPage, handlePageChange }
}

export default usePagination
