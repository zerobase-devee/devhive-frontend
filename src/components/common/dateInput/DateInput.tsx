import { InputHTMLAttributes } from 'react'
import styles from './dateInput.module.css'
import { FieldError } from 'react-hook-form'

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDateEmpty: boolean
  isError?: boolean
  errors?: FieldError | undefined
}

const DateInput = ({ isDateEmpty, isError, errors }: DateInputProps) => {
  return (
    <input
      className={`${styles.dateInput} ${
        isDateEmpty ? `${styles.dateEmpty} ${styles.hidden}` : ''
      } ${!isError && styles.inputError} ${errors && styles.inputError}`}
      type="date"
    />
  )
}

export default DateInput
