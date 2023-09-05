import { axiosBasic } from '..'

export const signout = async () => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: '/auth/signout',
    })

    return res
  } catch (err) {
    console.log(err)
  }
}
