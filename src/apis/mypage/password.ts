import { PasswordDataType } from '@/types/users/passwordDataType'
import { axiosAccessFn } from '..'

export const putPassword = async (data: PasswordDataType) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'put',
      url: '/users/password',
      data: data,
    })
    return res
  } catch (error: any) {
    throw error
  }
}
