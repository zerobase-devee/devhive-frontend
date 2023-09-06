import { AdminSendDataType } from '@/types/admin/adminDataType'
import { axiosAccessFn } from '..'

export const postTechStack = async (formData: AdminSendDataType) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/admin/tech-stack',
      data: formData,
    })

    return res
  } catch (error) {
    throw error
  }
}

export const deleteTechStack = async (techStackId: number) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/admin/tech-stack/${techStackId}`,
    })

    return res
  } catch (error) {
    throw error
  }
}
