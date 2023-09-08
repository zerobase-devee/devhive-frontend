import { SendProjectDataType } from '@/types/project/projectDataType'
import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const postProject = async (formData: SendProjectDataType) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/projects',
      data: formData,
    })
    console.log(res)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getimageFileConversion = async (formData: FormData) => {
  const axiosAccess = axiosAccessFn()

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
