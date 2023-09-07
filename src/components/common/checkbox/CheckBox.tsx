import styles from './checkbox.module.css'
import { BsCheckSquareFill } from 'react-icons/bs'

interface CheckBoxProps {
  id?: string
  children: React.ReactNode
  checked: boolean
  onChange: () => void
}

const CheckBox = ({ id, children, checked, onChange }: CheckBoxProps) => {
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
        <BsCheckSquareFill
          className={`${styles.checkIcon} ${styles.nonCheck}`}
        />
      )}
      <span className={styles.checkboxText}>{children}</span>
    </label>
  )
}

export default CheckBox
