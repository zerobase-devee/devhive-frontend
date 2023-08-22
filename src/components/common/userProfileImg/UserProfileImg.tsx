import Image from 'next/image'
import styles from './userProfileImg.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { UserProfile } from '@/types/userDataType'

const UserProfileImg = ({ userProfile, width, height }: UserProfile) => {
  return (
    <div className={styles.profileImg}>
      {userProfile === null ? (
        <FaUserCircle />
      ) : (
        <Image
          src={userProfile}
          width={width}
          height={height}
          alt="유저 프로필 사진"
        />
      )}
    </div>
  )
}

export default UserProfileImg
