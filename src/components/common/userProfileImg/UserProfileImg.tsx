import Image, { StaticImageData } from 'next/image'
import styles from './userProfileImg.module.css'
import { FaUserCircle } from 'react-icons/fa'

interface UserProfileImgProps {
  readonly userProfile: string | null | StaticImageData
  readonly width: number
  readonly height: number
}

const UserProfileImg = ({
  userProfile,
  width,
  height,
}: UserProfileImgProps) => {
  return (
    <div
      className={`${styles.profileImg} ${
        userProfile === null ? '' : styles.border
      }`}
    >
      {userProfile === null ? (
        <FaUserCircle />
      ) : (
        <Image
          src={userProfile}
          width={width}
          height={height}
          alt="유저 프로필 사진"
          priority
        />
      )}
    </div>
  )
}

export default UserProfileImg
