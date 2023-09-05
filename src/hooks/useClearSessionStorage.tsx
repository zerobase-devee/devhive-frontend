import { useEffect } from 'react'
import { useRouter } from 'next/router'

const useClearSessionStorage = (key: string | string[]) => {
  const router = useRouter()

  useEffect(() => {
    const sessionRemove = () => {
      if (typeof key === 'string') {
        sessionStorage.removeItem(key)
      } else if (Array.isArray(key)) {
        key.forEach((k) => sessionStorage.removeItem(k))
      }
    }

    router.events.on('beforeHistoryChange', sessionRemove)

    return () => {
      router.events.off('beforeHistoryChange', sessionRemove)
    }
  }, [key, router.events])
}
export default useClearSessionStorage
