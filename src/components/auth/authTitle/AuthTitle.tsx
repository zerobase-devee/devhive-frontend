import LogoL from 'public/svgs/logoL.svg'
import LogoS from 'public/svgs/logoS.svg'
import styles from './authTitle.module.css'
import useResponsiveSize from '@/hooks/useResponsiveSize'

interface AuthTitleProps {
  text: string
}

const AuthTitle = ({ text }: AuthTitleProps) => {
  const { isMobile } = useResponsiveSize()
  return (
    <div className={styles.title}>
      {isMobile ? <LogoS /> : <LogoL />}
      <h2>{text}</h2>
    </div>
  )
}

export default AuthTitle
