import { axiosAccessFn } from '..'
import { TechStackDataType } from '@/types/admin/adminDataType'

export const putTechStack = async (formData: TechStackDataType[]) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'put',
      url: '/users/my-profile/tech-stacks',
      data: { techStacks: formData },
    })

    return res
  } catch (error) {
    throw error
  }
}
