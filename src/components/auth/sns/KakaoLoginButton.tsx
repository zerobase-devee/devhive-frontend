import KakaoIcon from 'public/svgs/kakao.svg'
import styles from './kakakoLoginButton.module.css'
import Link from 'next/link'

const KakaoLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email,profile_image,profile_nickname`

  return (
    <Link href={KAKAO_AUTH_URL} className={styles.kakao}>
      <KakaoIcon />
      카카오로 시작하기
    </Link>
  )
}

export default KakaoLoginButton
