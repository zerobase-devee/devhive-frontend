import styles from './radioInput.module.css'

interface RadioInputProps {
  readonly name: string
  readonly value: number | string
  readonly children: React.ReactNode
  readonly onChange: any
  readonly checked: boolean
}

const RadioInput = ({
  name,
  value,
  children,
  checked,
  onChange,
}: RadioInputProps) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.radio}
        checked={checked}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
      />
      <div>{children}</div>
    </label>
  )
}

export default RadioInput
