import { axiosAccessFn } from '..'
import { SendProjectDataType } from '@/types/project/projectDataType'

const axiosAccess = axiosAccessFn()

export const postProject = async (formData: SendProjectDataType) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/projects',
      data: formData,
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const getimageFileConversion = async (formData: FormData) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/projects/image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteProject = async (projectId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `projects/${projectId}`,
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export const putProject = async (
  projectId: number,
  formData: SendProjectDataType,
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `projects/${projectId}`,
      data: formData,
    })

    return res.data
  } catch (error) {
    throw error
  }
}
