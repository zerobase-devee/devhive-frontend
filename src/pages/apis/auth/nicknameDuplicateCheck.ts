import { axiosBasic } from '..'

export const nicknameDuplicateCheck = async (nickname: string) => {
  try {
    const res = await axiosBasic({
      method: 'get',
      url: '/auth/check-nickname',
      params: {
        nickname: nickname,
      },
    })

    const duplicatedNickname: boolean = res.data
    return duplicatedNickname
  } catch (err) {
    console.log(err)
  }
}
