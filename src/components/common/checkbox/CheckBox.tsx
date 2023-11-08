import { useState } from 'react'
import styles from './checkbox.module.css'
import { BsCheckSquareFill } from 'react-icons/bs'

interface CheckBoxProps {
  id?: string
  children: React.ReactNode
  defaultChecked?: boolean
  onChange?: () => void
}

const CheckBox = ({
  id,
  children,
  defaultChecked,
  onChange,
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = () => {
    setChecked(!checked)
    if (onChange) onChange()
  }

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="checkbox"
        id={id}
        name={id}
        className={styles.checkbox}
        onChange={handleChange}
      />
      {checked ? (
        <BsCheckSquareFill className={styles.checkIcon} />
      ) : (
        <BsCheckSquareFill
          className={`${styles.checkIcon} ${styles.nonCheck}`}
        />
      )}
      <span className={styles.checkboxText}>{children}</span>
    </label>
  )
}

export default CheckBox
