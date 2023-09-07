import UserProfileImg from '../userProfileImg/UserProfileImg'
import { useQuery } from 'react-query'
import { MyProfileDataType } from '@/types/users/myprofileDataType'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { fetchAccessData } from '@/utils/fetchAccessData'
import Loading from '../loading/Loading'

const LoginUserProfile = () => {
  const { data, error, isLoading } = useQuery<MyProfileDataType>(
    REACT_QUERY_KEY.loginUserProfile,
    () => fetchAccessData('/users/my-profile'),
  )

  if (error) {
    return <div>에러 발생</div>
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <UserProfileImg userProfile={null} width={48} height={48} />
  }

  return (
    <UserProfileImg userProfile={data.profileImage} width={48} height={48} />
  )
}

export default LoginUserProfile
