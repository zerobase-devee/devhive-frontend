import { Cookies } from 'react-cookie'
import { axiosAccess } from '..'

export const loginUserProfile = async (): Promise<{
  profileImage: string | null
  userId: number
}> => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/my-profile',
    })
    const cookies = new Cookies()
    const profileImage = res.data.profileImage
    const userId = res.data.userId
    cookies.set('loginUserId', userId)
    return { profileImage, userId }
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
