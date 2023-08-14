'use client'

import { useState } from 'react'
import styles from './checkbox.module.css'
import { BsCheckSquareFill } from 'react-icons/bs'

interface CheckBoxProps {
  id: string
  text: string
  checkStatus: boolean
}

const CheckBox = ({ id, text, checkStatus }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checkStatus)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const checkIconClasses = `${styles.checkIcon} ${styles.nonCheck}`

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="checkbox"
        id={id}
        name={id}
        className={styles.checkbox}
        onChange={toggleCheckbox}
      />
      {isChecked ? (
        <BsCheckSquareFill className={styles.checkIcon} />
      ) : (
        <BsCheckSquareFill className={checkIconClasses} />
      )}
      <p className={styles.checkboxText}>{text}</p>
    </label>
  )
}

export default CheckBox
