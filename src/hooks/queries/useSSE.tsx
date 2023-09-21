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

      sse.onopen = async (event) => {
        await queryClient.invalidateQueries(REACT_QUERY_KEY.alarm)
      }

      sse.onmessage = async (event) => {
        try {
          await queryClient.invalidateQueries(REACT_QUERY_KEY.alarm)
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

    const intervalId = setInterval(
      () => {
        if (sseInstance.readyState === EventSource.CLOSED) {
          console.log('SSE 연결 실패. 다시 연결 시도 중...')
          sseInstance.close()
          sseInstance = connectSSE()
        }
      },
      1000 * 60 * 60,
    )

    return () => {
      clearInterval(intervalId)
      sseInstance.close()
    }
  }

  return { startSSE }
}

export default useSSE
