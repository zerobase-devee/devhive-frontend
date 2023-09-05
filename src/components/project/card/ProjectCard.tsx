import styles from './projectCard.module.css'
import Link from 'next/link'
import { GrView } from 'react-icons/gr'
import { BiTime } from 'react-icons/bi'
import { LuMoreHorizontal } from 'react-icons/lu'
import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import Image from 'next/image'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { ProjectCardProps } from '@/types/projectDataType'
import { formatDatePost } from '@/utils/formatDate'
import { isRegion } from '@/utils/projectIsRegion'

const ProjectCard = ({
  projectID,
  projectTitle,
  nickname,
  userProfile,
  createdDate,
  viewCount,
  techStacks,
  developmentType,
  recruitmentType,
  region,
  bookmark,
  participatingUsers,
}: ProjectCardProps) => {
  const isNewContent = (createdDate: string) => {
    const targetTime = new Date(createdDate).getTime() + 24 * 60 * 60 * 1000
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
      <BookmarkButton active={bookmark} />
      <Link href={`/project/${projectID}`} className={styles.card}>
        <div className={styles.badgeArea}>
          <ProjectBadge>{developmentType}</ProjectBadge>
          <ProjectBadge green>
            {recruitmentType}
            {isRegion(region)}
          </ProjectBadge>
        </div>
        <div className={styles.titleArea}>
          <p className={styles.title}>{projectTitle}</p>
          {isNewContent(createdDate)}
        </div>
        <div className={styles.contentInfoArea}>
          <div className={styles.techStackArea}>
            {techStacks.slice(0, ITEM_LIMIT_NUM).map((item) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.name}
                width={32}
                height={32}
              />
            ))}
            {techStacks.length > 4 && <span>+ {techStacks.length - 3}</span>}
          </div>
          <div className={styles.contentInfo}>
            <BiTime />
            <span>{formatDatePost(createdDate)}</span>
          </div>
          <div className={styles.contentInfo}>
            <GrView />
            <span>{viewCount}</span>
          </div>
        </div>
        <div className={styles.userArea}>
          <div className={styles.profile}>
            <UserProfileImg userProfile={userProfile} width={36} height={36} />
          </div>
          <p className={styles.nickname}>{nickname}</p>
          <div className={styles.participatingUsers}>
            {participatingUsers.slice(0, ITEM_LIMIT_NUM).map((item) => (
              <div className={styles.profileS} key={item.userId}>
                <UserProfileImg
                  userProfile={item.userProfile}
                  width={28}
                  height={28}
                />
              </div>
            ))}
            {participatingUsers.length >= 3 && <LuMoreHorizontal />}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
