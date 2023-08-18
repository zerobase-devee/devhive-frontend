import styles from './container.module.css'

const Container = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  return <div className={`${styles.container} ${style}`}>{children}</div>
}

export default Container
