import styles from '@/styles/pages/admin.module.css'
import BadgeUpload from '@/components/admin/BadgeUpload'
import TechStackUpload from '@/components/admin/TechStackUpload'
import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import { loginUserInfo } from '@/recoil/loginUserInfo'

const Admin = () => {
  const router = useRouter()
  const isLogin = useRecoilValue(loginState)
  const userInfo = useRecoilValue(loginUserInfo)
  const isAdmin = userInfo.role

  useEffect(() => {
    if (isLogin === false || isAdmin === 'USER') {
      router.replace('/?user=login')
    }
  })

  return (
    <Container>
      <Title title="관리자 페이지" />
      <div className={styles.container}>
        <TechStackUpload />
        <BadgeUpload />
      </div>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false
  const userInfo = req.cookies.userInfo || null
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : ''

  return {
    props: {
      initialAuth: isLogin,
      initialUserInfo: parsedUserInfo,
    },
  }
}

export default Admin
