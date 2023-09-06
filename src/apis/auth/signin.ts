import { axiosBasic } from '..'
import { LoginDataType } from '@/types/auth/loginDataType'

export const signin = async (formData: LoginDataType) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/signin',
      data: formData,
    })
    return res.data
  } catch (error: any) {
    throw error
  }
}
