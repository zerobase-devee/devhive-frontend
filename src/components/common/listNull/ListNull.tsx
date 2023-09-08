import LinkButton from '@/components/common/button/LinkButton'
import styles from './listNull.module.css'

interface ListNullProps {
  contentText: React.ReactNode
  href: string
  buttonText: string
}

const ListNull = ({ contentText, href, buttonText }: ListNullProps) => {
  return (
    <div className={styles.container}>
      <div>{contentText}</div>
      <LinkButton href={href} fill>
        {buttonText}
      </LinkButton>
    </div>
  )
}

export default ListNull
