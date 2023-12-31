import { axiosAccessFn } from '..'
import { CareersDataType } from '@/types/users/careerDataType'
const axiosAccess = axiosAccessFn()

export const postCareers = async (formData: CareersDataType) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/users/my-profile/careers',
      data: formData,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putCareers = async (
  formData: CareersDataType,
  careerId: number,
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/users/my-profile/careers/${careerId}`,
      data: formData,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteCareers = async (careerId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `users/my-profile/careers/${careerId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}
