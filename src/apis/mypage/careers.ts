import { axiosAccessFn } from '..'
import { CareersDataType } from '@/types/users/career'

export const careers = async (formData: CareersDataType) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/users/my-profile/careers',
      data: formData,
    })

    console.log(res)

    return res
  } catch (error) {
    throw error
  }
}
