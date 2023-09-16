import Link from 'next/link'
import styles from './googleLoginButton.module.css'
import GoogleIcon from 'public/svgs/google.svg'

const GoogleLoginButton = () => {
  const OAUTH2_REDIRECT_URI = process.env.NEXT_PUBLIC_SNS_REDIRECT_URI
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/google?redirect_uri=${OAUTH2_REDIRECT_URI}`

  return (
    <Link href={GOOGLE_AUTH_URL} className={styles.google}>
      <GoogleIcon />
      구글로 시작하기
    </Link>
  )
}

export default GoogleLoginButton
