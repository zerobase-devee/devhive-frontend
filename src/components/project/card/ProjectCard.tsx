import styles from './projectCard.module.css'
import Link from 'next/link'
import { GrView } from 'react-icons/gr'
import { BiTime } from 'react-icons/bi'
import { LuMoreHorizontal } from 'react-icons/lu'
import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import Image from 'next/image'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { formatDatePost } from '@/utils/formatDate'
import {
  isRegion,
  translateDevelopmentToKorean,
  translateRecruitmentToKorean,
} from '@/utils/projectDataToKorean'
import { ProjectCardDataType } from '@/types/project/projectDataType'
import { TechStackDataType } from '@/types/admin/adminDataType'

const ProjectCard = ({
  id,
  title,
  userNickname,
  profileImage,
  createDate,
  viewCount,
  techStackList,
  developmentType,
  recruitmentType,
  region,
  bookmarkId,
  projectMemberList,
}: ProjectCardDataType) => {
  const isNewContent = (createdDate: string) => {
    const targetTime =
      new Date(createdDate).getTime() + (24 + 9) * 60 * 60 * 1000
    const currentTime = new Date().getTime()

    if (currentTime <= targetTime) {
      return <span className={styles.new}>NEW</span>
    } else {
      return null
    }
  }

  const ITEM_LIMIT_NUM = 3

  return (
    <div className={styles.container}>
      <BookmarkButton
        active={bookmarkId ? true : false}
        bookmarkId={bookmarkId}
        projectId={id}
      />
      <Link href={`/project/${id}`} className={styles.card}>
        <div className={styles.badgeArea}>
          <ProjectBadge>
            {translateDevelopmentToKorean(developmentType)}
          </ProjectBadge>
          <ProjectBadge green>
            {translateRecruitmentToKorean(recruitmentType)}
            {isRegion(region)}
          </ProjectBadge>
        </div>
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
          {isNewContent(createDate)}
        </div>
        <div className={styles.contentInfoArea}>
          <div className={styles.techStackArea}>
            {techStackList
              ?.slice(0, ITEM_LIMIT_NUM)
              .map((item: TechStackDataType) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  width={32}
                  height={32}
                />
              ))}
            {techStackList?.length >= 4 && (
              <span>+ {techStackList.length - 3}</span>
            )}
          </div>
          <div className={styles.contentInfo}>
            <BiTime />
            <span>{formatDatePost(createDate)}</span>
          </div>
          <div className={styles.contentInfo}>
            <GrView />
            <span>{viewCount}</span>
          </div>
        </div>
        <div className={styles.userArea}>
          <div className={styles.profile}>
            <UserProfileImg userProfile={profileImage} width={36} height={36} />
          </div>
          <p className={styles.nickname}>{userNickname}</p>
          <div className={styles.participatingUsers}>
            {projectMemberList?.slice(1, ITEM_LIMIT_NUM).map((item) => (
              <div className={styles.profileS} key={item.userId}>
                <UserProfileImg
                  userProfile={item.profileImage}
                  width={28}
                  height={28}
                />
              </div>
            ))}
            {projectMemberList?.length >= 3 && <LuMoreHorizontal />}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
