import io from 'socket.io-client'

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL_BASIC

export const socket = io(`http://ws:${SERVER_URL}/chat`)
