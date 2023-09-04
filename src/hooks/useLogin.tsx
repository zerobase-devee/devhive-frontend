import { signin } from '@/pages/apis/auth/signin'
import { loginState } from '@/recoil/loginState'
import { LoginDataType } from '@/types/auth/loginDataType'
import { useCookies } from 'react-cookie'
import { useMutation, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

const useLogin = () => {
  const [, setCookie] = useCookies()
  const queryClient = useQueryClient()
  const setIsLogin = useSetRecoilState(loginState)
  const loginMutation = useMutation({
    mutationFn: (data: LoginDataType) => signin(data),
    onSuccess: (authToken) => {
      const { accessToken, refreshToken } = authToken
      if (accessToken !== undefined && refreshToken !== undefined) {
        queryClient.setQueryData('accessToken', accessToken)
        queryClient.setQueryData('refreshToken', refreshToken)
        setCookie('accessToken', authToken.accessToken)
        setCookie('refreshToken', authToken.refreshToken)
        setIsLogin(true)
      }
    },
  })

  return { loginMutation }
}

export default useLogin
