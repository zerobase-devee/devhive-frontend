import { axiosInstance } from '..'
import { LoginDataType } from '@/types/auth/loginDataType'

export const signin = async (formData: LoginDataType) => {
  try {
    const res = await axiosInstance({
      method: 'post',
      url: '/auth/signin',
      data: formData,
    })

    const authToken = res.data
    axiosInstance.defaults.headers.common['Authorization'] = `${authToken}`
    return authToken
  } catch (error: any) {
    if (error.response) {
      const errorResponse = error.response.data
      console.error(
        `API 오류: ${errorResponse.errorCode} - ${errorResponse.message}`,
      )
      const errMsg = errorResponse.message
      return errMsg
    } else {
      console.error('API 요청 실패', error)
    }
  }
}
