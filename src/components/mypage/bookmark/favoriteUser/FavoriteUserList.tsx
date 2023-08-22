import { FavoriteUserListProps } from '@/types/favoriteType'
import FavoriteUserCard from './FavoriteUserCard'
import styles from './favoriteUserCard.module.css'
import FavoriteNull from '../favoriteNull/FavoriteNull'

const FavoriteUserList = () => {
  const favoriteUsers: FavoriteUserListProps[] = [
    {
      userId: 1,
      userProfile: null,
      userNickname: '홍길동',
    },
    {
      userId: 2,
      userProfile: null,
      userNickname: '홍홍홍',
    },
    {
      userId: 3,
      userProfile: null,
      userNickname: '오',
    },
    { userId: 4, userProfile: null, userNickname: 'Project D' },
    {
      userId: 5,
      userProfile: null,
      userNickname: '야호',
    },
    { userId: 6, userProfile: null, userNickname: '오오오' },
  ]

  return (
    <>
      {favoriteUsers.length === 0 ? (
        <FavoriteNull>북마크에 추가한 유저가 아직 없어요.</FavoriteNull>
      ) : (
        <div className={styles.cardListContaienr}>
          {favoriteUsers.map((project) => (
            <FavoriteUserCard
              key={project.userId}
              userProfile={project.userProfile}
              userNickname={project.userNickname}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default FavoriteUserList
