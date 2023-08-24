import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './techStackSelectedBox.module.css'
import CheckBox from '../../common/checkbox/CheckBox'
import Image from 'next/image'
import TechStackCard from '../techStackCard/TechStackCard'

interface TechStackSelectedBoxProps {
  scroll?: boolean
}

interface techStackDataType {
  id: number
  name: string
  imageUrl: string
}

const techStackData: techStackDataType[] = [
  {
    id: 1,
    name: 'Javascript',
    imageUrl: '/images/techStack/javascript.png',
  },
  {
    id: 2,
    name: 'Typescript',
    imageUrl: '/images/techStack/typescript.png',
  },
]

const TechStackSelectedBox = ({ scroll }: TechStackSelectedBoxProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  const handleItemToggle = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleApply = () => {
    console.log('Selected Items:', selectedItems)
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
              {techStackData.map((item: techStackDataType) => (
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
            const selectedItem = techStackData.find((item) => item.id === id)
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
