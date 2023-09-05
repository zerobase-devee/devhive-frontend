import KakaoIcon from 'public/svgs/kakao.svg'
import styles from './kakakoLoginButton.module.css'
import Link from 'next/link'

const KakaoLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&scope=account_email`

  return (
    <Link href={KAKAO_AUTH_URL} className={styles.kakao}>
      <KakaoIcon />
      카카오로 시작하기
    </Link>
  )
}

export default KakaoLoginButton
