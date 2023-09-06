import { axiosAccessFn } from '@/apis'
import { Dispatch, SetStateAction } from 'react'

export const fetchAccessData = async (
  url: string,
  setData: Dispatch<SetStateAction<any>>,
) => {
  const axiosAccess = axiosAccessFn()

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
