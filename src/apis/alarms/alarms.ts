import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const deleteAlarm = async (alarmId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/users/alarms/${alarmId}`,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
