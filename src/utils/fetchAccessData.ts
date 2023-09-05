import { axiosAccess } from '@/apis'
import { Dispatch, SetStateAction } from 'react'
import { Cookies } from 'react-cookie'

export const fetchAccessData = async (
  url: string,
  setData: Dispatch<SetStateAction<any>>,
) => {
  const cookies = new Cookies()
  const accessToken = cookies.get('accessToken')
  if (!accessToken && accessToken !== undefined) {
    return
  } else {
    try {
      const res = await axiosAccess.get(url)
      if (res.status === 200) {
        setData(res.data)
      }
    } catch (err) {
      console.log(err)
    }
    return
  }
}
