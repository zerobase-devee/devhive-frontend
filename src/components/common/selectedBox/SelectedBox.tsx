import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './selectedBox.module.css'
import { useState } from 'react'

interface SelectedBoxProps {
  menu: string[]
  placeholder: string
  selectedItem: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const SelectedBox = ({
  menu,
  placeholder,
  selectedItem,
  setSelectedItem,
}: SelectedBoxProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item)
    setIsOpened(false)
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.selectedTextArea}
        type="button"
        onClick={handleOpen}
      >
        <p
          className={` ${
            selectedItem ? styles.selectedText : styles.placeholder
          }`}
        >
          {selectedItem ? selectedItem : placeholder}
        </p>
        {isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOpened && (
        <div className={styles.selectedMenuList}>
          {menu.map((item: string, index: number) => (
            <button
              key={`${index}_${item}`}
              className={styles.selectedMenuItem}
              type="button"
              onClick={() => handleSelectedItem(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectedBox
