import styles from './authContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgArea}>
        <Image src={loginPic} alt="" width={600} height={600} />
      </div>
      {children}
    </div>
  )
}

export default AuthContainer
