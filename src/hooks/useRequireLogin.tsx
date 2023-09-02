import { authState } from '@/recoil/authToken'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const useRequireLogin = () => {
  const router = useRouter()
  const authData = useRecoilValue(authState)
  const { accessToken, refreshToken } = authData

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      router.replace('/?user=login')
    }
  }, [accessToken, refreshToken])
}

export default useRequireLogin
