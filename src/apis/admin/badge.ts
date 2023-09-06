import { AdminSendDataType } from '@/types/admin/adminDataType'
import { axiosAccessFn } from '..'

export const postBadge = async (formData: AdminSendDataType) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/admin/badge',
      data: formData,
    })

    return res
  } catch (error) {
    throw error
  }
}

export const deleteBadge = async (badgeId: number) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/admin/badge/${badgeId}`,
    })

    return res
  } catch (error) {
    throw error
  }
}
