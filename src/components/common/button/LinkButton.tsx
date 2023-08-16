import Link from 'next/link'
import styles from './Button.module.css'

interface LinkLineButtonProps {
  href: string
  children: React.ReactNode
  fill?: boolean
}

const LinkButton = ({ href, children, fill }: LinkLineButtonProps) => {
  return (
    <Link href={href} className={`${styles.button} ${fill && styles.fill}`}>
      {children}
    </Link>
  )
}

export default LinkButton
