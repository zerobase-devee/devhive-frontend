import { axiosAccessFn } from '..'

export const imageFileConversion = async (formData: FormData) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/admin/image',
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
