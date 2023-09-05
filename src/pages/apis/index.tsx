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
const accessToken = cookies.get('accessToken')

export const axiosAccess = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})
