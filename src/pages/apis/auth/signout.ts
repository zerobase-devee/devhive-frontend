import { axiosInstance } from '..'

export const signout = async () => {
  try {
    const res = await axiosInstance({
      method: 'post',
      url: '/auth/signout',
    })

    return res
  } catch (err) {
    console.log(err)
  }
}
