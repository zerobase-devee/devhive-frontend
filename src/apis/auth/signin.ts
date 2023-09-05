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
    throw error
  }
}
