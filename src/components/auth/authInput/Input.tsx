import styles from './input.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

interface InputProps {
  type: string
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
}

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onClick,
}: InputProps) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {name === 'email' && value.length > 0 && (
        <AiFillCloseCircle className={styles.inputIcon} onClick={onClick} />
      )}
      {(name === 'password' || name === 'passwordConfirm') &&
        value.length > 0 &&
        (type === 'password' ? (
          <BsFillEyeFill className={styles.inputIcon} onClick={onClick} />
        ) : (
          <BsFillEyeSlashFill className={styles.inputIcon} onClick={onClick} />
        ))}
    </div>
  )
}

export default Input
