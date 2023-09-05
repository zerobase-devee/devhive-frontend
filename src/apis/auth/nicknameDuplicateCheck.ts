import { axiosBasic } from '..'

export const nicknameDuplicateCheck = async (nickname: string) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/check-nickname',
      data: { nickname },
    })

    const duplicatedNickname: boolean = res.data
    return duplicatedNickname
  } catch (error: any) {
    throw error
  }
}
