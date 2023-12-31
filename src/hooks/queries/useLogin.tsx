import { TOKEN_MAX_AGE } from '@/constants/cookieMaxAge'
import { postRefreshToken } from '@/apis/auth/refreshToken'
import { signin } from '@/apis/auth/signin'
import { LoginDataType } from '@/types/auth/loginDataType'
import { useCookies } from 'react-cookie'
import { useMutation, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { loginUserInfoDataType } from '@/types/auth/userDataType'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import useModal from '../useModal'
import useSSE from './useSSE'

const useLogin = () => {
  const { startSSE } = useSSE()
  const [cookies, setCookie, removeCookie] = useCookies()
  const queryClient = useQueryClient()
  const setUserInfo = useSetRecoilState(loginUserInfo)
  const { handleCloseModal } = useModal()

  const loginMutation = useMutation({
    mutationFn: (data: LoginDataType) => signin(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken, userDto } = data
      queryClient.setQueryData(REACT_QUERY_KEY.accessToken, accessToken)
      queryClient.setQueryData(REACT_QUERY_KEY.refreshToken, refreshToken)
      queryClient.setQueryData(REACT_QUERY_KEY.userInfo, userDto)
      setCookie('accessToken', accessToken, {
        path: '/',
        maxAge: TOKEN_MAX_AGE,
      })
      setCookie('refreshToken', refreshToken, {
        path: '/',
        maxAge: TOKEN_MAX_AGE,
      })
      const userInfo: loginUserInfoDataType = {
        userId: userDto.userId,
        profileImage: userDto.profileImage,
        role: userDto.role,
        nickName: userDto.nickName,
      }
      setCookie('userInfo', JSON.stringify(userInfo), {
        path: '/',
        maxAge: TOKEN_MAX_AGE,
      })
      handleCloseModal()

      setUserInfo(userInfo)
      startSSE(userDto.userId)
    },
    onError: (error) => {
      console.error('API 호출 실패:', error)
    },
  })

  const refreshTokenMutation = useMutation({
    mutationFn: () => postRefreshToken(cookies.refreshToken),
    onSuccess: (resData) => {
      const { accessToken, refreshToken } = resData
      queryClient.setQueryData('accessToken', accessToken)
      setCookie('accessToken', accessToken, {
        path: '/',
        maxAge: TOKEN_MAX_AGE,
      })
      queryClient.setQueryData('refreshToken', refreshToken)
      setCookie('refreshToken', refreshToken, {
        path: '/',
        maxAge: TOKEN_MAX_AGE,
      })
    },
    onError: (error: any) => {
      if (error.response) {
        removeCookie('accessToken', { path: '/' })
        removeCookie('refreshToken', { path: '/' })
        console.log('API 오류:', error.response.message)
      } else {
        console.error('API 요청 실패', error)
      }
    },
  })

  return { loginMutation, refreshTokenMutation }
}

export default useLogin
