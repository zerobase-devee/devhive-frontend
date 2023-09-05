import { AxiosInstance } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export const fetchData = async (
  axios: AxiosInstance,
  url: string,
  setData: Dispatch<SetStateAction<any>>,
) => {
  try {
    const res = await axios.get(url)
    if (res.status === 200) {
      setData(res.data)
    }
  } catch (err) {
    console.log(err)
  }
}
