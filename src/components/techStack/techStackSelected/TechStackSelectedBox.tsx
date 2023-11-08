import styles from './techStackSelected.module.css'
import { Dispatch, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import CheckBox from '@/components/common/checkbox/CheckBox'
import Image from 'next/image'
import { TechStackDataType } from '@/types/admin/adminDataType'

interface TechStackSelectedBoxProps {
  scroll?: boolean
  techStackData: TechStackDataType[]
  selectedItems: TechStackDataType[]
  handleItemToggle: (item: TechStackDataType) => void
  setSelectedTechStacks: Dispatch<React.SetStateAction<TechStackDataType[]>>
  selectedTechStacks: TechStackDataType[]
}

const TechStackSelectedBox = ({
  scroll,
  techStackData,
  selectedItems,
  handleItemToggle,
  setSelectedTechStacks,
  selectedTechStacks,
}: TechStackSelectedBoxProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  const handleApply = () => {
    setSelectedTechStacks(selectedItems)
    handleOpen()
  }

  return (
    <>
      <div className={styles.selectContainer}>
        <button className={styles.selectBox} type="button" onClick={handleOpen}>
          기술스택 선택
          {isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isOpened && (
          <div className={styles.selectedMenuList}>
            <div className={`${scroll && styles.scroll}`}>
              {techStackData.map((item: TechStackDataType) => (
                <div key={item.id} className={styles.selectedMenuItem}>
                  <CheckBox
                    defaultChecked={selectedTechStacks.some(
                      (selectedItem) => selectedItem.id === item.id,
                    )}
                    onChange={() => handleItemToggle(item)}
                  >
                    <div className={styles.checkboxItem}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={20}
                        height={20}
                      />
                      {item.name}
                    </div>
                  </CheckBox>
                </div>
              ))}
            </div>
            <div className={styles.buttonArea}>
              <button onClick={handleApply}>적용하기</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TechStackSelectedBox
