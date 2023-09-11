import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { useQueryClient } from 'react-query'

const useSSE = () => {
  const queryClient = useQueryClient()
  const startSSE = (userId: number) => {
    console.log('startSSE: ', userId)

    const connectSSE = () => {
      const sse = new EventSource(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/alarms/subscribe/${userId}`,
      )

      sse.onopen = (event) => {
        // console.log(event)
        console.log('SSE 연결 성공')
        queryClient.invalidateQueries(REACT_QUERY_KEY.alarm)
      }

      sse.onmessage = (event) => {
        try {
          // console.log(event)
          queryClient.invalidateQueries(REACT_QUERY_KEY.alarm)
        } catch (error) {
          console.error('Error parsing JSON data:', error)
        }
      }

      sse.onerror = (error) => {
        // console.error('SSE Error:', error)
        sse.close()
      }

      return sse
    }

    let sseInstance = connectSSE()

    const intervalId = setInterval(() => {
      if (sseInstance.readyState === EventSource.CLOSED) {
        console.log('SSE 연결 실패. 다시 연결 시도 중...')
        sseInstance.close()
        sseInstance = connectSSE()
      }
    }, 30000)

    return () => {
      clearInterval(intervalId)
      sseInstance.close()
    }
  }

  return { startSSE }
}

export default useSSE
