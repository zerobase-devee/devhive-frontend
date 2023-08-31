import styles from './techStackSelected.module.css'
import TechStackCard from '../techStackCard/TechStackCard'
import { TechStackDataType } from '@/types/mypageDataType'

interface TechStackSelectedListProps {
  data: TechStackDataType[]
  selectedItems: number[]
}

const TechStackSelectedList = ({
  selectedItems,
  data,
}: TechStackSelectedListProps) => {
  return selectedItems.length === 0 ? (
    <div className={styles.selectedList}>
      <p>아직 선택한 기술 스택이 없어요.</p>
    </div>
  ) : (
    <div className={styles.selectedList}>
      {selectedItems.map((id: number) => {
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
  )
}

export default TechStackSelectedList
