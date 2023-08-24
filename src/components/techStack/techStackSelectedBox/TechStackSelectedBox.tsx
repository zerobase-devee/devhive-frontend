import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './techStackSelectedBox.module.css'
import CheckBox from '@/components/common/checkbox/CheckBox'
import Image from 'next/image'
import TechStackCard from '../techStackCard/TechStackCard'
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
      {selectedItems.length === 0 ? (
        <div className={styles.selectedList}>
          <p>아직 선택한 기술 스택이 없어요.</p>
        </div>
      ) : (
        <div className={styles.selectedList}>
          {selectedItems.map((id) => {
            const selectedItem = data.find((item) => item.id === id)
            if (selectedItem) {
              return (
                <TechStackCard
                  key={selectedItem.id}
                  name={selectedItem.name}
                  imageUrl={selectedItem.imageUrl}
                />
              )
            } else {
              return null
            }
          })}
        </div>
      )}
    </>
  )
}

export default TechStackSelectedBox
