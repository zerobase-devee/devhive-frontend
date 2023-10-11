import styles from './errorComponent.module.css'
import { BiSolidMessageAltError } from 'react-icons/bi'

const ErrorComponent = () => {
  return (
    <div className={styles.container}>
      <BiSolidMessageAltError />
      <p className={styles.title}>알 수 없는 문제가 발생했어요. :(</p>
      <p>
        일시적인 현상이거나 인터넷 문제일 수 있으니, <br />
        새로고침 후 다시 시도해주세요.
      </p>
    </div>
  )
}

export default ErrorComponent
