import { signout } from '@/apis/auth/signout'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { usePathname, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useQueryClient } from 'react-query'
import { useResetRecoilState } from 'recoil'

const useLoginLogout = () => {
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const resetUserInfo = useResetRecoilState(loginUserInfo)
  const [, , removeCookie] = useCookies()

  const handleClick = () => {
    document.body.style.overflow = 'hidden'
    const queryString = new URLSearchParams()
    queryString.set('user', 'login')
    router.push(pathname + '?' + queryString.toString())
  }

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto'
    router.replace(pathname)
  }

  const onLogout = async () => {
    try {
      await signout()
      queryClient.invalidateQueries(REACT_QUERY_KEY.accessToken)
      queryClient.invalidateQueries(REACT_QUERY_KEY.refreshToken)
      queryClient.invalidateQueries(REACT_QUERY_KEY.userInfo)
      queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserProfile)
      removeCookie('accessToken', { path: '/' })
      removeCookie('refreshToken', { path: '/' })
      removeCookie('userInfo', { path: '/' })
      resetUserInfo()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return { handleClick, handleCloseModal, onLogout }
}

export default useLoginLogout
