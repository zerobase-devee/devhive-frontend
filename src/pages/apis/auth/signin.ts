import { LoginDataType } from '@/types/auth/loginDataType'
import { axiosInstance } from '..'

export const signin = async (formData: LoginDataType) => {
  try {
    const res = await axiosInstance({
      method: 'post',
      url: '/auth/signin',
      data: formData,
    })
    const authToken = res.data
    axiosInstance.defaults.headers.common['Authorization'] = `${authToken}`
    return authToken
  } catch (err) {
    console.log(err)
  }
}
