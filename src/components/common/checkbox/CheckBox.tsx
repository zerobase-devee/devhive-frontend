'use client'

import { useState } from 'react'
import styles from './checkbox.module.css'
import { BsCheckSquareFill } from 'react-icons/bs'

interface CheckBoxProps {
  id: string
  text: string
  checked: boolean
  onChange: () => void
}

const CheckBox = ({ id, text, checked, onChange }: CheckBoxProps) => {
  const checkIconClasses = `${styles.checkIcon} ${styles.nonCheck}`

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="checkbox"
        id={id}
        name={id}
        className={styles.checkbox}
        onChange={onChange}
      />
      {checked ? (
        <BsCheckSquareFill className={styles.checkIcon} />
      ) : (
        <BsCheckSquareFill className={checkIconClasses} />
      )}
      <span className={styles.checkboxText}>{text}</span>
    </label>
  )
}

export default CheckBox
