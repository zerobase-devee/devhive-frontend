import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useCookies } from 'react-cookie'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'

const useSSE = () => {
  const EventSource = EventSourcePolyfill
  const [cookies] = useCookies()
  const isLogin = useRecoilValue(loginState)

  useEffect(() => {
    if (!isLogin) {
      return
    } else {
      const sse = new EventSource(`/users/alarms/subscribe`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })

      return () => {
        sse.close()
      }
    }
  }, [isLogin, cookies.accessToken, EventSource])

  return
}

export default useSSE
