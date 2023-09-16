import Link from 'next/link'
import styles from './naverLoginButton.module.css'
import NaverIcon from 'public/svgs/naver.svg'

const NaverLoginButton = () => {
  const OAUTH2_REDIRECT_URI = process.env.NEXT_PUBLIC_SNS_REDIRECT_URI
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const NAVER_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/naver?redirect_uri=${OAUTH2_REDIRECT_URI}`

  return (
    <Link href={NAVER_AUTH_URL} className={styles.naver}>
      <NaverIcon />
      네이버로 시작하기
    </Link>
  )
}

export default NaverLoginButton
