import { axiosBasic } from '..'

export const postRefreshToken = async (refreshToken: string) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/refresh',
      data: refreshToken,
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    const resData = res.data
    return resData
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
