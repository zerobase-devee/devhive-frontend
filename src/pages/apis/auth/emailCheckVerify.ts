import { axiosBasic } from '..'

export const emailCheckVerify = async (
  email: string,
  verificationCode: string,
) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/verify/check',
      data: { email, verificationCode },
    })
    const nicknameCheck: boolean = res.data
    return nicknameCheck
  } catch (error: any) {
    throw error
  }
}
