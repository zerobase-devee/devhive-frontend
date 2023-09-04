// 알림 구독
import { axiosAccess } from '..'

export const alarmsSubscribe = async () => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: '/users/alarms/subscribe',
    })
    return res.data
  } catch (error: any) {
    if (error.response) {
      const errorResponse = error.response.data
      console.error(
        `API 오류: ${errorResponse.errorCode} - ${errorResponse.message}`,
      )
    } else {
      console.error('API 요청 실패', error)
    }
  }
}
