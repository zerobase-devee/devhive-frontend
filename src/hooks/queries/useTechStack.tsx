import { putTechStack } from '@/apis/mypage/techStack'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { TechStackDataType } from '@/types/admin/adminDataType'
import { useMutation, useQueryClient } from 'react-query'

const useQueryTechStack = () => {
  const queryClient = useQueryClient()
  const editTechStack = useMutation(
    (formData: TechStackDataType[]) => {
      return putTechStack(formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserTechStack)
      },
    },
  )
  return { editTechStack }
}

export default useQueryTechStack
