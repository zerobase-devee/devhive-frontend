'use client'

import { useState } from 'react'
import styles from './switchSelector.module.css'

const SwitchSelector = ({ options }: { options: Array<string> }) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className={styles.switchGroup}>
      {options.map((option: string, index: number) => (
        <label
          key={index}
          className={`${styles.switch} ${
            selectedOption === option ? styles.selected : ''
          }`}
        >
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          <p className={styles.switchButton}>{option}</p>
        </label>
      ))}
    </div>
  )
}

export default SwitchSelector
