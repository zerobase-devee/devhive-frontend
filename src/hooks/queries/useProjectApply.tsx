import {
  putApplicationAccept,
  putApplicationReject,
} from '@/apis/project/apply'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { useMutation, useQueryClient } from 'react-query'

const useProjectApply = () => {
  const queryClient = useQueryClient()

  const acceptUser = useMutation(
    (applicationId: number) => putApplicationAccept(applicationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectApplyList)
      },
      onError: (error) => {
        console.error('수락 실패:', error)
      },
    },
  )

  const rejectUser = useMutation(
    (applicationId: number) => putApplicationReject(applicationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectApplyList)
      },
      onError: (error) => {
        console.error('수락 실패:', error)
      },
    },
  )

  return { acceptUser, rejectUser }
}

export default useProjectApply
