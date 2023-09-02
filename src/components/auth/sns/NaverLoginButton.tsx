import Link from 'next/link'
import styles from './naverLoginButton.module.css'
import NaverIcon from 'public/svgs/naver.svg'

const NaverLoginButton = () => {
  const CLIENT_ID = 'REST_API_KEY(연결필요)'
  const NAVER_REDIRECT_URI = 'http://localhost:3000/login/naver'
  const STATE_STRING = '아'

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE_STRING}`

  return (
    <Link href={NAVER_AUTH_URL} className={styles.naver}>
      <NaverIcon />
      네이버로 시작하기
    </Link>
  )
}

export default NaverLoginButton
