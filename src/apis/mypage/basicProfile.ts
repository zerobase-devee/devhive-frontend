import { axiosAccessFn } from '..'
import { MyProfileModifyDataType } from '@/types/users/myprofileDataType'

const axiosAccess = axiosAccessFn()
export const putBasicProfile = async (formData: MyProfileModifyDataType) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: '/users/my-profile',
      data: formData,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putProfileImg = async (formData: FormData) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: '/users/my-profile/image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteProfileImg = async () => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: '/users/my-profile/image',
    })

    return res
  } catch (error) {
    throw error
  }
}
