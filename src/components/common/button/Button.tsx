import React from 'react'
import styles from './Button.module.css'

interface IButtonProps {
  children: React.ReactNode
  fill?: boolean
  disabled?: boolean
  onClick?: () => void
}
export default function Button({
  children,
  fill,
  disabled,
  onClick,
}: IButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${styles.button} ${fill && styles.fill}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
