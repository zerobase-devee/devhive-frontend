import { axiosBasic } from '@/apis'
import { Dispatch, SetStateAction } from 'react'

export const fetchData = async (
  url: string,
  setData?: Dispatch<SetStateAction<any>>,
) => {
  try {
    const res = await axiosBasic.get(url)
    if (res.status === 200) {
      if (setData) {
        setData(res.data)
        return
      }
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}
