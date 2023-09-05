import Link from 'next/link'
import styles from './naverLoginButton.module.css'
import NaverIcon from 'public/svgs/naver.svg'

const NaverLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URL = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URL}&state=${CLIENT_SECRET}`

  return (
    <Link href={NAVER_AUTH_URL} className={styles.naver}>
      <NaverIcon />
      네이버로 시작하기
    </Link>
  )
}

export default NaverLoginButton
