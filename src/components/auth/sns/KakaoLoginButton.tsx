import KakaoIcon from 'public/svgs/kakao.svg'
import styles from './kakakoLoginButton.module.css'
import Link from 'next/link'

const KakaoLoginButton = () => {
  const CLIENT_ID = 'REST_API_KEY(연결필요)'
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/kakao'

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=account_email`

  return (
    <Link href={KAKAO_AUTH_URL} className={styles.kakao}>
      <KakaoIcon />
      카카오로 시작하기
    </Link>
  )
}

export default KakaoLoginButton
