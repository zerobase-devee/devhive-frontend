import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const signout = async () => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/auth/logout`,
    })

    return res
  } catch (error) {
    console.log(error)
  }
}
