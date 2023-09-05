import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
  readonly fill?: boolean
  readonly red?: boolean
  readonly gray?: boolean
  readonly disabled?: boolean
  readonly onClick?: () => void
}

export default function Button({
  children,
  fill,
  disabled,
  onClick,
  type,
  gray,
  red,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${fill && styles.fill} ${
        gray && styles.gray
      } ${red && styles.red}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
