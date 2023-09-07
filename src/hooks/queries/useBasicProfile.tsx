import {
  deleteProfileImg,
  putBasicProfile,
  putProfileImg,
} from '@/apis/mypage/basicProfile'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { MyProfileModifyDataType } from '@/types/users/myprofileDataType'
import { useMutation, useQueryClient } from 'react-query'

const useBasicProfile = () => {
  const queryClient = useQueryClient()
  const editBasicProfile = useMutation(
    (serverSendData: MyProfileModifyDataType) => {
      return putBasicProfile(serverSendData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserProfile)
      },
    },
  )

  const editProfileImg = useMutation(
    (serverSendData: FormData) => {
      return putProfileImg(serverSendData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserProfile)
      },
    },
  )

  const deleteProfileImgMutation = useMutation(() => deleteProfileImg(), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserProfile)
    },
  })

  return { editBasicProfile, editProfileImg, deleteProfileImgMutation }
}

export default useBasicProfile
