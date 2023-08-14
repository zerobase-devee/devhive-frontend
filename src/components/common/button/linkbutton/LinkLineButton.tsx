import Link from 'next/link'
import styles from './linkButton.module.css'
import { ReactNode } from 'react'

interface LinkLineButtonProps {
  href: string
  children: ReactNode
}

const LinkLineButton = ({ href, children }: LinkLineButtonProps) => {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  )
}

export default LinkLineButton
