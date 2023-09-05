import { axiosAccess } from '..'

export const isLocalLogin = async (): Promise<boolean> => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/my-profile',
    })
    const isLocalLogin = res.data.localLogin
    return isLocalLogin
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
      return error
    }
  }
}
