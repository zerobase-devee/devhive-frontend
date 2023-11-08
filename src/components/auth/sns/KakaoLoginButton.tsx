import KakaoIcon from 'public/svgs/kakao.svg'
import styles from './kakakoLoginButton.module.css'
import Link from 'next/link'

const KakaoLoginButton = () => {
  const OAUTH2_REDIRECT_URI = process.env.NEXT_PUBLIC_SNS_REDIRECT_URI
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${OAUTH2_REDIRECT_URI}`

  return (
    <Link href={KAKAO_AUTH_URL} className={styles.kakao}>
      <KakaoIcon />
      카카오로 시작하기
    </Link>
  )
}

export default KakaoLoginButton
