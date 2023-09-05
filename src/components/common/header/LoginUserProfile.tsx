import { useEffect, useState } from 'react'
import UserProfileImg from '../userProfileImg/UserProfileImg'
import { loginUserProfileImg } from '@/apis/mypage/loginUserProfileImg'

const LoginUserProfile = () => {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileImg = await loginUserProfileImg()
        setImage(userProfileImg)
      } catch (error) {
        console.error('API 요청 실패', error)
      }
    }

    fetchUserProfile()
  }, [])

  if (!image) {
    return <UserProfileImg userProfile={null} width={48} height={48} />
  }

  return <UserProfileImg userProfile={image} width={48} height={48} />
}

export default LoginUserProfile
