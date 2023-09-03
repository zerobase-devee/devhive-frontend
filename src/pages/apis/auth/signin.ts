import { axiosBasic } from '..'
import { LoginDataType } from '@/types/auth/loginDataType'

export const signin = async (formData: LoginDataType) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/signin',
      data: formData,
    })
    const authToken = res.data
    return authToken
  } catch (error: any) {
    if (error.response) {
      const errorResponse = error.response.data
      console.error(
        `API 오류: ${errorResponse.errorCode} - ${errorResponse.message}`,
      )
      const errorMessage = errorResponse.message
      return errorMessage
    } else {
      console.error('API 요청 실패', error)
    }
  }
}
