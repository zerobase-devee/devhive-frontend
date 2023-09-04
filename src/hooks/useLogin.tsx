import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from '@/constants/cookieMaxAge'
import { alarmsSubscribe } from '@/pages/apis/alarms/alarmsSubscribe'
import { refreshToken } from '@/pages/apis/auth/refreshToken'
import { signin } from '@/pages/apis/auth/signin'
import { loginState } from '@/recoil/loginState'
import { LoginDataType } from '@/types/auth/loginDataType'
import { useCookies } from 'react-cookie'
import { useMutation, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const queryClient = useQueryClient()
  const setIsLogin = useSetRecoilState(loginState)

  const loginMutation = useMutation({
    mutationFn: (data: LoginDataType) => signin(data),
    onSuccess: (authToken) => {
      const { accessToken, refreshToken } = authToken
      if (accessToken !== undefined && refreshToken !== undefined) {
        queryClient.setQueryData('accessToken', accessToken)
        queryClient.setQueryData('refreshToken', refreshToken)
        setCookie('accessToken', authToken.accessToken, {
          path: '/',
          maxAge: ACCESS_TOKEN_MAX_AGE,
        })
        setCookie('refreshToken', authToken.refreshToken, {
          path: '/',
          maxAge: REFRESH_TOKEN_MAX_AGE,
        })
        setIsLogin(true)
        alarmsSubscribe()
      }
    },
  })

  const refreshTokenMutation = useMutation({
    mutationFn: () => refreshToken(cookies.refreshToken),
    onSuccess: (accessToken) => {
      const newAccessToken = accessToken
      queryClient.setQueryData('accessToken', newAccessToken)
      setCookie('accessToken', newAccessToken, {
        path: '/',
        maxAge: ACCESS_TOKEN_MAX_AGE,
      })
    },
    onError: (error: any) => {
      if (error.response) {
        removeCookie('accessToken')
        removeCookie('refreshToken')
        setIsLogin(false)
        console.log('API 오류:', error.response.message)
      } else {
        console.error('API 요청 실패', error)
      }
    },
  })

  return { loginMutation, refreshTokenMutation }
}

export default useLogin
