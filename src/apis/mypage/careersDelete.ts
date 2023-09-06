import { axiosAccessFn } from '..'

export const careersDelete = async (careerId: number) => {
  const axiosAccess = axiosAccessFn()

  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `users/my-profile/careers/${careerId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}
