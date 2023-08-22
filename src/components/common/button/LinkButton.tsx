import Link from 'next/link'
import styles from './Button.module.css'

interface LinkLineButtonProps {
  readonly href: string
  readonly children: React.ReactNode
  readonly replace?: boolean
  readonly fill?: boolean
  readonly gray?: boolean
  readonly onClick?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void
}

const LinkButton = ({
  href,
  children,
  fill,
  onClick,
  replace,
  gray,
}: LinkLineButtonProps) => {
  return (
    <Link
      href={href}
      className={`${styles.button} ${fill && styles.fill} ${
        gray && styles.gray
      }`}
      onClick={onClick}
      replace={replace}
    >
      {children}
    </Link>
  )
}

export default LinkButton
