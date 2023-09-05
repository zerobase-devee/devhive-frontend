import { axiosAccess } from '..'

export const alarms = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/alarms',
    })
    return res.data
  } catch (error) {
    throw error
  }
}
