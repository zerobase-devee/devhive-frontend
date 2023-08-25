import LinkButton from '@/components/common/button/LinkButton'
import styles from './projectListNull.module.css'

interface ProjectListNullProps {
  contentText: React.ReactNode
  href: string
  buttonText: string
}

const ProjectListNull = ({
  contentText,
  href,
  buttonText,
}: ProjectListNullProps) => {
  return (
    <div className={styles.container}>
      <p>{contentText}</p>
      <LinkButton href={href} fill>
        {buttonText}
      </LinkButton>
    </div>
  )
}

export default ProjectListNull
