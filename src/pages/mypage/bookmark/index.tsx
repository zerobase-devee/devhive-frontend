import Tabs from '@/components/common/tabs/Tabs'
import Title from '@/components/common/title/Title'
import FavoriteProjectList from '@/components/mypage/bookmark/favoriteProject/FavoriteProjectList'
import FavoriteUserList from '@/components/mypage/bookmark/favoriteUser/FavoriteUserList'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import useRequireLogin from '@/hooks/useRequireLogin'
import { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false

  return {
    props: {
      initialAuth: isLogin,
    },
  }
}

export default Bookmark
