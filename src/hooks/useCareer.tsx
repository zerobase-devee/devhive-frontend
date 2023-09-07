import { deleteCareers, postCareers, putCareers } from '@/apis/mypage/careers'
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
        queryClient.invalidateQueries('loginUserCareer')
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
        queryClient.invalidateQueries('loginUserCareer')
      },
    },
  )

  const deleteCareerMutation = useMutation(
    (careerId: number) => deleteCareers(careerId),
    {
      onMutate: (deletedCareerId) => {
        const previousData =
          queryClient.getQueryData<GetCareersDataType[]>('loginUserCareer')
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
          queryClient.setQueryData('loginUserCareer', context.previousData)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries('loginUserCareer')
      },
    },
  )

  return { addCareerMutation, editCareerMutation, deleteCareerMutation }
}

export default useCareer
