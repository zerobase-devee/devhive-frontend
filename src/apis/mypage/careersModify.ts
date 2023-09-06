import { axiosAccessFn } from '..'
import { CareersDataType } from '@/types/users/career'

export const careersModify = async (
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

    console.log(res)

    return res
  } catch (error) {
    throw error
  }
}
