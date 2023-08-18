import styles from './title.module.css'

const Title = ({ title }: { title: string }) => {
  return <p className={styles.title}>{title}</p>
}

export default Title
