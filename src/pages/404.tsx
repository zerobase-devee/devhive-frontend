import styles from '@/styles/pages/custom404.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import { BiSolidMessageAltError } from 'react-icons/bi'

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <BiSolidMessageAltError />
      <p>404</p>
      <LinkButton href="/" fill>
        메인페이지로
      </LinkButton>
    </div>
  )
}

export default Custom404
