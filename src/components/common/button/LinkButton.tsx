import Link from 'next/link'
import styles from './Button.module.css'

interface LinkLineButtonProps {
  href: string
  children: React.ReactNode
  fill?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const LinkButton = ({ href, children, fill, onClick }: LinkLineButtonProps) => {
  return (
    <Link
      href={href}
      className={`${styles.button} ${fill && styles.fill}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default LinkButton
