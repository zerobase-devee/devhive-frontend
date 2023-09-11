import axios from 'axios'
import { Cookies } from 'react-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const axiosBasic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const cookies = new Cookies()

export const axiosAccessFn = () => {
  const axiosAccess = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  axiosAccess.interceptors.request.use(
    async (config) => {
      try {
        const accessToken = await cookies.get('accessToken')
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      } catch (error) {
        return Promise.reject(error)
      }
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return axiosAccess
}
