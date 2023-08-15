import React from 'react'
import styles from './Button.module.css'

interface IButtonProps {
  children: string
  fill: boolean
}
export default function Button({ children, fill }: IButtonProps) {
  return (
    <button className={`${styles.button} ${fill ? styles.fill : ''}`}>
      {children}
    </button>
  )
}
