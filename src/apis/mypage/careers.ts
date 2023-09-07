import { axiosAccessFn } from '..'
import { CareersDataType } from '@/types/users/careerDataType'

export const postCareers = async (formData: CareersDataType) => {
  const axiosAccess = axiosAccessFn()
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
  const axiosAccess = axiosAccessFn()
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
  const axiosAccess = axiosAccessFn()
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
