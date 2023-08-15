import Logo from 'public/svgs/Logo.svg'
import styles from './title.module.css'

interface AuthTitleProps {
  text: string
}

const AuthTitle = ({ text }: AuthTitleProps) => {
  return (
    <div className={styles.title}>
      <Logo />
      <h2>{text}</h2>
    </div>
  )
}

export default AuthTitle
