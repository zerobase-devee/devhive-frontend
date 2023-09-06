import { axiosBasic } from '..'
import { LoginDataType } from '@/types/auth/loginDataType'

export const signin = async (formData: LoginDataType) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/signin',
      data: formData,
    })
    const resData = res.data
    return resData
  } catch (error: any) {
    throw error
  }
}
