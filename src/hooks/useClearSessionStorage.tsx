import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useClearSessionStorage = (key: string) => {
  const router = useRouter()

  useEffect(() => {
    const sessionRemove = () => {
      sessionStorage.removeItem(key)
    }

    router.events.on('beforeHistoryChange', sessionRemove)

    return () => {
      router.events.off('beforeHistoryChange', sessionRemove)
    }
  }, [key, router.events])
}
export default useClearSessionStorage
