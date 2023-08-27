import styles from './techStackSelected.module.css'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import CheckBox from '@/components/common/checkbox/CheckBox'
import Image from 'next/image'
import { TechStackDataType } from '@/types/mypageDataType'

interface TechStackSelectedBoxProps {
  scroll?: boolean
  data: TechStackDataType[]
  selectedItems: number[]
  handleItemToggle: (id: number) => void
}

const TechStackSelectedBox = ({
  scroll,
  data,
  selectedItems,
  handleItemToggle,
}: TechStackSelectedBoxProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  const handleApply = () => {
    setIsOpened(false)
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
              {data.map((item: TechStackDataType) => (
                <div key={item.id} className={styles.selectedMenuItem}>
                  <CheckBox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                  >
                    <div className={styles.checkboxItem}>
                      <Image
                        src={item.imageUrl}
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
