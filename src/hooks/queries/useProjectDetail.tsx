import { putProject } from '@/apis/project/projects'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { SendProjectDataType } from '@/types/project/projectDataType'
import { useMutation, useQueryClient } from 'react-query'

const useProjectDetail = () => {
  const queryClient = useQueryClient()

  const editProjectDetail = useMutation(
    ({
      projectId,
      writeData,
    }: {
      projectId: number
      writeData: SendProjectDataType
    }) => putProject(projectId, writeData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectDetail)
      },
      onError: (error) => {
        console.error('수정 실패:', error)
      },
    },
  )
  return { editProjectDetail }
}

export default useProjectDetail
