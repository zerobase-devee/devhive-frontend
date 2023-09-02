import Tabs from '@/components/common/tabs/Tabs'
import Title from '@/components/common/title/Title'
import FavoriteProjectList from '@/components/mypage/bookmark/favoriteProject/FavoriteProjectList'
import FavoriteUserList from '@/components/mypage/bookmark/favoriteUser/FavoriteUserList'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import useRequireLogin from '@/hooks/useRequireLogin'

const Bookmark = () => {
  useRequireLogin()

  const tabMenu = ['관심프로젝트', '관심유저']
  const tabContent = [
    <FavoriteProjectList key={1} />,
    <FavoriteUserList key={2} />,
  ]

  return (
    <MypageLayout>
      <Title title="북마크" />
      <Tabs tabMenu={tabMenu} tabContents={tabContent} />
    </MypageLayout>
  )
}

export default Bookmark
