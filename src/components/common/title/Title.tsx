import styles from './title.module.css'

const Title = ({ title }: { title: string }) => {
  return <h2 className={styles.title}>{title}</h2>
}

export default Title
