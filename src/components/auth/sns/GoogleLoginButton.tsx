import Link from 'next/link'
import styles from './googleLoginButton.module.css'
import GoogleIcon from 'public/svgs/google.svg'

const GoogleLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI

  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}`

  return (
    <Link href={GOOGLE_AUTH_URL} className={styles.google}>
      <GoogleIcon />
      구글로 시작하기
    </Link>
  )
}

export default GoogleLoginButton
