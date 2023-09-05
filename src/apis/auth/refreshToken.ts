import { axiosBasic } from '..'

export const refreshToken = async (refreshToken: string) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/refresh',
      data: refreshToken,
    })
    const accessToken = res.data
    return accessToken
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
