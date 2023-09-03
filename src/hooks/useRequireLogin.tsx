import { loginState } from '@/recoil/loginState'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const useRequireLogin = () => {
  const router = useRouter()
  const isLogin = useRecoilValue(loginState)

  useEffect(() => {
    if (isLogin === false) {
      router.replace('/?user=login')
    }
  }, [isLogin])
}

export default useRequireLogin
