import { axiosBasic } from '..'
import { SignupDataType } from '@/types/auth/signupDataType'

export const signup = async (formData: SignupDataType) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/signup',
      data: formData,
    })
    return res
  } catch (error: any) {
    throw error
  }
}
