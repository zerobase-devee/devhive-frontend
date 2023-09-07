import { deleteCareers, postCareers, putCareers } from '@/apis/mypage/careers'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import {
  CareersDataType,
  GetCareersDataType,
} from '@/types/users/careerDataType'
import { useMutation, useQueryClient } from 'react-query'

const useCareer = () => {
  const queryClient = useQueryClient()
  const addCareerMutation = useMutation(
    (serverSendData: CareersDataType) => {
      return postCareers(serverSendData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserCareer)
      },
    },
  )

  const editCareerMutation = useMutation(
    ({
      serverSendData,
      careerId,
    }: {
      serverSendData: CareersDataType
      careerId: number
    }) => {
      return putCareers(serverSendData, careerId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserCareer)
      },
    },
  )

  const deleteCareerMutation = useMutation(
    (careerId: number) => deleteCareers(careerId),
    {
      onMutate: (deletedCareerId) => {
        const previousData = queryClient.getQueryData<GetCareersDataType[]>(
          REACT_QUERY_KEY.loginUserCareer,
        )
        queryClient.setQueryData('loginUserCareer', (previousData) => {
          return (
            (previousData as GetCareersDataType[])?.filter(
              (item: GetCareersDataType) => item.careerId !== deletedCareerId,
            ) || []
          )
        })
        return { previousData }
      },
      onError: (_err, _variables, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(
            REACT_QUERY_KEY.loginUserCareer,
            context.previousData,
          )
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserCareer)
      },
    },
  )

  return { addCareerMutation, editCareerMutation, deleteCareerMutation }
}

export default useCareer
